// 08_encoding_hls_aes128.js

const Promise = require('bluebird');
const Bitmovin = require('bitmovin-javascript').default;


const BITMOVIN_API_KEY = '';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: true});

const ENCODING_NAME = 'TEST_ENCODING_' + new Date().toISOString();

const INPUT_S3_ACCESS_KEY = '';
const INPUT_S3_SECRET_KEY = '';
const INPUT_S3_BUCKET_NAME = '';
const INPUT_S3_PATH = '/path/to/your/input/file.mp4';

const OUTPUT_S3_ACCESS_KEY = '';
const OUTPUT_S3_SECRET_KEY = '';
const OUTPUT_S3_BUCKET_NAME = '';
const OUTPUT_S3_BASE_PATH = '/path/to/your/output/destination';

const DRM_AES_KEY = '';
const DRM_AES_IV = '';


const main = () => {
  return new Promise((resolve, reject) => {

    const s3InputCreationPromise = createInput();
    const s3OutputCreationPromise = createOutput();
    const encodingResourceCreationPromise = createEncoding();
    const codecConfigurationH264At720pPromise = createH264CodecConfiguration(1280, 720, 2400000, 25.0);
    const codecConfigurationH264At480pPromise = createH264CodecConfiguration(854, 480, 1200000, 25.0);
    const codecConfigurationH264At360pPromise = createH264CodecConfiguration(640, 360, 800000, 25.0);
    const codecConfigurationH264At240pPromise = createH264CodecConfiguration(426, 240, 400000, 25.0);
    const codecConfigurationAACPromise = createAACCodecConfiguration(128000, 48000);

    Promise.all(
      [
        s3InputCreationPromise,
        s3OutputCreationPromise,
        encodingResourceCreationPromise,
        codecConfigurationH264At720pPromise,
        codecConfigurationH264At480pPromise,
        codecConfigurationH264At360pPromise,
        codecConfigurationH264At240pPromise,
        codecConfigurationAACPromise
      ]
    ).then(([
        input,
        output,
        encoding,
        codecConfigurationH264At720p,
        codecConfigurationH264At480p,
        codecConfigurationH264At360p,
        codecConfigurationH264At240p,
        codecConfigurationAAC
      ]) => {
      console.log('Successfully created input, output and codec configurations.');
      const hlsManifestCreationPromise = createHlsManifest(output.id);

      hlsManifestCreationPromise.then(hlsManifest => {
        console.log('Successfully created HLS Manifest Resources');

        const streamDefinitions = [
          {
            codecConfiguration: codecConfigurationAAC,
            outputPathDiscriminator: 'audio/128'
          },
          {
            codecConfiguration: codecConfigurationH264At240p,
            outputPathDiscriminator: 'video/240'
          },
          {
            codecConfiguration: codecConfigurationH264At360p,
            outputPathDiscriminator: 'video/360'
          },          {
            codecConfiguration: codecConfigurationH264At480p,
            outputPathDiscriminator: 'video/480'
          },          {
            codecConfiguration: codecConfigurationH264At720p,
            outputPathDiscriminator: 'video/720'
          }
        ];

        const promiseMap = Promise.map(streamDefinitions, (streamDefinition) => {
          return createStreamWithMuxingsAndDRMsAndManifestResources(
            streamDefinition.codecConfiguration, input, output, streamDefinition.outputPathDiscriminator, encoding, hlsManifest
          );
        }, {concurrency: 1});

        promiseMap.then((result) => {
          console.log('Successfully created all resources. Starting Encoding Process...');
          startEncodingAndWaitForItToBeFinished(encoding).then(() => {
            console.log('Successfully Finished Encoding Process.. Starting manifest creation...');

            const hlsCreationPromise = startHlsManifestCreationAndWaitForItToBeFinished(hlsManifest);
            hlsCreationPromise.then(() => {
              console.log('Successfully finished HLS manifest creation!');
              resolve(result);
            });
          });
        }).catch(logErrorPromise(reject, 'An error occurred: '));
      });
    });
  });
};

const createInput = () => {
  return new Promise((resolve, reject) => {
    const s3Input = {
      name: 'My awesome S3 Input',
      description: 'Little description for my awesome S3 Input',
      accessKey: INPUT_S3_ACCESS_KEY,
      secretKey: INPUT_S3_SECRET_KEY,
      bucketName: INPUT_S3_BUCKET_NAME
    };
    bitmovin.encoding.inputs.s3.create(s3Input).then((createdInput) => {
      console.log('Successfully created S3 Input.', createdInput);
      resolve(createdInput);
    }).catch(logErrorPromise(reject, 'Unable to create S3 Input.'));
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

const createStreamWithMuxingsAndDRMsAndManifestResources = (codecConfiguration, input, output, outputPath, encoding, hlsManifest) => {
  return new Promise((resolve, reject) => {
    const stream = {
      name: 'Stream with ' + codecConfiguration.name,
      codecConfigId: codecConfiguration.id,
      inputStreams: [{
        inputId: input.id,
        inputPath: INPUT_S3_PATH,
        selectionMode: 'AUTO'
      }]
    };
    bitmovin.encoding.encodings(encoding.id).streams.add(stream).then((createdStream) => {
      console.log('Successfully created Stream with Codec Configuration ' + codecConfiguration.name + '.', createdStream);

      const tsMuxingCreationPromise = createTSMuxingWithAESDRMAndManifestResources(
        createdStream, outputPath, codecConfiguration, output, encoding, hlsManifest);

      tsMuxingCreationPromise.then(([createdTsMuxing, createdFairPlayDrm, createdHlsDrmRepresentation]) => {
        resolve([
          createdStream,
          [
            [createdTsMuxing, createdFairPlayDrm, createdHlsDrmRepresentation]
          ]
        ]);
      });

    }).catch(logErrorPromise(reject, 'Unable to create Stream with Codec Configuration ' + codecConfiguration.name + '.'));
  });
};

const createTSMuxingWithAESDRMAndManifestResources = (stream_, outputPath, codecConfiguration, output, encoding, hlsManifest) => {
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
      createAESDRMAndManifestResources(stream_, codecConfiguration, outputPath, createdMuxing, output, encoding, hlsManifest).then(([createdDrm, createdRepresentation]) => {
        resolve([createdMuxing, createdDrm, createdRepresentation]);
      });
    }).catch(logErrorPromise(reject, 'Unable to create TS Muxing ' + tsMuxing.name, + '.'));
  });
};

const createAESDRMAndManifestResources = (stream_, codecConfiguration, outputPath, tsMuxing, output, encoding, hlsManifest) => {
  return new Promise((resolve, reject) => {
    const drmOutputPath = OUTPUT_S3_BASE_PATH + '/' + outputPath + '/';
    const aesDRM = {
      name: 'AES DRM for ' + tsMuxing.name,
      outputs: [{
        outputId: output.id,
        outputPath: drmOutputPath,
        acl: [{
          permission: 'PUBLIC_READ'
        }]
      }],
      method: 'AES_128',
      key: DRM_AES_KEY,
      iv: DRM_AES_IV
    };

    bitmovin.encoding.encodings(encoding.id).muxings.ts(tsMuxing.id).drms.aes.add(aesDRM).then((createdDrm) => {
      console.log('Successfully created AES DRM ' + aesDRM.name + '.', createdDrm);
      createHlsManifestRepresentation(encoding, stream_, tsMuxing, createdDrm, hlsManifest, drmOutputPath).then((createdRepresentation) => {
        resolve([createdDrm, createdRepresentation]);
      });
    }).catch(error => {

      logErrorPromise(reject, 'Unable to create AES DRM ' + aesDRM.name + '.')
    });
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
