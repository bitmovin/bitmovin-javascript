// 08_simple_encoding_webm_in_dash_manifest.js

// ---------------------------------------------------------------------------------------------------------------------

// Steps
// =====
//
// 1. Preparations
// ----------------
// 1.1. Create an input which holds your source files.
// 1.2. Create an output where the generated content should go to
// 1.3. Create various codec configurations which specify quality parameters for your generated content.

// 2. Encoding
// ------------
// 2.1. Create an encoding resource and give it a name.
// 2.2. Add a stream to your encoding. Typically you would like to add one audio stream and multiple video streams.
//      Each stream maps to a codec configuration which you have created earlier and specifies the quality properties
//      of your generated output.
// 2.3. Add muxings to your encoding. In this example we create a WEBM muxing for each of your configured streams.
//      That will give the player the ability to adapt between various qualities later on.
// 2.4. Start your fully configured encoding.

// 3. Manifest
// ------------
// 3.1. Create a manifest resource. Typically you want to create a DASH one. This creates the manifest file which the
//      player uses to determine which content it should play and what qualities of that content are available.
// 3.2. Add a period to your DASH manifest. In the most cases you only need one such period.
// 3.3. Add an audio adaptation set. One audio adaptation set is typically enough for the most use cases.
// 3.4. Add a video adaptation set. One video adaptation set is typically enough for the most use cases. It gives the
//      player the opportunity to switch between various qualities inside that adaptation set.
// 3.5. Add an audio webm representation to the previously created audio adaptation set.
// 3.6. Add multiple video webm representations th the previously created video adaptation set. The number of the video
//      representations can be derived from the number of the created video streams with different codec configurations.
// 3.7. Start the manifest creation.

// ---------------------------------------------------------------------------------------------------------------------

const Bitmovin = require('bitmovin-javascript').default;
console.log(Bitmovin);
const Promise = require('bluebird');

const BITMOVIN_API_KEY = '<INSERT_YOUR_API_KEY>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});

const ENCODING_NAME = 'simple_encoding_webm_in_dash' + new Date().getTime() / 1000;

const INPUT_FILE_HOST = '<INPUT_FILE_HOST>';
const INPUT_FILE_PATH = '/path/to/your/input/file.mp4';

const S3_ACCESS_KEY = '<YOUR_S3_ACCESS_KEY>';
const S3_SECRET_KEY = '<YOUR_S3_SECRET_KEY>';
const S3_BUCKET_NAME = '<YOUR_S3_BUCKET>';
const S3_CLOUD_REGION = '<YOUR_S3_CLOUD_REGION>';
const OUTPUT_PATH = '/path/to/your/output/destination/';

console.log('OUTPUT_PATH', OUTPUT_PATH);

const httpInput = {
  name: 'HTTPS Input for simple encoding',
  description: 'sample input file for simple encoding test in bitmovin-javascript',
  host: INPUT_FILE_HOST
};

const s3Output = {
  name: 'S3 Output for simple encoding',
  accessKey: S3_ACCESS_KEY,
  secretKey: S3_SECRET_KEY,
  bucketName: S3_BUCKET_NAME,
  cloudRegion: S3_CLOUD_REGION
};

// CC
const vorbisAudioCodecConfiguration = {
  name: 'English',
  bitrate: 128000,
  rate: 48000
};
const vp9VideoCodecConfiguration1080p = {
  name: 'simple encoding - VP9 1080p',
  bitrate: 4800000,
  rate: 24.0,
  width: 1920,
  height: 816
};
const vp9VideoCodecConfiguration720p = {
  name: 'simple encoding - VP9 720p',
  bitrate: 2400000,
  rate: 24.0,
  width: 1280,
  height: 544
};

const encodingResource = {
  name: ENCODING_NAME
};

const main = () =>
  new Promise((resolve, reject) => {
    let vorbisCodecConfiguration = Object.assign({}, vorbisAudioCodecConfiguration);
    let vp9CodecConfiguration1080p = Object.assign({}, vp9VideoCodecConfiguration1080p);
    let vp9CodecConfiguration720p = Object.assign({}, vp9VideoCodecConfiguration720p);
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

    const createVorbisPromise = createVorbisCodecConfiguration(vorbisCodecConfiguration);
    createVorbisPromise.then(createdCodecConfig => {
      console.log('Successfully created Vorbis Audio Codec Configuration');
      vorbisCodecConfiguration = createdCodecConfig;
    });

    const createVp91080pPromise = createVp9CodecConfiguration(vp9CodecConfiguration1080p);
    createVp91080pPromise.then(createdCodecConfig => {
      console.log('Successfully created VP9 Video Codec Configuration @1080p');
      vp9CodecConfiguration1080p = createdCodecConfig;
    });

    const createVp9720pPromise = createVp9CodecConfiguration(vp9CodecConfiguration720p);
    createVp9720pPromise.then(createdCodecConfig => {
      console.log('Successfully created VP9 Video Codec Configuration @720p');
      vp9CodecConfiguration720p = createdCodecConfig;
    });

    const createEncodingPromise = createEncoding(encodingResource);
    createEncodingPromise.then(createdEncoding => {
      console.log('Successfully created Encoding Resource with name ' + encodingResource.name);
      encoding = createdEncoding;
    });

    const preparationPromises = [
      createHttpInputPromise,
      createS3OutputPromise,
      createVp91080pPromise,
      createVp9720pPromise,
      createVorbisPromise,
      createEncodingPromise
    ];

    const preparationPromise = Promise.all(preparationPromises);
    preparationPromise.then(() => {
      console.log('----\nSuccessfully created input, output, codec configurations and encoding resource.\n----');

      const codecConfigurations = [vorbisCodecConfiguration, vp9CodecConfiguration1080p, vp9CodecConfiguration720p];

      Promise.map(
        codecConfigurations,
        codecConfiguration => {
          console.log('Adding stream with codecConfig ' + codecConfiguration.name + ' to encoding...');
          return addStreamToEncoding(input, output, codecConfiguration, encoding);
        },
        {concurrency: 1}
      )
        .then(results => {
          const [
            [addedAudioStream, addedAudioMuxing],
            [addedVideoStream1080p, addedVideoMuxing1080p],
            [addedVideoStream720p, addedVideoMuxing720p]
          ] = results;

          addedAudioMuxing.streamId = addedAudioStream.id;
          addedVideoMuxing720p.streamId = addedVideoStream720p.id;
          addedVideoMuxing1080p.streamId = addedVideoStream1080p.id;

          console.log('Added audio Muxing', addedAudioMuxing);
          console.log('Added video Muxing 1080p', addedVideoMuxing1080p);
          console.log('Added video Muxing 720p', addedVideoMuxing720p);

          const dashManifestPromise = createDashManifest(
            output,
            encoding,
            [addedAudioMuxing],
            [addedVideoMuxing1080p, addedVideoMuxing720p]
          );

          Promise.all([dashManifestPromise])
            .then(([createdDashManifest]) => {
              startEncodingAndWaitForItToBeFinished(encoding).then(() => {
                console.log('Successfully finished encoding');

                const dashManifestCreationPromise = startDashManifestCreation(createdDashManifest);

                Promise.all([dashManifestCreationPromise]).then(() => {
                  console.log('Successfully created DASH Manifests');
                  resolve(true);
                });
              });
            })
            .catch(error => {
              console.log('error occurred.');
              reject(error);
            });
        })
        .catch(error => {
          console.log('error creating streams and muxings.');
          reject(error);
        });
    });
  });

const addStreamToEncoding = (input, output, codecConfiguration, encoding) => {
  const inputStream = {
    inputId: input.id,
    inputPath: INPUT_FILE_PATH,
    selectionMode: 'AUTO'
  };

  let stream = {
    inputStreams: [inputStream],
    codecConfigId: codecConfiguration.id
  };

  return new Promise((resolve, reject) => {
    addStream(encoding, stream, output, codecConfiguration)
      .then(([addedStream, addedMuxing]) => {
        console.log('Successfully created stream and muxing!');
        resolve([addedStream, addedMuxing]);
      })
      .catch(error => {
        console.error('Unable to create stream and/or muxing.');
        reject(error);
      });
  });
};

const startDashManifestCreation = manifest => {
  const startPromise = bitmovin.encoding.manifests.dash(manifest.id).start();

  return new Promise((resolve, reject) => {
    startPromise.then(() => {
      waitUntilDashManifestFinished(manifest)
        .then(success => {
          console.log('manifest finished', success);
          resolve(true);
        })
        .catch(error => {
          console.log('manifest errored', error);
          reject(error);
        });
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

const waitUntilDashManifestFinished = manifest => {
  return new Promise((resolve, reject) => {
    const waitForManifestToBeFinished = () => {
      console.log('GET STATUS FOR DASH MANIFEST WITH ID ', manifest.id);
      bitmovin.encoding.manifests
        .dash(manifest.id)
        .status()
        .then(response => {
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

const createDashManifest = (output, encoding, audioMuxingsWithPath, videoMuxingsWithPath) => {
  return new Promise((resolve, reject) => {
    createDashManifestResource(output)
      .then(createdManifest => {
        const period = {};
        bitmovin.encoding.manifests
          .dash(createdManifest.id)
          .periods.add(period)
          .then(createdPeriod => {
            console.log('successfully created period');

            const audioAdaptationSet = {
              lang: 'en'
            };

            const videoAdaptationSet = {};

            let audioAdaptationSetPromise;
            let videoAdaptationSetPromise;

            console.log('AudioMuxingsWithPath: ', audioMuxingsWithPath.length);
            console.log('VideoMuxingsWithPath: ', videoMuxingsWithPath.length);

            if (audioMuxingsWithPath.length > 0)
              audioAdaptationSetPromise = bitmovin.encoding.manifests
                .dash(createdManifest.id)
                .periods(createdPeriod.id)
                .adaptationSets.audio.create(audioAdaptationSet);
            else audioAdaptationSetPromise = Promise.resolve([]);

            if (videoMuxingsWithPath.length > 0)
              videoAdaptationSetPromise = bitmovin.encoding.manifests
                .dash(createdManifest.id)
                .periods(createdPeriod.id)
                .adaptationSets.video.create(videoAdaptationSet);
            else videoAdaptationSetPromise = Promise.resolve([]);

            Promise.all([audioAdaptationSetPromise, videoAdaptationSetPromise]).then(
              ([createdAudioAdaptationSet, createdVideoAdaptationSet]) => {
                Promise.map(audioMuxingsWithPath, muxingWithPath => {
                  const webmMuxing = muxingWithPath.webmMuxing;
                  const path = muxingWithPath.path;

                  const webmRepresentation = {
                    type: 'TEMPLATE',
                    encodingId: encoding.id,
                    muxingId: webmMuxing.id,
                    segmentPath: path
                  };
                  return bitmovin.encoding.manifests
                    .dash(createdManifest.id)
                    .periods(createdPeriod.id)
                    .adaptationSets(createdAudioAdaptationSet.id)
                    .representations.webm.add(webmRepresentation);
                }).then(() => {
                  console.log('Successfully added Audio representations');
                  Promise.map(videoMuxingsWithPath, muxingWithPath => {
                    const webmMuxing = muxingWithPath.webmMuxing;
                    const path = muxingWithPath.path;

                    const webmRepresentation = {
                      type: 'TEMPLATE',
                      encodingId: encoding.id,
                      muxingId: webmMuxing.id,
                      segmentPath: path
                    };

                    return bitmovin.encoding.manifests
                      .dash(createdManifest.id)
                      .periods(createdPeriod.id)
                      .adaptationSets(createdVideoAdaptationSet.id)
                      .representations.webm.add(webmRepresentation);
                  }).then(() => {
                    console.log('successfully added Video representations');
                    resolve(createdManifest);
                  });
                });
              }
            );
          });
      })
      .catch(error => {
        console.log('Unable to create DASH manifest', error);
        reject(error);
      });
  });
};

const createDashManifestResource = output => {
  const manifest = {
    name: 'Sample Encoding Manifest ' + ENCODING_NAME,
    outputs: [
      {
        outputId: output.id,
        outputPath: OUTPUT_PATH,
        acl: [
          {
            permission: 'PUBLIC_READ'
          }
        ]
      }
    ],
    manifestName: 'myencoding.mpd'
  };

  return new Promise((resolve, reject) => {
    bitmovin.encoding.manifests.dash
      .create(manifest)
      .then(createdManifest => {
        console.log('successfully created dash manifest resource');
        resolve(createdManifest);
      })
      .catch(error => {
        console.error('error creating dash manifest resource', error);
        reject(error);
      });
  });
};

const addStream = (encoding, stream, output, codecConfiguration) => {
  const addStreamPromise = bitmovin.encoding.encodings(encoding.id).streams.add(stream);

  return new Promise((resolve, reject) => {
    addStreamPromise
      .then(addedStream => {
        console.log('stream resource successfully added');

        let prefix;

        if (codecConfiguration.height || codecConfiguration.width) {
          if (codecConfiguration.height) prefix = 'video/' + codecConfiguration.height;
          else if (codecConfiguration.width) prefix = 'video/' + codecConfiguration.width;
        } else {
          prefix = 'audio/' + codecConfiguration.bitrate;
        }

        prefix += '/';
        addWebmMuxingForStream(encoding, addedStream, output, prefix).then(addedWebmMuxing => {
          const muxingWithPath = {
            webmMuxing: addedWebmMuxing,
            path: prefix
          };
          resolve([addedStream, muxingWithPath]);
        });
      })
      .catch(error => {
        console.error('unable to add stream to encoding', error);
        reject(error);
      });
  });
};

const addWebmMuxingForStream = (encoding, stream, output, output_prefix) => {
  let webmMuxing = {
    name: 'WEBM ' + output_prefix,
    streams: [
      {
        streamId: stream.id
      }
    ],
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
    segmentLength: 4,
    segmentNaming: 'seg_%number%.chk',
    initSegmentName: 'init.hdr'
  };

  const addMuxingPromise = bitmovin.encoding.encodings(encoding.id).muxings.webm.add(webmMuxing);

  return new Promise((resolve, reject) => {
    addMuxingPromise
      .then(addedWebmMuxing => {
        console.log('added webm muxing ' + webmMuxing.name);
        resolve(addedWebmMuxing);
      })
      .catch(error => {
        console.error('error adding fmp4 muxing ' + webmMuxing.name, error);
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

const createVp9CodecConfiguration = codecConfig => {
  const codecConfigPromise = bitmovin.encoding.codecConfigurations.vp9.create(codecConfig);

  return new Promise((resolve, reject) => {
    codecConfigPromise
      .then(createdConfig => {
        console.log('VP9 Codec configuration ' + codecConfig.name + ' successfully created');
        resolve(createdConfig);
      })
      .catch(error => {
        console.error('error creating VP9 codec config ' + codecConfig.name);
        reject(error);
      });
  });
};

const createVorbisCodecConfiguration = codecConfig => {
  const codecConfigPromise = bitmovin.encoding.codecConfigurations.vorbis.create(codecConfig);

  return new Promise((resolve, reject) => {
    codecConfigPromise
      .then(createdConfig => {
        console.log('Vorbis Codec configuration ' + codecConfig.name + ' successfully created');
        resolve(createdConfig);
      })
      .catch(error => {
        console.error('error creating Vorbis codec config ' + codecConfig.name);
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
