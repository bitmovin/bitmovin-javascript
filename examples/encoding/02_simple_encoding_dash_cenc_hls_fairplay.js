// 02_simple_encoding_dash_cenc_hls_fairplay.js

const Promise = require('bluebird');
const Bitmovin = require('bitmovin-javascript').default;


const BITMOVIN_API_KEY = '';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: true});

const ENCODING_NAME = 'TEST_ENCODING_' + new Date().toISOString();

const INPUT_HTTP_HOST = '';
const INPUT_HTTP_PATH = '';

const OUTPUT_S3_ACCESS_KEY = '';
const OUTPUT_S3_SECRET_KEY = '';
const OUTPUT_S3_BUCKET_NAME = '';
const OUTPUT_S3_BASE_PATH = '';

const DRM_CENC_KEY = '';
const DRM_CENC_KID = '';
const DRM_CENC_WIDEVINE_PSSH = '';
const DRM_CENC_PLAYREADY_LAURL = '';
const DRM_CENC_PLAYREADY_PSSH = '';

const DRM_FAIRPLAY_KEY = '';
const DRM_FAIRPLAY_IV = '';
const DRM_FAIRPLAY_URI = '';


const main = () => {
  return new Promise((resolve, reject) => {

    const httpInputCreationPromise = createInput();
    const s3OutputCreationPromise = createOutput();
    const encodingResourceCreationPromise = createEncoding();
    const codecConfigurationH264At816pPromise = createH264CodecConfiguration(1920, 1080, 4800000, 25.0);
    const codecConfigurationH264At544pPromise = createH264CodecConfiguration(1280, 720, 2400000, 25.0);
    const codecConfigurationH264At272pPromise = createH264CodecConfiguration(640, 360, 1200000, 25.0);
    const codecConfigurationAACPromise = createAACCodecConfiguration(128000, 48000);

    Promise.all(
      [
        httpInputCreationPromise,
        s3OutputCreationPromise,
        encodingResourceCreationPromise,
        codecConfigurationH264At816pPromise,
        codecConfigurationH264At544pPromise,
        codecConfigurationH264At272pPromise,
        codecConfigurationAACPromise
      ]
    ).then(([
        input,
        output,
        encoding,
        codecConfigurationH264At816p,
        codecConfigurationH264At544p,
        codecConfigurationH264At272p,
        codecConfigurationAAC
      ]) => {
      console.log('Successfully created input, output and codec configurations.');
      const dashManifestCreationPromise = createDashManifestWithPeriodAndAdaptationSets(output.id);
      const hlsManifestCreationPromise = createHlsManifest(output.id);
      Promise.all([dashManifestCreationPromise, hlsManifestCreationPromise]).then(([dashManifest, hlsManifest]) => {
        console.log('Successfully created DASH and HLS Manifest Resources');
        [createdDashManifest, createdDashManifestPeriod, createdDashManifestAudioAdaptationSet, createdDashManifestVideoAdaptationSet] = dashManifest;

        const streamDefinitions = [
          {
            codecConfiguration: codecConfigurationAAC,
            adaptationSet: createdDashManifestAudioAdaptationSet,
            outputPathDiscriminator: 'audio/128'
          },
          {
            codecConfiguration: codecConfigurationH264At816p,
            adaptationSet: createdDashManifestVideoAdaptationSet,
            outputPathDiscriminator: 'video/816'
          },
          {
            codecConfiguration: codecConfigurationH264At544p,
            adaptationSet: createdDashManifestVideoAdaptationSet,
            outputPathDiscriminator: 'video/544'
          },          {
            codecConfiguration: codecConfigurationH264At272p,
            adaptationSet: createdDashManifestVideoAdaptationSet,
            outputPathDiscriminator: 'video/272'
          }
        ];

        const promiseMap = Promise.map(streamDefinitions, (streamDefinition) => {
          return createStreamWithMuxingsAndDRMsAndManifestResources(
            streamDefinition.codecConfiguration, input, output, streamDefinition.outputPathDiscriminator, encoding,
            createdDashManifest, createdDashManifestPeriod, streamDefinition.adaptationSet, hlsManifest
          );
        }, {concurrency: 1});

        promiseMap.then((result) => {
          console.log('Successfully created all resources. Starting Encoding Process...');
          startEncodingAndWaitForItToBeFinished(encoding).then(() => {
            console.log('Successfully Finished Encoding Process.. Starting manifest creation...');
            const dashCreationPromise = startDashManifestCreationAndWaitForItToBeFinished(createdDashManifest);
            const hlsCreationPromise = startHlsManifestCreationAndWaitForItToBeFinished(hlsManifest);
            Promise.all([dashCreationPromise, hlsCreationPromise]).then(() => {
              console.log('Successfully finished DASH and HLS manifest creation!');
              resolve(result);
            });
          });
        }).catch(logErrorPromise(reject, 'An error occured: '));
      });
    });
  });
};

const createInput = () => {
  return new Promise((resolve, reject) => {
    const httpInput = {
      name: 'My awesome HTTP Input',
      description: 'Little description for my awesome HTTP Input',
      host: INPUT_HTTP_HOST
    };
    bitmovin.encoding.inputs.http.create(httpInput).then((createdInput) => {
      console.log('Successfully created HTTP Input.', createdInput);
      resolve(createdInput);
    }).catch(logErrorPromise(reject, 'Unable to create HTTP Input.'));
  });
};

const createOutput = () => {
  return new Promise((resolve, reject) => {
    const s3Output = {
      name: 'My awesome S3 Output',
      description: 'Little description for my awesome S3 Output',
      accessKey: OUTPUT_S3_ACCESS_KEY,
      secretKey: OUTPUT_S3_SECRET_KEY,
      bucketName: OUTPUT_S3_BUCKET_NAME
    };
    bitmovin.encoding.outputs.s3.create(s3Output).then((createdOutput) => {
      console.log('Successfully created S3 Output.', createdOutput);
      resolve(createdOutput);
    }).catch(logErrorPromise(reject, 'Unable to create S3 Output.'));
  });
};

const createEncoding = () => {
  return new Promise((resolve, reject) => {
    const encoding = {
      name: ENCODING_NAME,
      encoderVersion: 'BETA'
    };
    bitmovin.encoding.encodings.create(encoding).then((createdEncoding) => {
      console.log('Successfully created Encoding resource.', createdEncoding);
      resolve(createdEncoding);
    }).catch(logErrorPromise(reject, 'Unable to create Encoding Resource.'));
  });
};

const createH264CodecConfiguration = (width, height, bitrate, fps) => {
  return new Promise((resolve, reject) => {
    const h264CodecConfiguration = {
      name: 'H264 ' + height,
      bitrate: bitrate,
      rate: fps,
      profile: 'HIGH',
      width: width,
      height: height
    };
    bitmovin.encoding.codecConfigurations.h264.create(h264CodecConfiguration).then((createdCodecConfiguration) => {
      console.log('Successfully created H264 Codec Configuration.', createdCodecConfiguration);
      resolve(createdCodecConfiguration);
    }).catch(logErrorPromise(reject, 'Unable to create H264 Codec Configuration'));
  });
};

const createAACCodecConfiguration = (bitrate, rate) => {
  return new Promise((resolve, reject) => {
    const aacCodecConfiguration = {
      name: 'English',
      bitrate: bitrate,
      rate: rate
    };
    bitmovin.encoding.codecConfigurations.aac.create(aacCodecConfiguration).then((createdCodecConfiguration) => {
      console.log('Successfully created AAC Codec Configuration.', createdCodecConfiguration);
      resolve(createdCodecConfiguration);
    }).catch(logErrorPromise(reject, 'Unable to create AAC Codec Configuration'));
  });
};

const createDashManifestWithPeriodAndAdaptationSets = (outputId) => {
  return new Promise((resolve, reject) => {
    const dashManifest = {
      name: 'DASH Manifest for ' + ENCODING_NAME,
      outputs: [{
        outputId: outputId,
        outputPath: OUTPUT_S3_BASE_PATH,
        acl: [{
          permission: 'PUBLIC_READ'
        }],
      }],
      manifestName: 'dashManifest.mpd'
    };
    bitmovin.encoding.manifests.dash.create(dashManifest).then((createdManifest) => {
      console.log('Successfully created DASH Manifest Resource.', createdManifest);
      createDashManifestPeriodWithAdaptationSets(createdManifest).then(([createdPeriod, createdAudioAdaptationSet, createdVideoAdaptationSet]) => {
        resolve([createdManifest, createdPeriod, createdAudioAdaptationSet, createdVideoAdaptationSet]);
      });
    }).catch(logErrorPromise(reject, 'Unable to create DASH Manifest'));
  });
};

const createDashManifestPeriodWithAdaptationSets = (dashManifest) => {
  return new Promise((resolve, reject) => {
    const period = {};
    bitmovin.encoding.manifests.dash(dashManifest.id).periods.add(period).then((createdPeriod) => {
      console.log('Successfully created DASH ManifestPeriod for ' + dashManifest.name, createdPeriod);
      const videoAdaptationSetCreationPromise = createDashManifestVideoAdaptationSet(dashManifest, createdPeriod);
      const audioAdaptationSetCreationPromise = createDashManifestAudioAdaptationSet(dashManifest, createdPeriod);
      Promise.all([videoAdaptationSetCreationPromise, audioAdaptationSetCreationPromise]).then(([createdVideoAdaptationSet, createdAudioAdaptationSet]) => {
        resolve([createdPeriod, createdAudioAdaptationSet, createdVideoAdaptationSet]);
      });
    }).catch(logErrorPromise(reject, 'Unable to create DASH Manifest Period for ' + dashManifest.name));
  });
};

const createDashManifestAudioAdaptationSet = (dashManifest, period) => {
  return new Promise((resolve, reject) => {
    const audioAdaptationSet = {
      roles: ['MAIN'],
      lang: 'en'
    };
    bitmovin.encoding.manifests.dash(dashManifest.id).periods(period.id).adaptationSets.audio.create(audioAdaptationSet).then((createdAudioAdaptationSet) => {
      console.log('Successfully created Audio Adaptation Set for ' + period.name, createdAudioAdaptationSet);
      resolve(createdAudioAdaptationSet);
    }).catch(logErrorPromise(reject, 'Unable to create Audio Adaptation Set for ' + period.name));
  });
};

const createDashManifestVideoAdaptationSet = (dashManifest, period) => {
  return new Promise((resolve, reject) => {
    const videoAdaptationSet = {
      roles: ['MAIN']
    };
    bitmovin.encoding.manifests.dash(dashManifest.id).periods(period.id).adaptationSets.video.create(videoAdaptationSet).then((createdVideoAdaptationSet) => {
      console.log('Successfully created Video Adaptation Set for ' + period.name, createdVideoAdaptationSet);
      resolve(createdVideoAdaptationSet);
    }).catch(logErrorPromise(reject, 'Unable to create Video Adaptation Set for ' + period.name));
  });
};

const createHlsManifest = (outputId) => {
  return new Promise((resolve, reject) => {
    const hlsManifest = {
      name: 'HLS Manifest for ' + ENCODING_NAME,
      outputs: [{
        outputId: outputId,
        outputPath: OUTPUT_S3_BASE_PATH,
        acl: [{
          permission: 'PUBLIC_READ'
        }]
      }],
      manifestName: 'hlsManifest.m3u8'
    };
    bitmovin.encoding.manifests.hls.create(hlsManifest).then((createdManifest) => {
      console.log('Successfully created HLS Manifest Resource.', createdManifest);
      resolve(createdManifest);
    }).catch(logErrorPromise(reject, 'Unable to create HLS manifest.'));
  });
};

const createStreamWithMuxingsAndDRMsAndManifestResources = (codecConfiguration, input, output, outputPath, encoding, dashManifest, dashManifestPeriod, dashManifestAdaptationSet, hlsManifest) => {
  return new Promise((resolve, reject) => {
    const stream = {
      name: 'Stream with ' + codecConfiguration.name,
      codecConfigId: codecConfiguration.id,
      inputStreams: [{
        inputId: input.id,
        inputPath: INPUT_HTTP_PATH,
        selectionMode: 'AUTO'
      }]
    };
    bitmovin.encoding.encodings(encoding.id).streams.add(stream).then((createdStream) => {
      console.log('Successfully created Stream with Codec Configuration ' + codecConfiguration.name + '.', createdStream);

      const fmp4MuxingCreationPromise = createFMP4MuxingWithCENCDRMAndManifestResources(
        createdStream, outputPath, codecConfiguration, output, encoding, dashManifest, dashManifestPeriod,
        dashManifestAdaptationSet
      );

      fmp4MuxingCreationPromise.then(([createdFmp4Muxing, createdCencDrm, createdFmp4DrmRepresentation]) => {

        const tsMuxingCreationPromise = createTSMuxingWithFairPlayDRMAndManifestResources(
          createdStream, outputPath, codecConfiguration, output, encoding, hlsManifest);

        tsMuxingCreationPromise.then(([createdTsMuxing, createdFairPlayDrm, createdHlsDrmRepresentation]) => {
          resolve([
            createdStream,
            [
              [createdFmp4Muxing, createdCencDrm, createdFmp4DrmRepresentation],
              [createdTsMuxing, createdFairPlayDrm, createdHlsDrmRepresentation]
            ]
          ]);
        });
      });
    }).catch(logErrorPromise(reject, 'Unable to create Stream with Codec Configuration ' + codecConfiguration.name + '.'));
  });
};

const createFMP4MuxingWithCENCDRMAndManifestResources = (stream_, outputPath, codecConfiguration, output, encoding, dashManifest, dashManifestPeriod, dashManifestAdaptationSet) => {
  return new Promise((resolve, reject) => {
    const fmp4Muxing = {
      name: 'FMP4 Muxing for ' + stream_.name,
      streams: [{
        streamId: stream_.id
      }],
      segmentLength: 4,
      initSegmentName: 'init.mp4',
      segmentNaming: 'seg_%number%.m4s'
    };

    bitmovin.encoding.encodings(encoding.id).muxings.fmp4.add(fmp4Muxing).then((createdMuxing) => {
      createCENCDRMAndManifestResources(stream_, codecConfiguration, outputPath, createdMuxing, output, encoding, dashManifest, dashManifestPeriod, dashManifestAdaptationSet)
      .then(([createdDrm, createdRepresentation]) => {
        resolve([createdMuxing, createdDrm, createdRepresentation]);
      });
    }).catch(logErrorPromise(reject, 'Unable to create FMP4 Muxing ' + fmp4Muxing.name + '.'));
  });
};

const createTSMuxingWithFairPlayDRMAndManifestResources = (stream_, outputPath, codecConfiguration, output, encoding, hlsManifest) => {
  return new Promise((resolve, reject) => {
    const tsMuxing = {
      name: 'TS Muxing for ' + stream_.name,
      streams: [{
        streamId: stream_.id
      }],
      segmentLength: 4,
      segmentNaming: 'seg_%number%.ts'
    };

    bitmovin.encoding.encodings(encoding.id).muxings.ts.add(tsMuxing).then((createdMuxing) => {
      createFairPlayDRMAndManifestResources(stream_, codecConfiguration, outputPath, createdMuxing, output, encoding, hlsManifest).then(([createdDrm, createdRepresentation]) => {
        resolve([createdMuxing, createdDrm, createdRepresentation]);
      });
    }).catch(logErrorPromise(reject, 'Unable to create TS Muxing ' + tsMuxing.name, + '.'));
  });
};

const createCENCDRMAndManifestResources = (stream_, codecConfiguration, outputPath, fmp4Muxing, output, encoding, dashManifest, dashManifestPeriod, dashManifestAdaptationSet) => {
  return new Promise((resolve, reject) => {
    const drmOutputPath = OUTPUT_S3_BASE_PATH + '/' + outputPath + '/';
    const cencDRM = {
      name: 'CENC DRM for ' + fmp4Muxing.name,
      outputs: [{
        outputId: output.id,
        outputPath: drmOutputPath,
        acl: [{
          permission: 'PUBLIC_READ'
        }]
      }],
      key: DRM_CENC_KEY,
      kid: DRM_CENC_KID,
      widevine: {
        pssh: DRM_CENC_WIDEVINE_PSSH
      },
      playReady: {
        pssh: DRM_CENC_PLAYREADY_PSSH,
        laUrl: DRM_CENC_PLAYREADY_LAURL
      }
    };

    bitmovin.encoding.encodings(encoding.id).muxings.fmp4(fmp4Muxing.id).drms.cenc.add(cencDRM).then((createdDrm) => {
      console.log('Successfully created CENC DRM ' + cencDRM.name + '.', createdDrm);

      createDashManifestRepresentation(encoding, stream_, fmp4Muxing, createdDrm, dashManifest, dashManifestPeriod, dashManifestAdaptationSet, drmOutputPath).then((createdRepresentation) => {
        resolve([createdDrm, createdRepresentation]);
      });
    }).catch(logErrorPromise(reject, 'Unable to create CENC DRM ' + cencDRM.name + '.'));
  });
};

const createFairPlayDRMAndManifestResources = (stream_, codecConfiguration, outputPath, tsMuxing, output, encoding, hlsManifest) => {
  return new Promise((resolve, reject) => {
    const drmOutputPath = OUTPUT_S3_BASE_PATH + '/' + outputPath + '/';
    const fairPlayDRM = {
      name: 'FairPlay DRM for ' + tsMuxing.name,
      outputs: [{
        outputId: output.id,
        outputPath: drmOutputPath,
        acl: [{
          permission: 'PUBLIC_READ'
        }]
      }],
      key: DRM_FAIRPLAY_KEY,
      iv: DRM_FAIRPLAY_IV,
      uri: DRM_FAIRPLAY_URI
    };

    bitmovin.encoding.encodings(encoding.id).muxings.ts(tsMuxing.id).drms.fairPlay.add(fairPlayDRM).then((createdDrm) => {
      console.log('Successfully created FairPlay DRM ' + fairPlayDRM.name + '.', createdDrm);
      createHlsManifestRepresentation(encoding, stream_, tsMuxing, createdDrm, hlsManifest, drmOutputPath).then((createdRepresentation) => {
        resolve([createdDrm, createdRepresentation]);
      });
    }).catch(logErrorPromise(reject, 'Unable to create FairPlay DRM ' + fairPlayDRM.name + '.'));
  });
};

const createDashManifestRepresentation = (encoding, stream_, fmp4Muxing, cencDrm, dashManifest, period, adaptationSet, segmentPath) => {
  return new Promise((resolve, reject) => {
    const drmFmp4Representation = {
      type: 'TEMPLATE',
      encodingId: encoding.id,
      muxingId: fmp4Muxing.id,
      drmId: cencDrm.id,
      segmentPath: segmentPath
    };
    bitmovin.encoding.manifests.dash(dashManifest.id).periods(period.id).adaptationSets(adaptationSet.id).representations.drmFmp4.add(drmFmp4Representation).then((createdRepresentation) => {
      console.log('Successfully created DRM FMP4 Representation for Muxing with ID ' + fmp4Muxing.id + '.', createdRepresentation);
      resolve(createdRepresentation);
    }).catch(logErrorPromise(reject, 'Unable to create DRM FMP4 Representation for Muxing with ID ' + fmp4Muxing.id + '.'));
  });
};

const createHlsManifestRepresentation = (encoding, stream_ , tsMuxing, fairPlayDrm, hlsManifest, segmentPath) => {
  return new Promise((resolve, reject) => {
    let representationPromise = null;
    if (segmentPath.includes('audio/')) {
      representationPromise = createHlsAudioMedia(encoding, stream_, tsMuxing, fairPlayDrm, hlsManifest, segmentPath);
    } else {
      representationPromise = createHlsVariantStream(encoding, stream_, tsMuxing, fairPlayDrm, hlsManifest, segmentPath);
    }

    representationPromise.then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    })
  });
};

const createHlsAudioMedia = (encoding, stream_, tsMuxing, fairPlayDrm, hlsManifest, segmentPath) => {
  return new Promise((resolve, reject) => {
    const audioMedia = {
      name: 'HLS Audio Media',
      groupId: 'audio_group',
      segmentPath: segmentPath,
      encodingId: encoding.id,
      streamId: stream_.id,
      muxingId: tsMuxing.id,
      drmId: fairPlayDrm.id,
      language: 'en',
      uri: 'audio_media.m3u8'
    };

    bitmovin.encoding.manifests.hls(hlsManifest.id).media.audio.add(audioMedia).then((createdAudioMedia) => {
      console.log('Successfully created HLS Audio Media', createdAudioMedia);
      resolve(createdAudioMedia);
    }).catch(logErrorPromise(reject, 'Unable to create HLS Audio Media'));
  });
};

const createHlsVariantStream = (encoding, stream_, tsMuxing, fairPlayDrm, hlsManifest, segmentPath) => {
  return new Promise((resolve, reject) => {
    const variantStream = {
      audio: 'audio_group',
      closedCaptions: 'NONE',
      segmentPath: segmentPath,
      encodingId: encoding.id,
      streamId: stream_.id,
      muxingId: tsMuxing.id,
      drmId: fairPlayDrm.id,
      uri: fairPlayDrm.id + '.m3u8'
    };

    bitmovin.encoding.manifests.hls(hlsManifest.id).streams.add(variantStream).then((createdVariantStream) => {
      console.log('Successfully created Variant Stream for DRM with ID ' + fairPlayDrm.id + '.', createdVariantStream);
      resolve(createdVariantStream);
    }).catch(logErrorPromise(reject, 'Unable to create Variant Stream for DRM with ID ' + fairPlayDrm.id + '.'));
  });
};

const startEncodingAndWaitForItToBeFinished = (encoding) => {
  const startPromise = bitmovin.encoding.encodings(encoding.id).start();

  return new Promise((resolve, reject) => {
    startPromise.then((startResponse) => {
      waitUntilEncodingFinished(encoding).then((success) => {
        console.log('Encoding finished', success);
        resolve(true);
      }).catch(logErrorPromise(reject, 'Encoding failed'));
    });
  });
};

const waitUntilEncodingFinished = (encoding) => {
  return new Promise((resolve, reject) => {
    const waitForEncodingToBeFinishedOrError = () => {
      console.log('Getting Status for Encoding with ID ', encoding.id);
      bitmovin.encoding.encodings(encoding.id).status().then((response) => {
        console.log('Encoding Status is ' + response.status + '.');

        if (response.status === 'FINISHED') {
          return resolve(response.status);
        }

        if (response.status === 'ERROR') {
          return reject(response.status);
        }

        setTimeout(waitForEncodingToBeFinishedOrError, 10000);
      });
    };
    waitForEncodingToBeFinishedOrError();
  });
};

const startDashManifestCreationAndWaitForItToBeFinished = (manifest) => {
  const startPromise = bitmovin.encoding.manifests.dash(manifest.id).start();

  return new Promise((resolve, reject) => {
    startPromise.then((startResponse) => {
      waitUntilDashManifestFinished(manifest).then((success) => {
        console.log('manifest finished', success);
        resolve(true);
      }).catch(logErrorPromise(reject, 'DASH Manifest creation failed'));
    });
  });
};

const waitUntilDashManifestFinished = (manifest) => {
  return new Promise((resolve, reject) => {
    const waitForManifestToBeFinished = () => {
      console.log('Getting Status for DASH Manifest with ID ', manifest.id);
      bitmovin.encoding.manifests.dash(manifest.id).status().then((response) => {
        console.log('DASH Manifest Status is ' + response.status);

        if (response.status === 'FINISHED') {
          return resolve(response.status);
        }

        if (response.status === 'ERROR') {
          return reject(response.status);
        }

        setTimeout(waitForManifestToBeFinished, 10000);
      });
    };
    waitForManifestToBeFinished();
  });
};

const startHlsManifestCreationAndWaitForItToBeFinished = (manifest) => {
  const startPromise = bitmovin.encoding.manifests.hls(manifest.id).start();

  return new Promise((resolve, reject) => {
    startPromise.then((startResponse) => {
      waitUntilHlsManifestFinished(manifest).then((success) => {
        console.log('hls manifest finished', success);
        resolve(true);
      }).catch(logErrorPromise(reject, 'HLS Manifest creation failed'));
    });
  });
};

const waitUntilHlsManifestFinished = (manifest) => {
  return new Promise((resolve, reject) => {
    const waitForManifestToBeFinished = () => {
      console.log('Getting Status for HLS Manifest with ID ', manifest.id);
      bitmovin.encoding.manifests.hls(manifest.id).status().then((response) => {
        console.log('HLS Manifest Status is ' + response.status);

        if (response.status === 'FINISHED') {
          return resolve(response.status);
        }

        if (response.status === 'ERROR') {
          return reject(response.status);
        }

        setTimeout(waitForManifestToBeFinished, 10000);
      });
    };
    waitForManifestToBeFinished();
  });
};

const logErrorPromise = (reject, errorMessage) => {
  return (error) => {
    console.error(errorMessage, error);
    reject(error);
  };
};

main().then(() => {
  console.log('finished!');
}).catch((error) => {
  console.error('ERROR!', error);
  process.exit(8);
});
