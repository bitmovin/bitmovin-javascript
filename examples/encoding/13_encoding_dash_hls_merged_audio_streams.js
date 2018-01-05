// 13_encoding_dash_hls_merged_audio_streams.js

const Bitmovin = require('bitmovin-javascript').default;
console.log(Bitmovin);
const Promise = require('bluebird');

const BITMOVIN_API_KEY = '<INSERT_YOUR_API_CODE>';
const bitmovin         = new Bitmovin({'apiKey': BITMOVIN_API_KEY, debug: false});

const ENCODING_NAME = 'encoding_' + (new Date().toISOString());

// Input Settings
// See https://bitmovin.com/encoding-documentation/bitmovin-api/#/reference/encoding/inputs/create-s3-input for more information
const S3_INPUT_ACCESS_KEY   = '<YOUR_S3_ACCESS_KEY>';
const S3_INPUT_SECRET_KEY   = '<YOUR_S3_SECRET_KEY>';
const S3_INPUT_BUCKET_NAME  = '<YOUR_S3_BUCKET>';

const INPUT_FILE_PATH = '/path/to/your/input/file.mkv';

// Output Settings
// See https://bitmovin.com/encoding-documentation/bitmovin-api/#/reference/encoding/outputs/create-s3-output for more information
const S3_OUTPUT_ACCESS_KEY = '<YOUR_S3_ACCESS_KEY>';
const S3_OUTPUT_SECRET_KEY = '<YOUR_S3_SECRET_KEY>';
const S3_OUTPUT_BUCKET_NAME = '<YOUR_S3_BUCKET>';

const OUTPUT_PATH     = '/output/bitmovin-javascript-examples/' + ENCODING_NAME + '/';

console.log('OUTPUT_PATH', OUTPUT_PATH);

const s3Input = {
  name       :  'Sample Input',
  description:  'This is a demo s3 input',
  accessKey:    S3_INPUT_ACCESS_KEY,
  secretKey:    S3_INPUT_SECRET_KEY,
  bucketName:   S3_INPUT_BUCKET_NAME
};

const s3Output = {
  name       :  'S3 Output',
  description:  'This is a demo S3 output',
  accessKey:    S3_OUTPUT_ACCESS_KEY,
  secretKey:    S3_OUTPUT_SECRET_KEY,
  bucketName:   S3_OUTPUT_BUCKET_NAME
};

const audioStreams = [{
    inputStreams: [{
      position: 0,
      selectionMode: 'AUDIO_RELATIVE'
    }, {
      position: 1,
      selectionMode: 'AUDIO_RELATIVE'
    }],
  lang: 'sp'
}, {
  inputStreams: [{
    position: 2,
    selectionMode: 'AUDIO_RELATIVE'
  }, {
    position: 3,
    selectionMode: 'AUDIO_RELATIVE'
  }],
  lang: 'en'
}];

// AAC Audio Configuration
const aacAudioCodecConfiguration       = {
  name   : 'Audio',
  bitrate: 128000,
  rate   : 48000
};

// Video Codec Configurations
const h264VideoCodecConfiguration720p  = {
  name   : 'H264 720p',
  bitrate: 2400000,
  height : 720,
  profile: 'HIGH'
};

const h264VideoCodecConfiguration480p = {
  name   : 'H264 480p',
  bitrate: 1200000,
  height : 480,
  profile: 'HIGH'
};

const h264VideoCodecConfiguration360p = {
  name   : 'H264 360p',
  bitrate: 800000,
  height : 360,
  profile: 'HIGH'
};

const h264VideoCodecConfiguration240p = {
  name   : 'H264 240p',
  bitrate: 400000,
  height : 240,
  profile: 'HIGH'
};

const encodingResource = {
  name: ENCODING_NAME,
  description: 'bitmovin-javascript api client test encoding',
  encoderVersion: 'STABLE'
};

const main = () => new Promise((resolve, reject) => {

  let aacCodecConfiguration = Object.assign({}, aacAudioCodecConfiguration);
  let h264CodecConfiguration720p = Object.assign({}, h264VideoCodecConfiguration720p);
  let h264CodecConfiguration480p = Object.assign({}, h264VideoCodecConfiguration480p);
  let h264CodecConfiguration320p = Object.assign({}, h264VideoCodecConfiguration360p);
  let h264CodecConfiguration240p = Object.assign({}, h264VideoCodecConfiguration240p);

  let input = Object.assign({}, s3Input);
  let output = Object.assign({}, s3Output);
  let encoding = Object.assign({}, encodingResource);

  const createInputPromise = createS3Input(input).then((createdInput) => {
    console.log('Successfully created HTTP Input');
    input = createdInput;
  });

  const createOutputPromise = createS3Output(output).then((createdS3Output) => {
    console.log('Successfully created S3 Output');
    output = createdS3Output;
  });

  const createAACPromise = createAACCodecConfiguration(aacCodecConfiguration).then((createdCodecConfig) => {
    console.log('Successfully created AAC Audio Codec Configuration');
    aacCodecConfiguration = createdCodecConfig;
  });

  const create720pPromise = createH264CodecConfiguration(h264CodecConfiguration720p).then((createdCodecConfig) => {
    console.log('Successfully created H264 Video Codec Configuration @720p');
    h264CodecConfiguration720p = createdCodecConfig;
  });

  const create480pPromise = createH264CodecConfiguration(h264CodecConfiguration480p).then((createdCodecConfig) => {
    console.log('Successfully created H264 Video Codec Configuration @480p');
    h264CodecConfiguration480p = createdCodecConfig;
  });

  const create320pPromise = createH264CodecConfiguration(h264CodecConfiguration320p).then((createdCodecConfig) => {
    console.log('Successfully created H264 Video Codec Configuration @320p');
    h264CodecConfiguration320p = createdCodecConfig;
  });

  const create240pPromise = createH264CodecConfiguration(h264CodecConfiguration240p).then((createdCodecConfig) => {
    console.log('Successfully created H264 Video Codec Configuration @240p');
    h264CodecConfiguration240p = createdCodecConfig;
  });

  const createEncodingPromise = createEncoding(encodingResource).then((createdEncoding) => {
    console.log('Successfully created Encoding Resource with name ' + encodingResource.name);
    encoding = createdEncoding;
  });

  const preparationPromises = [
    createInputPromise,
    createOutputPromise,
    create240pPromise,
    create320pPromise,
    create480pPromise,
    create720pPromise,
    createAACPromise,
    createEncodingPromise
  ];

  const preparationPromise = Promise.all(preparationPromises);
  preparationPromise.then(() => {
    console.log('----\nSuccessfully created input, output, codec configurations and encoding resource.\n----');

    const audioStreamPromises = Promise.map(audioStreams, audioStream => {
      const inputStreams = audioStream.inputStreams.map(inputStream => {
        const inputStreamToCreate = {
          inputId: input.id,
          inputPath: INPUT_FILE_PATH,
          position: inputStream.position,
          selectionMode: inputStream.selectionMode
        };

        return inputStreamToCreate;
      });

      return addAudioStreamToEncoding(output, aacCodecConfiguration, inputStreams, encoding, audioStream.lang);
    }, {concurrency: 1});

    const videoCodecConfigurations = [
      h264CodecConfiguration240p,
      h264CodecConfiguration320p,
      h264CodecConfiguration480p,
      h264CodecConfiguration720p
    ];

    const videoStreamPromises = Promise.map(videoCodecConfigurations, (codecConfiguration) => {
      console.log('Adding stream with codecConfig ' + codecConfiguration.name + ' to encoding...');
      return addVideoStreamToEncoding(input, output, codecConfiguration, encoding);
    }, {concurrency: 1});

    Promise.all([audioStreamPromises, videoStreamPromises]).then(([audioStreams, videoStrams]) => {
      const audioMuxings = audioStreams.map(audioStream => {
        const muxingWithPath = audioStream[1];
        muxingWithPath.streamId = audioStream[0].id;
        return muxingWithPath;
      });
      const videoMuxings = videoStrams.map(videoStream => {
        const muxingWithPath = videoStream[1];
        muxingWithPath.streamId = videoStream[0].id;
        return muxingWithPath;
      });

      const dashManifestPromise = createDashManifest(
        output,
        encoding,
        audioMuxings,
        videoMuxings
      );

      const hlsManifestPromise  = createHlsManifest(
        output,
        encoding,
        audioMuxings,
        videoMuxings
      );

      Promise.all([dashManifestPromise, hlsManifestPromise]).then(([createdDashManifest, createdHlsManifest]) => {
        startEncodingAndWaitForItToBeFinished(encoding).then(() => {
          console.log('Successfully finished encoding');

          const dashManifestCreationPromise = startDashManifestCreation(createdDashManifest);
          const hlsManifestCreationPromise = startHlsManifestCreation(createdHlsManifest);

          Promise.all([dashManifestCreationPromise, hlsManifestCreationPromise]).then((manifestCreationResponses) => {
            console.log('Successfully created DASH and HLS Manifests');
            resolve(true);
          });
        });
      }).catch((error) => {
        console.log('error occurred.');
        reject(error);
      });
    }).catch((error) => {
      console.log('error creating streams and muxings.');
      reject(error);
    });
  });
});

const addAudioStreamToEncoding = (output, aacCodecConfiguration, inputStreams, encoding, language) => {
  let stream = {
    inputStreams: inputStreams,
    codecConfigId: aacCodecConfiguration.id
  };

  return new Promise((resolve, reject) => {
    addStream(encoding, stream, output, aacCodecConfiguration, language).then(([addedStream, addedMuxing]) => {
      console.log('Successfully created audio stream and muxing');
      resolve([addedStream, addedMuxing]);
    }).catch((error) => {
      console.error('Unable to create audio stream and/or muxing.');
      reject(error);
    });
  });
};

const addVideoStreamToEncoding = (input, output, videoCodecConfig, encoding) => {
  const inputStream = {
    inputId: input.id,
    inputPath: INPUT_FILE_PATH,
    selectionMode: 'AUTO'
  };

  let stream = {
    inputStreams: [inputStream],
    codecConfigId: videoCodecConfig.id
  };

  return new Promise((resolve, reject) => {
    addStream(encoding, stream, output, videoCodecConfig).then(([addedStream, addedMuxing]) => {
      console.log('Successfully created video stream and muxing!');
      resolve([addedStream, addedMuxing]);
    }).catch((error) => {
      console.error('Unable to create video stream and/or muxing.');
      reject(error);
    });
  });
};

const startDashManifestCreation = (manifest) => {
  const startPromise = bitmovin.encoding.manifests.dash(manifest.id).start();

  return new Promise((resolve, reject) => {
    startPromise.then((startResponse) => {
      waitUntilDashManifestFinished(manifest).then((success) => {
        console.log('manifest finished', success);
        resolve(true);
      }).catch((error) => {
        console.log('manifest errored', error);
        reject(error);
      })
    });
  });
};

const startHlsManifestCreation = (manifest) => {
  const startPromise = bitmovin.encoding.manifests.hls(manifest.id).start();

  return new Promise((resolve, reject) => {
    startPromise.then((startResponse) => {
      waitUntilHlsManifestFinished(manifest).then((success) => {
        console.log('hls manifest finished', success);
        resolve(true);
      }).catch((error) => {
        console.log('hls manifest errored', error);
        reject(error);
      })
    });
  });
};

const startEncodingAndWaitForItToBeFinished = (encoding) => {
  const startPromise = bitmovin.encoding.encodings(encoding.id).start();

  return new Promise((resolve, reject) => {
    startPromise.then((startResponse) => {
      waitUntilEncodingFinished(encoding).then((success) => {
        console.log('dash encoding finished', success);
        resolve(true);
      }).catch((error) => {
        console.log('dash encoding errored', error);
        reject(error);
      })
    });
  });
};

const waitUntilEncodingFinished = (encoding) => {
  return new Promise((resolve, reject) => {
    const waitForEncodingToBeFinishedOrError = () => {
      console.log('GET STATUS FOR ENCODING WITH ID ', encoding.id);
      bitmovin.encoding.encodings(encoding.id).status().then((response) => {
        console.log('Encoding status is ' + response.status);

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

const waitUntilDashManifestFinished = (manifest) => {
  return new Promise((resolve, reject) => {
    const waitForManifestToBeFinished = () => {
      console.log('GET STATUS FOR DASH MANIFEST WITH ID ', manifest.id);
      bitmovin.encoding.manifests.dash(manifest.id).status().then((response) => {
        console.log('DASH Manifest status is ' + response.status);

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

const waitUntilHlsManifestFinished = (manifest) => {
  return new Promise((resolve, reject) => {
    const waitForManifestToBeFinished = () => {
      console.log('GET STATUS FOR HLS MANIFEST WITH ID ', manifest.id);
      bitmovin.encoding.manifests.hls(manifest.id).status().then((response) => {
        console.log('HLS Manifest status is ' + response.status);

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

const createHlsManifest = (output, encoding, audioMuxingsWithPath, videoMuxingsWithPath) => {
  return new Promise((resolve, reject) => {
    const mediaPromises = [];

    createHlsManifestResource(output).then((createdHlsManifest) => {
      let audioPromise;

      if (audioMuxingsWithPath.length > 0) {
        let promise = Promise.map(audioMuxingsWithPath, (audioMuxingWithPath, index) => {
          const tsMuxing = audioMuxingWithPath.tsMuxing;
          const path = audioMuxingWithPath.path;

          const audioMedia = {
            groupId: 'audio_group',
            name: audioStreams[index].lang,
            segmentPath: path,
            encodingId: encoding.id,
            muxingId: tsMuxing.id,
            streamId: audioMuxingWithPath.streamId,
            language: audioStreams[index].lang,
            uri: 'audiomedia_' + audioStreams[index].lang + '.m3u8'
          };
          return bitmovin.encoding.manifests.hls(createdHlsManifest.id).media.audio.add(audioMedia);
        });
        audioPromise = promise;
      } else {
        audioPromise = Promise.resolve(null);
      }

      audioPromise.then((result) => {
        let audio_group = 'audio_group';
        if (result === null) {
          audio_group = null;
        }

        let videoPromise;
        if (videoMuxingsWithPath.length > 0) {

          videoPromise = Promise.map(videoMuxingsWithPath, (videoMuxingWithPath) => {
            const uri = 'video_' + videoMuxingWithPath.path.split('/')[videoMuxingWithPath.path.split('/').length-2] + '.m3u8';

            const variantStream = {
              audio: audio_group,
              closedCaptions: 'NONE',
              segmentPath: videoMuxingWithPath.path,
              uri: uri,
              encodingId: encoding.id,
              streamId: videoMuxingWithPath.streamId,
              muxingId: videoMuxingWithPath.tsMuxing.id
            };

            return bitmovin.encoding.manifests.hls(createdHlsManifest.id).streams.add(variantStream);
          });
        }
        else {
          videoPromise = Promise.resolve(null);
        }

        videoPromise.then((result) => {
          console.log('Successfully created HLS Manifest with Video/Audio Media entries.');
          resolve(createdHlsManifest);
        });
      });
    });
  }).catch((error) => {
    console.log('Unable to create HLS manifest', error);
    reject(error);
  });
};

const createDashManifest = (output, encoding, audioMuxingsWithPath, videoMuxingsWithPath) => {
  return new Promise((resolve, reject) => {
    createDashManifestResource(output).then((createdManifest) => {
      const period = {};
      bitmovin.encoding.manifests.dash(createdManifest.id).periods.add(period).then((createdPeriod) => {
        console.log('successfully created period');

        const videoAdaptationSet = {};

        let audioAdaptationSetPromise;
        let videoAdaptationSetPromise;

        console.log('AudioMuxingsWithPath: ', audioMuxingsWithPath.length);
        console.log('VideoMuxingsWithPath: ', videoMuxingsWithPath.length);

        if (audioMuxingsWithPath.length > 0) {

          const audioAdaptationSetPromises = audioStreams.map(audioStream => {
            const audioAdaptationSet = {
              lang: audioStream.lang
            };

            return bitmovin.encoding.manifests.dash(createdManifest.id).periods(createdPeriod.id).adaptationSets.audio.create(audioAdaptationSet);
          });
          audioAdaptationSetPromise = Promise.all(audioAdaptationSetPromises);
        } else
          audioAdaptationSetPromise = Promise.resolve([]);

        if (videoMuxingsWithPath.length > 0)
          videoAdaptationSetPromise = bitmovin.encoding.manifests.dash(createdManifest.id).periods(createdPeriod.id)
            .adaptationSets.video.create(videoAdaptationSet);
        else
          videoAdaptationSetPromise = Promise.resolve([]);

        Promise.all([audioAdaptationSetPromise, videoAdaptationSetPromise])
        .then(([createdAudioAdaptationSet, createdVideoAdaptationSet]) => {

          Promise.map(audioMuxingsWithPath, (muxingWithPath, index) => {
            const fmp4Muxing = muxingWithPath.fmp4Muxing;
            const path = muxingWithPath.path;

            const fmp4Representation = {
              type: 'TEMPLATE',
              encodingId: encoding.id,
              muxingId: fmp4Muxing.id,
              segmentPath: path
            };
            return bitmovin.encoding.manifests.dash(createdManifest.id).periods(createdPeriod.id)
              .adaptationSets(createdAudioAdaptationSet[index].id).representations.fmp4.add(fmp4Representation);
          }).then(() => {
            console.log('Successfully added Audio representations');
            Promise.map(videoMuxingsWithPath, (muxingWithPath) => {
              const fmp4Muxing = muxingWithPath.fmp4Muxing;
              const path = muxingWithPath.path;

              const fmp4Representation = {
                type: 'TEMPLATE',
                encodingId: encoding.id,
                muxingId: fmp4Muxing.id,
                segmentPath: path
              };

              return bitmovin.encoding.manifests.dash(createdManifest.id).periods(createdPeriod.id)
                .adaptationSets(createdVideoAdaptationSet.id).representations.fmp4.add(fmp4Representation);
            }).then(() => {
              console.log('successfully added Video representations');
              resolve(createdManifest);
            });
          });
        });
      });
    }).catch((error) => {
      console.log('Unable to create DASH manifest', error);
      reject(error);
    })
  });
};

const createDashManifestResource = (output) => {
  const manifest = {
    name: 'Sample Encoding Manifest ' + ENCODING_NAME,
    outputs: [{
      outputId: output.id,
      outputPath: OUTPUT_PATH,
      acl: [{
        permission: 'PUBLIC_READ'
      }]
    }],
    manifestName: 'myencoding.mpd'
  };

  return new Promise((resolve, reject) => {
    bitmovin.encoding.manifests.dash.create(manifest).then((createdManifest) => {
      console.log('successfully created dash manifest resource');
      resolve(createdManifest);
    }).catch((error) => {
      console.error('error creating dash manifest resource', error);
      reject(error);
    });
  });
};

const createHlsManifestResource = (output) => {
  const manifest = {
    name: 'Sample Encoding Manifest ' + ENCODING_NAME,
    outputs: [{
      outputId: output.id,
      outputPath: OUTPUT_PATH,
      acl: [{
        permission: 'PUBLIC_READ'
      }]
    }],
    manifestName: 'myencoding.m3u8'
  };

  return new Promise((resolve, reject) => {
    bitmovin.encoding.manifests.hls.create(manifest).then((createdManifest) => {
      console.log('successfully created hls manifest resource');
      resolve(createdManifest);
    }).catch((error) => {
      console.error('error creating hls manifest resource', error);
      reject(error);
    });
  });
};

const addStream = (encoding, stream, output, codecConfiguration, language) => {
  const addStreamPromise = bitmovin.encoding.encodings(encoding.id).streams.add(stream);

  return new Promise((resolve, reject) => {
    addStreamPromise.then((addedStream) => {
      console.log('stream resource successfully added');

      let prefix;

      if (codecConfiguration.height || codecConfiguration.width) {
        if (codecConfiguration.height)
          prefix = 'video/' + codecConfiguration.height;
        else if (codecConfiguration.width)
          prefix = 'video/' + codecConfiguration.width;
      }
      else if (language) {
        prefix = 'audio/' + language + '/' + codecConfiguration.bitrate;
      }

      prefix += '/';
      addFmp4MuxingForStream(encoding, addedStream, output, prefix).then((addedFmp4Muxing) => {
        addTsMuxingForStream(encoding, addedStream, output, prefix).then((addedTsMuxing) => {
          const muxingWithPath = {
            fmp4Muxing: addedFmp4Muxing,
            tsMuxing: addedTsMuxing,
            path: prefix
          };
          resolve([addedStream, muxingWithPath])
        });
      });
    }).catch((error) => {
      console.error('unable to add stream to encoding', error);
      reject(error);
    });
  });
};

const addFmp4MuxingForStream = (encoding, stream, output, output_prefix) => {
  let fmp4Muxing = {
    name: 'FMP4 ' + output_prefix,
    streams: [{
      streamId: stream.id
    }],
    outputs: [{
      outputId: output.id,
      outputPath: OUTPUT_PATH + output_prefix,
      acl: [{
        permission: 'PUBLIC_READ'
      }]
    }],
    segmentLength: 4,
    segmentNaming: 'seg_%number%.m4s',
    initSegmentName: 'init.mp4'
  };

  const addMuxingPromise = bitmovin.encoding.encodings(encoding.id).muxings.fmp4.add(fmp4Muxing);

  return new Promise((resolve, reject) => {
    addMuxingPromise.then((addedFMP4Muxing) => {
      console.log('added fmp4 muxing ' + fmp4Muxing.name);
      resolve(addedFMP4Muxing);
    }).catch((error) => {
      console.error('error adding fmp4 muxing ' + fmp4Muxing.name, error);
      reject(error);
    });
  });
};

const addTsMuxingForStream = (encoding, stream, output, output_prefix) => {
  let tsMuxing = {
    name: 'TS ' + output_prefix,
    streams: [{
      streamId: stream.id
    }],
    outputs: [{
      outputId: output.id,
      outputPath: OUTPUT_PATH + output_prefix,
      acl: [{
        permission: 'PUBLIC_READ'
      }]
    }],
    segmentLength: 4,
    segmentNaming: 'seg_%number%.ts'
  };

  const addMuxingPromise = bitmovin.encoding.encodings(encoding.id).muxings.ts.add(tsMuxing);

  return new Promise((resolve, reject) => {
    addMuxingPromise.then((addedTSMuxing) => {
      console.log('added ts muxing ' + tsMuxing.name);
      resolve(addedTSMuxing);
    }).catch((error) => {
      console.error('error adding ts muxing ' + tsMuxing.name, error);
      reject(error);
    });
  });
};


const createS3Input = (input) => {
  const inputCreatePromise      = bitmovin.encoding.inputs.s3.create(input);

  return new Promise((resolve, reject) => {
    inputCreatePromise.then((createdInput) => {
      console.log('s3 input successfully created');
      resolve(createdInput);
    }).catch((error) => {
      console.error('error creating s3 input', error);
      reject(error);
    });
  });
};

const createS3Output = (output) => {
  const outputCreatePromise = bitmovin.encoding.outputs.s3.create(output);

  return new Promise((resolve, reject) => {
    outputCreatePromise.then((createdOutput) => {
      console.log('S3 output successfully created');
      resolve(createdOutput);
    }).catch((error) => {
      console.error('error creating S3 output', error);
      reject(error);
    });
  });
};

const createH264CodecConfiguration = (codecConfig) => {
  const codecConfigPromise = bitmovin.encoding.codecConfigurations.h264.create(codecConfig);

  return new Promise((resolve, reject) => {
    codecConfigPromise.then((createdConfig) => {
      console.log('h264 Codec configuration ' + codecConfig.name + ' successfully created');
      resolve(createdConfig);
    }).catch((error) => {
      console.error('error creating h264 codec config ' + codecConfig.name);
      reject(error);
    });
  });
};

const createAACCodecConfiguration = (codecConfig) => {
  const codecConfigPromise = bitmovin.encoding.codecConfigurations.aac.create(codecConfig);

  return new Promise((resolve, reject) => {
    codecConfigPromise.then((createdConfig) => {
      console.log('aac Codec configuration ' + codecConfig.name + ' successfully created');
      resolve(createdConfig);
    }).catch((error) => {
      console.error('error creating aac codec config ' + codecConfig.name);
      reject(error);
    });
  });
};

const createEncoding = (encoding) => {
  const encodingPromise = bitmovin.encoding.encodings.create(encoding);

  return new Promise((resolve, reject) => {
    encodingPromise.then((createdEncoding) => {
      console.log('encoding ' + encoding.name + ' successfully created');
      resolve(createdEncoding);
    }).catch((error) => {
      console.error('error creating encoding ' + encoding.name);
      reject(error);
    });
  });
};

const exit = (code, message) => {
  console.error('ERROR: ', message, 'Exiting with code ', code);
  process.exit(code);
};

main().then((result) => {
  console.log('finished!');
}).catch((error) => {
  exit(100, error);
});
