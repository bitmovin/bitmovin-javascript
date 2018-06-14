const Bitmovin = require('bitmovin-javascript').default;
const Promise = require('bluebird');

const BITMOVIN_API_KEY = '<YOUR_API_KEY>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});

const ENCODING_NAME = 'simple_dash_vtt_encoding';

const INPUT_FILE_HOST = '<INPUT_HOST>';
const INPUT_FILE_PATH = '/path/to/input/file.mp4';

const S3_ACCESS_KEY = '<S3_ACCESS_KEY>';
const S3_SECRET_KEY = '<S3_SECRET_KEY>';
const S3_BUCKET_NAME = '<S3_BUCKET_NAME>';

const OUTPUT_PATH = '/path/to/output/dir/' + ENCODING_NAME + '/';

const vttSubtitles = [
  {
    vttUrl: '<VTT_URL>',
    lang: '<LANG>'
  }
];

const httpInput = {
  name: 'HTTP input',
  host: INPUT_FILE_HOST
};

const s3Output = {
  name: 'S3 output',
  accessKey: S3_ACCESS_KEY,
  secretKey: S3_SECRET_KEY,
  bucketName: S3_BUCKET_NAME
};

const aacConfigurations = [
  {
    codec: {
      name: 'English',
      bitrate: 128000,
      rate: 48000
    },
    streams: [
      {
        selectionMode: 'AUTO'
      }
    ]
  }
];

const h264Configurations = [
  {
    codec: {
      name: 'simple encoding - H264 1080p',
      bitrate: 4800000,
      rate: 24.0,
      height: 1080,
      profile: 'HIGH'
    },
    streams: [
      {
        selectionMode: 'AUTO'
      }
    ]
  },
  {
    codec: {
      name: 'simple encoding - H264 720p',
      bitrate: 2400000,
      rate: 24.0,
      height: 720,
      profile: 'HIGH'
    },
    streams: [
      {
        selectionMode: 'AUTO'
      }
    ]
  },
  {
    codec: {
      name: 'simple encoding - H264 480p',
      bitrate: 1200000,
      rate: 24.0,
      height: 480,
      profile: 'HIGH'
    },
    streams: [
      {
        selectionMode: 'AUTO'
      }
    ]
  },
  {
    codec: {
      name: 'simple encoding - H264 360p',
      bitrate: 800000,
      rate: 24.0,
      height: 360,
      profile: 'HIGH'
    },
    streams: [
      {
        selectionMode: 'AUTO'
      }
    ]
  },
  {
    codec: {
      name: 'simple encoding - H264 240p',
      bitrate: 400000,
      rate: 24.0,
      height: 240,
      profile: 'HIGH'
    },
    streams: [
      {
        selectionMode: 'AUTO'
      }
    ]
  }
];

const encodingResource = {
  name: ENCODING_NAME
};

const main = () => {
  const createHttpInputPromise = createHttpInput(httpInput).then(createdInput => {
    console.log('Successfully created HTTP Input');
    return createdInput;
  });

  const createS3OutputPromise = createS3Output(s3Output).then(createdS3Output => {
    console.log('Successfully created S3 Output');
    return createdS3Output;
  });

  const aacConfigurationPromises = aacConfigurations.map(aacConfig => {
    console.log('Created aac codec configuration.');
    return Promise.all([Promise.resolve(aacConfig.streams), createAACCodecConfiguration(aacConfig.codec)]);
  });

  const h264ConfigurationPromises = h264Configurations.map(h264Config => {
    console.log('Created h264 codec configurations.');
    return Promise.all([Promise.resolve(h264Config.streams), createH264CodecConfiguration(h264Config.codec)]);
  });

  const createEncodingPromise = createEncoding(encodingResource).then(createdEncoding => {
    console.log('Successfully created Encoding Resource with name ' + encodingResource.name);
    return createdEncoding;
  });

  const preparationPromises = [
    createHttpInputPromise,
    createS3OutputPromise,
    createEncodingPromise,
    Promise.all(aacConfigurationPromises),
    Promise.all(h264ConfigurationPromises)
  ];

  return Promise.all(preparationPromises).then(results => {
    console.log('Created input, output, codec configurations and encoding resource.');

    const [input, output, encoding, aacConfigurations, h264Configurations] = results;

    const audioPromises = Promise.map(
      aacConfigurations,
      (config, configIndex) => {
        const streams = config[0];

        return Promise.map(
          streams,
          (stream, streamIndex) => {
            return addStreamToEncoding(
              input,
              output,
              stream.selectionMode,
              configIndex + '_' + streamIndex,
              config[1],
              encoding
            );
          },
          {concurrency: 1}
        );
      },
      {concurrency: 1}
    );

    const videoPromises = Promise.map(
      h264Configurations,
      (config, configIndex) => {
        const streams = config[0];

        return Promise.map(
          streams,
          (stream, streamIndex) => {
            return addStreamToEncoding(
              input,
              output,
              stream.selectionMode,
              configIndex + '_' + streamIndex,
              config[1],
              encoding
            );
          },
          {concurrency: 1}
        );
      },
      {concurrency: 1}
    );

    return Promise.all([audioPromises, videoPromises])
      .then(results => {
        const [audioConfigCombis, videoConfigCombis] = results;

        const audioMuxingsWithId = [];
        const videoMuxingsWithId = [];

        audioConfigCombis.forEach(audioConfigCombi => {
          audioConfigCombi.forEach(audioCombi => {
            const [stream, muxing] = audioCombi;
            muxing.streamId = stream.id;
            audioMuxingsWithId.push(muxing);
          });
        });

        videoConfigCombis.forEach(videoConfigCombi => {
          videoConfigCombi.forEach(videoCombi => {
            const [stream, muxing] = videoCombi;
            muxing.streamId = stream.id;
            videoMuxingsWithId.push(muxing);
          });
        });

        const dashManifestPromise = createDashManifest(output, encoding, audioMuxingsWithId, videoMuxingsWithId);

        return dashManifestPromise
          .then(createdDashManifest => {
            return startEncodingAndWaitForItToBeFinished(encoding).then(() => {
              console.log('Successfully finished encoding');

              const dashManifestCreation = startDashManifestCreation(createdDashManifest);

              return dashManifestCreation.then(() => {
                console.log('Successfully created dash Manifests');
              });
            });
          })
          .catch(error => {
            console.log('Error occurred, reason:', error);
          });
      })
      .catch(error => {
        console.log('Error creating encoding, reason:', error);
      });
  });
};

const addStreamToEncoding = (input, output, selectionMode, index, codecConfiguration, encoding) => {
  const inputStream = {
    inputId: input.id,
    inputPath: INPUT_FILE_PATH,
    selectionMode: 'AUTO'
  };

  let stream = {
    inputStreams: [inputStream],
    codecConfigId: codecConfiguration.id,
    selectionMode
  };

  return new Promise((resolve, reject) => {
    addStream(encoding, stream, output, codecConfiguration, index)
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

  return startPromise.then(() => {
    return waitUntilDashManifestFinished(manifest)
      .then(success => {
        console.log('manifest finished', success);
        return true;
      })
      .catch(error => {
        console.log('manifest errored', error);
        throw error;
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
      bitmovin.encoding.manifests
        .dash(manifest.id)
        .status()
        .then(response => {
          console.log('Dash Manifest status is ' + response.status);

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
  return createDashManifestResource(output)
    .then(createdManifest => {
      const period = {};

      return bitmovin.encoding.manifests
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

          if (audioMuxingsWithPath.length > 0) {
            audioAdaptationSetPromise = bitmovin.encoding.manifests
              .dash(createdManifest.id)
              .periods(createdPeriod.id)
              .adaptationSets.audio.create(audioAdaptationSet);
          } else {
            audioAdaptationSetPromise = Promise.resolve([]);
          }

          if (videoMuxingsWithPath.length > 0) {
            videoAdaptationSetPromise = bitmovin.encoding.manifests
              .dash(createdManifest.id)
              .periods(createdPeriod.id)
              .adaptationSets.video.create(videoAdaptationSet);
          } else {
            videoAdaptationSetPromise = Promise.resolve([]);
          }

          const subtitleASPromises = vttSubtitles.map(vttSubtitle => {
            return Promise.all([
              Promise.resolve(vttSubtitle),
              bitmovin.encoding.manifests
                .dash(createdManifest.id)
                .periods(createdPeriod.id)
                .adaptationSets.subtitle.create({
                  lang: vttSubtitle.lang
                })
            ]);
          });

          return Promise.all([
            audioAdaptationSetPromise,
            videoAdaptationSetPromise,
            Promise.all(subtitleASPromises)
          ]).then(([createdAudioAdaptationSet, createdVideoAdaptationSet, createdSubtitleAdaptationSets]) => {
            return Promise.map(audioMuxingsWithPath, muxingWithPath => {
              const fmp4Muxing = muxingWithPath.fmp4Muxing;
              const path = muxingWithPath.path;

              const fmp4Representation = {
                type: 'TEMPLATE',
                encodingId: encoding.id,
                muxingId: fmp4Muxing.id,
                segmentPath: path
              };

              return bitmovin.encoding.manifests
                .dash(createdManifest.id)
                .periods(createdPeriod.id)
                .adaptationSets(createdAudioAdaptationSet.id)
                .representations.fmp4.add(fmp4Representation);
            }).then(() => {
              console.log('Successfully added Audio representations');

              return Promise.map(videoMuxingsWithPath, muxingWithPath => {
                const fmp4Muxing = muxingWithPath.fmp4Muxing;
                const path = muxingWithPath.path;

                const fmp4Representation = {
                  type: 'TEMPLATE',
                  encodingId: encoding.id,
                  muxingId: fmp4Muxing.id,
                  segmentPath: path
                };

                return bitmovin.encoding.manifests
                  .dash(createdManifest.id)
                  .periods(createdPeriod.id)
                  .adaptationSets(createdVideoAdaptationSet.id)
                  .representations.fmp4.add(fmp4Representation);
              }).then(() => {
                console.log('Successfully added video representations');

                return Promise.map(createdSubtitleAdaptationSets, createdSubtitleAdaptationSetCombi => {
                  const [vttSubtitle, createdSubtitleAdaptationSet] = createdSubtitleAdaptationSetCombi;
                  return bitmovin.encoding.manifests
                    .dash(createdManifest.id)
                    .periods(createdPeriod.id)
                    .adaptationSets(createdSubtitleAdaptationSet.id)
                    .representations.vtt.add({
                      vttUrl: vttSubtitle.vttUrl
                    });
                }).then(() => {
                  console.log('Successfully added vtt representations');
                  console.log('Successfully created manifest');

                  return createdManifest;
                });
              });
            });
          });
        });
    })
    .catch(error => {
      console.log('Unable to create manifest', error);
      return error;
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
    manifestName: 'stream.mpd'
  };

  return new Promise((resolve, reject) => {
    bitmovin.encoding.manifests.dash
      .create(manifest)
      .then(createdManifest => {
        console.log('successfully created manifest resource');
        resolve(createdManifest);
      })
      .catch(error => {
        console.error('error creating manifest resource', error);
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

        addFmp4MuxingForStream(encoding, addedStream, prefix, output).then(addedMp4Muxing => {
          const muxingWithPath = {
            fmp4Muxing: addedMp4Muxing,
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

const addFmp4MuxingForStream = (encoding, stream, path, output) => {
  let fmp4Muxing = {
    streams: [
      {
        streamId: stream.id
      }
    ],
    outputs: [
      {
        outputId: output.id,
        outputPath: OUTPUT_PATH + path,
        acl: [
          {
            permission: 'PUBLIC_READ'
          }
        ]
      }
    ],
    segmentLength: 4,
    segmentNaming: 'seg_%number%.m4s',
    initSegmentName: 'init.mp4'
  };

  const addMuxingPromise = bitmovin.encoding.encodings(encoding.id).muxings.fmp4.add(fmp4Muxing);

  return new Promise((resolve, reject) => {
    addMuxingPromise
      .then(addedFMP4Muxing => {
        console.log('added muxing ' + fmp4Muxing.name);
        resolve(addedFMP4Muxing);
      })
      .catch(error => {
        console.error('error adding muxing ' + fmp4Muxing.name, error);
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

const createAACCodecConfiguration = codecConfig => {
  const codecConfigPromise = bitmovin.encoding.codecConfigurations.aac.create(codecConfig);

  return new Promise((resolve, reject) => {
    codecConfigPromise
      .then(createdConfig => {
        console.log('aac Codec configuration ' + codecConfig.name + ' successfully created');
        resolve(createdConfig);
      })
      .catch(error => {
        console.error('error creating aac codec config ' + codecConfig.name);
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
