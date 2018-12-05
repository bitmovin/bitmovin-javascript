// 20_simple_encoding_mp4_with_burned_in_srt_subtitle.js

// ---------------------------------------------------------------------------------------------------------------------

const Bitmovin = require('bitmovin-javascript').default;
const Promise = require('bluebird');

const BITMOVIN_API_KEY = '<INSERT_YOUR_API_KEY>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});

const ENCODING_NAME = 'burn in srt ' + new Date().getTime() / 1000;

const INPUT_FILE_HOST = '<INPUT_FILE_HOST>';
const INPUT_FILE_PATH = '/path/to/your/input/file.mp4';
const INPUT_FILE_SRT_PATH = '/path/to/your/input/file.srt';

const S3_ACCESS_KEY = '<YOUR_S3_ACCESS_KEY>';
const S3_SECRET_KEY = '<YOUR_S3_SECRET_KEY>';
const S3_BUCKET_NAME = '<YOUR_S3_BUCKET>';
const S3_CLOUD_REGION = '<YOUR_S3_CLOUD_REGION>';
const OUTPUT_PATH = '/path/to/your/output/destination/';

const httpInput = {
  name: 'Http input',
  host: INPUT_FILE_HOST
};

const s3Output = {
  name: 'S3 output',
  accessKey: S3_ACCESS_KEY,
  secretKey: S3_SECRET_KEY,
  bucketName: S3_BUCKET_NAME,
  cloudRegion: S3_CLOUD_REGION
};

const h264VideoCodecConfiguration480p = {
  name: 'simple encoding - H264 480p',
  bitrate: 1200000,
  height: 480,
  profile: 'HIGH'
};

const encodingResource = {
  name: ENCODING_NAME,
  encoderVersion: '2.4.0' // Burn-in SRT subtitles are supported since 2.4.0, you can change to a newer version.
};

const main = () =>
  new Promise((resolve, reject) => {
    let h264CodecConfiguration480p = Object.assign({}, h264VideoCodecConfiguration480p);
    let input = Object.assign({}, httpInput);
    let output = Object.assign({}, s3Output);
    let encoding = Object.assign({}, encodingResource);

    const createHttpInputPromise = createHttpInput(input);
    createHttpInputPromise.then(createdInput => {
      console.log('Successfully created HTTP Input');
      input = createdInput;
    });

    const createS3OutputPromise = createS3Output(output);
    createS3OutputPromise.then(createdS3Output => {
      console.log('Successfully created S3 Output');
      output = createdS3Output;
    });

    const createH264480pPromise = createH264CodecConfiguration(h264CodecConfiguration480p);
    createH264480pPromise.then(createdCodecConfig => {
      console.log('Successfully created H264 Video Codec Configuration @480p');
      h264CodecConfiguration480p = createdCodecConfig;
    });

    const createEncodingPromise = createEncoding(encodingResource);
    createEncodingPromise.then(createdEncoding => {
      console.log('Successfully created Encoding Resource with name ' + encodingResource.name);
      encoding = createdEncoding;
    });

    const preparationPromises = [
      createHttpInputPromise,
      createS3OutputPromise,
      createH264480pPromise,
      createEncodingPromise
    ];

    const preparationPromise = Promise.all(preparationPromises);

    preparationPromise.then(() => {
      console.log('----\nSuccessfully created input, output, codec configurations and encoding resource.\n----');

      const videoCodecConfigurations = [h264CodecConfiguration480p];

      const videoStreamMuxingsPromises = Promise.map(
        videoCodecConfigurations,
        codecConfiguration => {
          console.log('Adding video stream with codecConfig ' + codecConfiguration.name + ' to encoding...');
          return addVideoStreamToEncoding(input, output, codecConfiguration, encoding);
        },
        {concurrency: 1}
      ).catch(error => {
        console.log('error creating video streams and muxings.');
        reject(error);
      });

      videoStreamMuxingsPromises
        .then(() => {
          startEncodingAndWaitForItToBeFinished(encoding).then(() => {
            resolve();
          });
        })
        .catch(error => {
          console.log('error during encoding');
          reject(error);
        });
    });
  });

const addVideoStreamToEncoding = (input, output, videoCodecConfig, encoding) => {
  const inputStream = {
    inputId: input.id,
    inputPath: INPUT_FILE_PATH,
    selectionMode: 'AUTO'
  };

  let videoStream = {
    inputStreams: [inputStream],
    codecConfigId: videoCodecConfig.id
  };

  return new Promise((resolve, reject) => {
    addVideoStreamAndCreateMuxing(encoding, videoStream, output, videoCodecConfig.bitrate)
      .then(addedMuxing => {
        console.log('Successfully created stream and muxing!');
        resolve(addedMuxing);
      })
      .catch(error => {
        console.error('Unable to create stream and/or muxing.');
        reject(error);
      });
  });
};

const addVideoStreamAndCreateMuxing = (encoding, videoStream, output, bitrate) => {
  const addStreamPromise = bitmovin.encoding.encodings(encoding.id).streams.add(videoStream);

  return new Promise((resolve, reject) => {
    addStreamPromise
      .then(addedStream => {
        console.log('stream resource successfully added');

        const inputBurnInSrtSubtitle = {
          name: 'burn in subtitle srt example',
          input: {
            inputId: videoStream.inputStreams[0].inputId,
            inputPath: INPUT_FILE_SRT_PATH
          }
        };

        const burnInSubtitlePromise = bitmovin.encoding
          .encodings(encoding.id)
          .streams(addedStream.id)
          .burnInSubtitles['srt'].add(inputBurnInSrtSubtitle);

        burnInSubtitlePromise
          .then(addedBurnInSubtitle => {
            console.log('burn in subtitle successfully added. ' + addedBurnInSubtitle.id);
            const prefix = bitrate + '/';

            const streams = [
              {
                streamId: addedStream.id
              }
            ];

            resolve(addMp4MuxingForStreams(encoding, streams, output, prefix));
          })
          .catch(error => {
            console.error('unable to add burn in subtitle to stream', error);
            reject(error);
          });
      })
      .catch(error => {
        console.error('unable to add stream to encoding', error);
        reject(error);
      });
  });
};

const addMp4MuxingForStreams = (encoding, streams, output, output_prefix) => {
  let mp4Muxing = {
    name: 'MP4' + output_prefix,
    streams,
    outputs: [
      {
        outputId: output.id,
        outputPath: OUTPUT_PATH + output_prefix,
        acl: [
          {
            permission: 'PUBLIC_READ'
          }
        ]
      }
    ],
    filename: 'file-with-burn-in-srt.mp4'
  };

  const addMuxingPromise = bitmovin.encoding.encodings(encoding.id).muxings.mp4.add(mp4Muxing);

  return new Promise((resolve, reject) => {
    addMuxingPromise
      .then(addedFMP4Muxing => {
        console.log('added fmp4 muxing ' + mp4Muxing.name);
        resolve(addedFMP4Muxing);
      })
      .catch(error => {
        console.error('error adding fmp4 muxing ' + mp4Muxing.name, error);
        reject(error);
      });
  });
};

const createHttpInput = input => {
  const inputCreatePromise = bitmovin.encoding.inputs.http.create(input);

  return new Promise((resolve, reject) => {
    inputCreatePromise
      .then(createdInput => {
        console.log('http input successfully created');
        resolve(createdInput);
      })
      .catch(error => {
        console.error('error creating http input', error);
        reject(error);
      });
  });
};

const createS3Output = output => {
  const outputCreatePromise = bitmovin.encoding.outputs.s3.create(output);

  return new Promise((resolve, reject) => {
    outputCreatePromise
      .then(createdOutput => {
        console.log('S3 output successfully created');
        resolve(createdOutput);
      })
      .catch(error => {
        console.error('error creating s3 output', error);
        reject(error);
      });
  });
};

const createH264CodecConfiguration = codecConfig => {
  const codecConfigPromise = bitmovin.encoding.codecConfigurations.h264.create(codecConfig);

  return new Promise((resolve, reject) => {
    codecConfigPromise
      .then(createdConfig => {
        console.log('h264 Codec configuration ' + codecConfig.name + ' successfully created');
        resolve(createdConfig);
      })
      .catch(error => {
        console.error('error creating h264 codec config ' + codecConfig.name);
        reject(error);
      });
  });
};

const createEncoding = encoding => {
  const encodingPromise = bitmovin.encoding.encodings.create(encoding);

  return new Promise((resolve, reject) => {
    encodingPromise
      .then(createdEncoding => {
        console.log('encoding ' + encoding.name + ' successfully created');
        resolve(createdEncoding);
      })
      .catch(error => {
        console.error('error creating encoding ' + encoding.name);
        reject(error);
      });
  });
};

const startEncodingAndWaitForItToBeFinished = encoding => {
  const startPromise = bitmovin.encoding.encodings(encoding.id).start();

  return new Promise((resolve, reject) => {
    startPromise.then(() => {
      waitUntilEncodingFinished(encoding)
        .then(success => {
          console.log('dash encoding finished', success);
          resolve(true);
        })
        .catch(error => {
          console.log('dash encoding errored', error);
          reject(error);
        });
    });
  });
};

const waitUntilEncodingFinished = encoding => {
  return new Promise((resolve, reject) => {
    const waitForEncodingToBeFinishedOrError = () => {
      console.log('GET STATUS FOR ENCODING WITH ID ', encoding.id);
      bitmovin.encoding
        .encodings(encoding.id)
        .status()
        .then(response => {
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

const exit = (code, message) => {
  console.error('ERROR: ', message, 'Exiting with code ', code);
  process.exit(code);
};

main()
  .then(() => {
    console.log('finished!');
  })
  .catch(error => {
    exit(100, error);
  });
