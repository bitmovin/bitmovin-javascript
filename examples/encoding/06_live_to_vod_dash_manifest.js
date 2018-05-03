// 06_live_to_vod_dash_manifest

const Bitmovin = require('bitmovin-javascript').default;
const Promise = require('bluebird');

const BITMOVIN_API_KEY = 'YOUR_API_KEY';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY});

const GCS_ACCESS_KEY = 'YOUR_GCS_ACCESS_KEY';
const GCS_SECRET_KEY = 'YOUR_GCS_SECRET_KEY';
const GCS_BUCKET_NAME = 'YOUR_GCS_BUCKET_NAME';

const ENCODING_ID = 'ENCODING ID';
const OUTPUT_PATH = '/output/path/from/the/encoding';

const START_SEGMENT_NUMBER = 2;
const END_SEGMENT_NUMBER = 10;

const gcsOutput = {
  name: 'GCS Output',
  accessKey: GCS_ACCESS_KEY,
  secretKey: GCS_SECRET_KEY,
  bucketName: GCS_BUCKET_NAME
};

const MUXING_TYPE = {
  FMP4: 'FMP4'
};

const CODEC_CONFIGURATION_TYPE = {
  AAC: 'AAC',
  H264: 'H264',
  H265: 'H265',
  VP9: 'VP9'
};

const MANIFEST_CREATION_STATUS = {
  FINISHED: 'FINISHED',
  ERROR: 'ERROR'
};

const MANIFEST_CREATION_STATUS_POLLING_INTERVAL = 10000;

const main = () =>
  new Promise((resolve, reject) => {
    const encodingId = ENCODING_ID;
    const output = Object.assign({}, gcsOutput);
    createGcsOutput(output)
      .then(createdOutput => {
        getMuxingsFromEncoding(encodingId)
          .then(response => {
            const audioManifestInfoPromise = getAudioManifestInfos(encodingId, response.items);
            const videoManifestInfoPromise = getVideoManifestInfos(encodingId, response.items);

            Promise.all([audioManifestInfoPromise, videoManifestInfoPromise])
              .then(([audioManifestInfos, videoManifestInfos]) => {
                createDashManifestWithPeriodAndAdaptationSets(createdOutput.id)
                  .then(dashManifest => {
                    [
                      createdDashManifest,
                      createdDashManifestPeriod,
                      createdDashManifestAudioAdaptationSet,
                      createdDashManifestVideoAdaptationSet
                    ] = dashManifest;

                    Promise.map(
                      audioManifestInfos,
                      audioManifestInfo => {
                        if (audioManifestInfo.muxing.type === MUXING_TYPE.FMP4) {
                          return createDashManifestFMP4Representation(
                            createdDashManifest,
                            createdDashManifestPeriod,
                            createdDashManifestAudioAdaptationSet,
                            audioManifestInfo.encodingId,
                            audioManifestInfo.muxing,
                            createSegmentsPath(audioManifestInfo.muxing.outputs[0].outputPath),
                            START_SEGMENT_NUMBER,
                            END_SEGMENT_NUMBER
                          );
                        }
                      },
                      {concurrency: 1}
                    )
                      .then(createdFmp4AudioRepresentations => {
                        console.log(
                          'Successfully created fmp4 audio representations!',
                          createdFmp4AudioRepresentations
                        );

                        Promise.map(
                          videoManifestInfos,
                          videoManifestInfo => {
                            if (videoManifestInfo.muxing.type === MUXING_TYPE.FMP4) {
                              return createDashManifestFMP4Representation(
                                createdDashManifest,
                                createdDashManifestPeriod,
                                createdDashManifestVideoAdaptationSet,
                                videoManifestInfo.encodingId,
                                videoManifestInfo.muxing,
                                createSegmentsPath(videoManifestInfo.muxing.outputs[0].outputPath),
                                START_SEGMENT_NUMBER,
                                END_SEGMENT_NUMBER
                              );
                            }
                          },
                          {concurrency: 1}
                        )
                          .then(createdFmp4VideoRepresentations => {
                            console.log(
                              'Successfully created fmp4 video representations!',
                              createdFmp4VideoRepresentations
                            );
                            startDashManifestCreation(createdDashManifest)
                              .then(() => {
                                console.log('Successfully created dash vod manifest!');
                                resolve(true);
                              })
                              .catch(logErrorPromise(reject, 'Error starting dash manifest generation!'));
                          })
                          .catch(logErrorPromise(reject, 'Error creating dash video representations!'));
                      })
                      .catch(logErrorPromise(reject, 'Error creating dash audio representations!'));
                  })
                  .catch(logErrorPromise(reject, 'Error creating dash manifest!'));
              })
              .catch(logErrorPromise(reject, 'Could not get manifest info!'));
          })
          .catch(logErrorPromise(reject, 'Could not get muxings!'));
      })
      .catch(logErrorPromise(reject, 'Could not create output!'));
  });

const createGcsOutput = output => {
  return bitmovin.encoding.outputs.gcs.create(output);
};

const getMuxingsFromEncoding = encodingId => {
  return bitmovin.encoding.encodings(encodingId).muxings.list(50, 0);
};

const getAudioManifestInfos = (encodingId, muxings) => {
  const audioManifestInfos = [];
  return new Promise((resolve, reject) => {
    Promise.map(muxings, muxing => {
      return bitmovin.encoding
        .encodings(encodingId)
        .streams(muxing.streams[0].streamId)
        .details();
    }).then(firstStreamsOfMuxings => {
      Promise.map(firstStreamsOfMuxings, (firstStream, index) => {
        return bitmovin.encoding.codecConfigurations
          .getType(firstStream.codecConfigId)
          .then(response => {
            if (response.type === CODEC_CONFIGURATION_TYPE.AAC) {
              audioManifestInfos.push({
                muxing: muxings[index],
                stream: firstStream,
                encodingId
              });
            }
          })
          .catch(() => {});
      })
        .then(() => {
          resolve(audioManifestInfos);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
};

const getVideoManifestInfos = (encodingId, muxings) => {
  const videoManifestInfos = [];
  return new Promise((resolve, reject) => {
    Promise.map(muxings, muxing => {
      return bitmovin.encoding
        .encodings(encodingId)
        .streams(muxing.streams[0].streamId)
        .details();
    }).then(firstStreamsOfMuxings => {
      Promise.map(firstStreamsOfMuxings, (firstStream, index) => {
        return bitmovin.encoding.codecConfigurations
          .getType(firstStream.codecConfigId)
          .then(response => {
            if (
              response.type === CODEC_CONFIGURATION_TYPE.H264 ||
              response.type === CODEC_CONFIGURATION_TYPE.H265 ||
              response.type === CODEC_CONFIGURATION_TYPE.VP9
            ) {
              videoManifestInfos.push({
                muxing: muxings[index],
                stream: firstStream,
                encodingId
              });
            }
          })
          .catch(() => {});
      })
        .then(() => {
          resolve(videoManifestInfos);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
};

/*
 MANIFESTS
 */
const createDashManifestWithPeriodAndAdaptationSets = outputId => {
  return new Promise((resolve, reject) => {
    const dashManifest = {
      name: 'VoD DASH manifest',
      outputs: [
        {
          outputId,
          outputPath: OUTPUT_PATH,
          acl: [
            {
              permission: 'PUBLIC_READ'
            }
          ]
        }
      ],
      manifestName: 'vodDashManifest.mpd'
    };
    bitmovin.encoding.manifests.dash
      .create(dashManifest)
      .then(createdManifest => {
        console.log('Successfully created DASH Manifest Resource.', createdManifest);
        createDashManifestPeriodWithAdaptationSets(createdManifest).then(
          ([createdPeriod, createdAudioAdaptationSet, createdVideoAdaptationSet]) => {
            resolve([createdManifest, createdPeriod, createdAudioAdaptationSet, createdVideoAdaptationSet]);
          }
        );
      })
      .catch(logErrorPromise(reject, 'Unable to create DASH Manifest'));
  });
};

const createDashManifestPeriodWithAdaptationSets = dashManifest => {
  return new Promise((resolve, reject) => {
    const period = {};
    bitmovin.encoding.manifests
      .dash(dashManifest.id)
      .periods.add(period)
      .then(createdPeriod => {
        console.log('Successfully created DASH ManifestPeriod for ' + dashManifest.name, createdPeriod);
        const videoAdaptationSetCreationPromise = createDashManifestVideoAdaptationSet(dashManifest, createdPeriod);
        const audioAdaptationSetCreationPromise = createDashManifestAudioAdaptationSet(dashManifest, createdPeriod);
        Promise.all([videoAdaptationSetCreationPromise, audioAdaptationSetCreationPromise]).then(
          ([createdVideoAdaptationSet, createdAudioAdaptationSet]) => {
            resolve([createdPeriod, createdAudioAdaptationSet, createdVideoAdaptationSet]);
          }
        );
      })
      .catch(logErrorPromise(reject, 'Unable to create DASH Manifest Period for ' + dashManifest.name));
  });
};

const createDashManifestAudioAdaptationSet = (dashManifest, period) => {
  return new Promise((resolve, reject) => {
    const audioAdaptationSet = {
      roles: ['MAIN'],
      lang: 'en'
    };
    bitmovin.encoding.manifests
      .dash(dashManifest.id)
      .periods(period.id)
      .adaptationSets.audio.create(audioAdaptationSet)
      .then(createdAudioAdaptationSet => {
        console.log('Successfully created Audio Adaptation Set for ' + period.name, createdAudioAdaptationSet);
        resolve(createdAudioAdaptationSet);
      })
      .catch(logErrorPromise(reject, 'Unable to create Audio Adaptation Set for ' + period.name));
  });
};

const createDashManifestVideoAdaptationSet = (dashManifest, period) => {
  return new Promise((resolve, reject) => {
    const videoAdaptationSet = {
      roles: ['MAIN']
    };
    bitmovin.encoding.manifests
      .dash(dashManifest.id)
      .periods(period.id)
      .adaptationSets.video.create(videoAdaptationSet)
      .then(createdVideoAdaptationSet => {
        console.log('Successfully created Video Adaptation Set for ' + period.name, createdVideoAdaptationSet);
        resolve(createdVideoAdaptationSet);
      })
      .catch(logErrorPromise(reject, 'Unable to create Video Adaptation Set for ' + period.name));
  });
};

const createDashManifestFMP4Representation = (
  manifest,
  period,
  adaptationSet,
  encodingId,
  fmp4Muxing,
  segmentPath,
  startSegmentNumber,
  endSegmentNumber
) => {
  const fmp4Representation = {
    type: 'TEMPLATE',
    encodingId,
    muxingId: fmp4Muxing.id,
    segmentPath,
    startSegmentNumber,
    endSegmentNumber
  };

  return bitmovin.encoding.manifests
    .dash(manifest.id)
    .periods(period.id)
    .adaptationSets(adaptationSet.id)
    .representations.fmp4.add(fmp4Representation);
};

const startDashManifestCreation = manifest => {
  const startPromise = bitmovin.encoding.manifests.dash(manifest.id).start();

  return new Promise((resolve, reject) => {
    startPromise.then(startResponse => {
      waitUntilDashManifestFinished(manifest)
        .then(success => {
          console.log('Manifest creation finished: ', success);
          resolve(true);
        })
        .catch(error => {
          console.log('Manifest creation errored: ', error);
          reject(error);
        });
    });
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

          if (response.status === MANIFEST_CREATION_STATUS.FINISHED) {
            return resolve(response.status);
          }

          if (response.status === MANIFEST_CREATION_STATUS.ERROR) {
            return reject(response.status);
          }

          setTimeout(waitForManifestToBeFinished, MANIFEST_CREATION_STATUS_POLLING_INTERVAL);
        });
    };
    waitForManifestToBeFinished();
  });
};

const createSegmentsPath = outputPath => {
  const newOutputPath = outputPath.replace(OUTPUT_PATH, '');
  return newOutputPath.replace(/^\/+|\/+$/g, '');
};

const logErrorPromise = (reject, errorMessage) => {
  return error => {
    console.error(errorMessage, error);
    reject(error);
  };
};

const exit = (code, message) => {
  console.error('ERROR: ', message, 'Exiting with code ', code);
  process.exit(code);
};

main()
  .then(result => {
    console.log('FINISHED!');
  })
  .catch(error => {
    exit(100, error);
  });
