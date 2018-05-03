// 05_live_to_vod_hls_manifest

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
  TS: 'TS'
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
                createHlsManifest(createdOutput.id)
                  .then(hlsManifest => {
                    Promise.map(
                      audioManifestInfos,
                      audioManifestInfo => {
                        if (audioManifestInfo.muxing.type === MUXING_TYPE.TS) {
                          return createHlsAudioMedia(
                            hlsManifest,
                            'audio_group',
                            'Audio',
                            audioManifestInfo.encodingId,
                            audioManifestInfo.stream.id,
                            audioManifestInfo.muxing,
                            'audio_' + audioManifestInfo.stream.id + '.m3u8',
                            createSegmentsPath(audioManifestInfo.muxing.outputs[0].outputPath),
                            START_SEGMENT_NUMBER,
                            END_SEGMENT_NUMBER
                          );
                        }
                      },
                      {concurrency: 1}
                    )
                      .then(createdHlsAudioMedia => {
                        console.log('Successfully created audio media!', createdHlsAudioMedia);
                        Promise.map(videoManifestInfos, videoManifestInfo => {
                          if (videoManifestInfo.muxing.type === MUXING_TYPE.TS) {
                            return createHlsVideoVariantStream(
                              hlsManifest,
                              'audio_group',
                              createSegmentsPath(videoManifestInfo.muxing.outputs[0].outputPath),
                              'video_' + videoManifestInfo.stream.id + '.m3u8',
                              videoManifestInfo.encodingId,
                              videoManifestInfo.stream.id,
                              videoManifestInfo.muxing,
                              START_SEGMENT_NUMBER,
                              END_SEGMENT_NUMBER
                            );
                          }
                        })
                          .then(() => {
                            startHlsManifestCreation(hlsManifest)
                              .then(() => {
                                console.log('Successfully created hls vod manifest!');
                                resolve(true);
                              })
                              .catch(logErrorPromise(reject, 'Error starting hls manifest generation!'));
                          })
                          .catch(logErrorPromise(reject, 'Error creating hls video variant streams!'));
                      })
                      .catch(logErrorPromise(reject, 'Error creating hls audio media!'));
                  })
                  .catch(logErrorPromise(reject, 'Error creating dash and hls manifests!'));
              })
              .catch(logErrorPromise(reject, 'Could not get manifest info!'));
          })
          .catch(logErrorPromise(reject, 'Could not get muxings!'));
      })
      .catch(logErrorPromise(reject, 'Could not create output!'));
  });

const getMuxingsFromEncoding = encodingId => {
  return bitmovin.encoding.encodings(encodingId).muxings.list(50, 0);
};

const createGcsOutput = output => {
  return bitmovin.encoding.outputs.gcs.create(output);
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
                encodingId: encodingId
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
const createHlsManifest = outputId => {
  return new Promise((resolve, reject) => {
    const hlsManifest = {
      name: 'VoD HLS manifest',
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
      manifestName: 'vodHlsManifest.m3u8'
    };
    bitmovin.encoding.manifests.hls
      .create(hlsManifest)
      .then(createdManifest => {
        console.log('Successfully created HLS Manifest Resource.', createdManifest);
        resolve(createdManifest);
      })
      .catch(logErrorPromise(reject, 'Unable to create HLS manifest.'));
  });
};

const createHlsAudioMedia = (
  manifest,
  groupId,
  name,
  encodingId,
  streamId,
  muxing,
  uri,
  segmentPath,
  startSegmentNumber,
  endSegmentNumber
) => {
  const audioMedia = {
    groupId,
    name,
    encodingId,
    streamId,
    muxingId: muxing.id,
    uri,
    segmentPath,
    language: 'en',
    assocLanguage: 'en',
    startSegmentNumber,
    endSegmentNumber,
    autoselect: false,
    isDefault: false,
    forced: false
  };

  console.log('Audio media to be added', audioMedia);

  return bitmovin.encoding.manifests.hls(manifest.id).media.audio.add(audioMedia);
};

const createHlsVideoVariantStream = (
  manifest,
  audioGroupId,
  segmentPath,
  uri,
  encodingId,
  streamId,
  muxing,
  startSegmentNumber,
  endSegmentNumber
) => {
  const variantStream = {
    audio: audioGroupId,
    encodingId,
    streamId,
    muxingId: muxing.id,
    startSegmentNumber,
    endSegmentNumber,
    uri,
    segmentPath
  };

  return bitmovin.encoding.manifests.hls(manifest.id).streams.add(variantStream);
};

const startHlsManifestCreation = manifest => {
  const startPromise = bitmovin.encoding.manifests.hls(manifest.id).start();

  return new Promise((resolve, reject) => {
    startPromise.then(startResponse => {
      waitUntilHlsManifestFinished(manifest)
        .then(success => {
          console.log('Hls manifest creation finished: ', success);
          resolve(true);
        })
        .catch(error => {
          console.log('Hls manifest creation errored: ', error);
          reject(error);
        });
    });
  });
};

const waitUntilHlsManifestFinished = manifest => {
  return new Promise((resolve, reject) => {
    const waitForManifestToBeFinished = () => {
      console.log('GET STATUS FOR HLS MANIFEST WITH ID ', manifest.id);
      bitmovin.encoding.manifests
        .hls(manifest.id)
        .status()
        .then(response => {
          console.log('HLS Manifest status is ' + response.status);

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
