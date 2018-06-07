// 03_start_livestream_dash_hls.js

const Promise = require('bluebird');
const Bitmovin = require('bitmovin-javascript').default;

const BITMOVIN_API_KEY = 'INSERT_YOUR_API_KEY';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY});

const MAX_LIVESTREAM_DETAILS_FETCH_RETRIES = 20;

const encodingAndOutputPathPostfix = new Date().toISOString();

const ENCODING_NAME = 'LIVE_ENCODING_JAVASCRIPT_CLIENT_' + encodingAndOutputPathPostfix;
const ENCODER_VERSION = 'STABLE';
const STREAM_KEY = 'livestream';
const TIMESHIFT = 120;
const LIVE_EDGE_OFFSET = 60;

const OUTPUT_GCS_ACCESS_KEY = 'YOUR_GCS_ACCESS_KEY';
const OUTPUT_GCS_SECRET_KEY = 'YOUR_GCS_SECRET_KEY';
const OUTPUT_GCS_BUCKET_NAME = 'YOUR_GCS_BUCKET_NAME';
const OUTPUT_PATH = '/output/livestreams/' + encodingAndOutputPathPostfix;

const STREAMTYPE = {
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO'
};

const ENCODING_CREATION_STATUS = {
  RUNNING: 'RUNNING',
  ERROR: 'ERROR'
};

const ENCODING_CREATION_STATUS_POLLING_INTERVAL = 10000;
const LIVE_ENCODING_DETAILS_POLLING_INTERVAL = 10000;

const main = () => {
  return new Promise((resolve, reject) => {
    const rtmpInputPromise = getRtmpInput();
    const s3OutputCreationPromise = createOutput();
    const encodingResourceCreationPromise = createEncoding();
    const codecConfigurationH264At1080pPromise = createH264CodecConfiguration(1920, 1080, 4800000, 25.0);
    const codecConfigurationH264At720pPromise = createH264CodecConfiguration(1280, 720, 2400000, 25.0);
    const codecConfigurationH264At480pPromise = createH264CodecConfiguration(858, 480, 1200000, 25.0);
    const codecConfigurationH264At360pPromise = createH264CodecConfiguration(640, 360, 800000, 25.0);
    const codecConfigurationAACPromise = createAACCodecConfiguration(128000, 48000);

    Promise.all([
      rtmpInputPromise,
      s3OutputCreationPromise,
      encodingResourceCreationPromise,
      codecConfigurationH264At1080pPromise,
      codecConfigurationH264At720pPromise,
      codecConfigurationH264At480pPromise,
      codecConfigurationH264At360pPromise,
      codecConfigurationAACPromise
    ]).then(
      ([
        input,
        output,
        encoding,
        codecConfigurationH264At1080p,
        codecConfigurationH264At720p,
        codecConfigurationH264At480p,
        codecConfigurationH264At360p,
        codecConfigurationAAC
      ]) => {
        console.log('Successfully created input, output and codec configurations.');
        const dashManifestCreationPromise = createDashManifestWithPeriodAndAdaptationSets(output.id);
        const hlsManifestCreationPromise = createHlsManifest(output.id);

        Promise.all([dashManifestCreationPromise, hlsManifestCreationPromise]).then(([dashManifest, hlsManifest]) => {
          const [
            createdDashManifest,
            createdDashManifestPeriod,
            createdDashManifestAudioAdaptationSet,
            createdDashManifestVideoAdaptationSet
          ] = dashManifest;

          const streamDefinition = [
            {
              codecConfiguration: codecConfigurationAAC,
              adaptationSet: createdDashManifestAudioAdaptationSet,
              type: STREAMTYPE.AUDIO,
              dashSegmentsPath: 'dash/audio_128kb/',
              hlsSegmentsPath: 'hls/audio_128kb/',
              m3u8Uri: 'audio_128kb.m3u8',
              position: 1
            },
            {
              codecConfiguration: codecConfigurationH264At1080p,
              adaptationSet: createdDashManifestVideoAdaptationSet,
              type: STREAMTYPE.VIDEO,
              dashSegmentsPath: 'dash/video_1080p/',
              hlsSegmentsPath: 'hls/video_1080p/',
              m3u8Uri: 'video_1080p.m3u8',
              position: 0
            },
            {
              codecConfiguration: codecConfigurationH264At720p,
              adaptationSet: createdDashManifestVideoAdaptationSet,
              type: STREAMTYPE.VIDEO,
              dashSegmentsPath: 'dash/video_720p/',
              hlsSegmentsPath: 'hls/video_720p/',
              m3u8Uri: 'video_720p.m3u8',
              position: 0
            },
            {
              codecConfiguration: codecConfigurationH264At480p,
              adaptationSet: createdDashManifestVideoAdaptationSet,
              type: STREAMTYPE.VIDEO,
              dashSegmentsPath: 'dash/video_480p/',
              hlsSegmentsPath: 'hls/video_480p/',
              m3u8Uri: 'video_480p.m3u8',
              position: 0
            },
            {
              codecConfiguration: codecConfigurationH264At360p,
              adaptationSet: createdDashManifestVideoAdaptationSet,
              type: STREAMTYPE.VIDEO,
              dashSegmentsPath: 'dash/video_360p/',
              hlsSegmentsPath: 'hls/video_360p/',
              m3u8Uri: 'video_360p.m3u8',
              position: 0
            }
          ];

          createStreamsAndMuxings(encoding, streamDefinition, output, input)
            .then(response => {
              console.log('Successfully created streams and muxings', response);
              console.log('Generating HLS and DASH manifests...');

              const {fmp4Muxings, tsMuxings, streams} = response;

              const dashManifestPromiseMap = Promise.map(
                fmp4Muxings,
                (fmp4Muxing, index) => {
                  return createDashManifestFMP4Representation(
                    createdDashManifest,
                    createdDashManifestPeriod,
                    streamDefinition[index].adaptationSet,
                    encoding,
                    fmp4Muxing,
                    streamDefinition[index].dashSegmentsPath
                  );
                },
                {concurrency: 1}
              );

              dashManifestPromiseMap
                .then(createdRepresentations => {
                  console.log(
                    'Successfully created representations for DASH manifest ' + dashManifest.name,
                    createdRepresentations
                  );

                  const hlsManifestPromiseMap = Promise.map(
                    tsMuxings,
                    (tsMuxing, index) => {
                      if (index === 0) {
                        return createHlsAudioMedia(
                          hlsManifest,
                          'audio_group',
                          'audio',
                          encoding,
                          streams[index],
                          tsMuxing,
                          streamDefinition[index].m3u8Uri,
                          streamDefinition[index].hlsSegmentsPath
                        );
                      }
                      return createHlsVideoVariantStream(
                        hlsManifest,
                        'audio_group',
                        streamDefinition[index].hlsSegmentsPath,
                        streamDefinition[index].m3u8Uri,
                        encoding,
                        streams[index],
                        tsMuxing
                      );
                    },
                    {concurrency: 1}
                  );

                  hlsManifestPromiseMap
                    .then(manifestInformation => {
                      console.log(
                        'Successfully create hls manifest information for live encoding!',
                        manifestInformation
                      );
                      const liveConfiguration = {
                        streamKey: STREAM_KEY,
                        hlsManifests: [
                          {
                            manifestId: hlsManifest.id,
                            timeshift: TIMESHIFT
                          }
                        ],
                        dashManifests: [
                          {
                            manifestId: createdDashManifest.id,
                            timeshift: TIMESHIFT,
                            liveEdgeOffset: LIVE_EDGE_OFFSET
                          }
                        ]
                      };
                      console.log('Successfully created all resources. Starting Live Encoding...');
                      startLiveEncoding(encoding, liveConfiguration)
                        .then(() => {
                          waitUntilEncodingRunning(encoding)
                            .then(() => {
                              waitForLiveEncodingDetails(encoding)
                                .then(liveEncodingDetails => {
                                  resolve({
                                    liveEncodingDetails,
                                    encodingId: encoding.id
                                  });
                                })
                                .catch(logErrorPromise(reject, 'Error while waiting for live encoding details!'));
                            })
                            .catch(logErrorPromise(reject, 'Error while waiting for live encoding to be RUNNING!'));
                        })
                        .catch(logErrorPromise(reject, 'Error while starting live encoding!'));
                    })
                    .catch(logErrorPromise(reject, 'Error creating HLS manifest representations!'));
                })
                .catch(logErrorPromise(reject, 'Error creating DASH manifest representations!'));
            })
            .catch(logErrorPromise(reject, 'Error while creating streams and muxings for live encoding!'));
        });
      }
    );
  });
};

/*
 ENCODING
 */
const createEncoding = () => {
  return new Promise((resolve, reject) => {
    const encoding = {
      name: ENCODING_NAME,
      encoderVersion: ENCODER_VERSION
    };
    bitmovin.encoding.encodings
      .create(encoding)
      .then(createdEncoding => {
        console.log('Successfully created Encoding resource.', createdEncoding);
        resolve(createdEncoding);
      })
      .catch(logErrorPromise(reject, 'Unable to create Encoding Resource.'));
  });
};

const createStreamsAndMuxings = (encoding, streamDefinitions, output, input) => {
  const promiseMap = Promise.map(
    streamDefinitions,
    streamDefinition => {
      return createStream(encoding, streamDefinition, input);
    },
    {concurrency: 1}
  );

  return new Promise((resolve, reject) => {
    promiseMap
      .then(createdStreams => {
        console.log('Creating FMP4 muxings...');
        const createFmp4PromiseMap = createFmp4MuxingsForStreams(encoding, createdStreams, output, streamDefinitions);
        createFmp4PromiseMap
          .then(createdFmp4Muxings => {
            console.log('Successfully created fmp4 muxings', createdFmp4Muxings);
            console.log('Creating ts muxings...');
            const createTsPromiseMap = createTsMuxingsForStreams(encoding, createdStreams, output, streamDefinitions);
            createTsPromiseMap
              .then(createdTsMuxings => {
                console.log('Successfully created ts muxings', createdTsMuxings);
                resolve({
                  streams: createdStreams,
                  fmp4Muxings: createdFmp4Muxings,
                  tsMuxings: createdTsMuxings
                });
              })
              .catch(error => {
                console.error('Error creating ts muxings!', error);
                reject(error);
              });
          })
          .catch(error => {
            console.error('Error creating fmp4 muxings!', error);
            reject(error);
          });
      })
      .catch(error => {
        console.error('Error creating streams!', error);
        reject(error);
      });
  });
};

/*
 INPUT
 */
const getRtmpInput = () => {
  return new Promise((resolve, reject) => {
    bitmovin.encoding.inputs.rtmp
      .list()
      .then(response => {
        if (response.items.length <= 0) {
          logErrorPromise(reject, 'No RTMP inputs found!');
        }
        resolve(response.items[0]);
      })
      .catch(logErrorPromise(reject, 'Error retrieving RTMP inputs'));
  });
};

/*
 OUTPUT
 */
const createOutput = () => {
  return new Promise((resolve, reject) => {
    const gcsOutput = {
      name: 'GCS Output',
      description: 'GCS Output for live encoding',
      accessKey: OUTPUT_GCS_ACCESS_KEY,
      secretKey: OUTPUT_GCS_SECRET_KEY,
      bucketName: OUTPUT_GCS_BUCKET_NAME
    };
    bitmovin.encoding.outputs.gcs
      .create(gcsOutput)
      .then(createdOutput => {
        console.log('Successfully created GCS Output.', createdOutput);
        resolve(createdOutput);
      })
      .catch(logErrorPromise(reject, 'Unable to create GCS Output.'));
  });
};

/*
 CODEC CONFIGURATION
 */
const createH264CodecConfiguration = (width, height, bitrate, fps) => {
  return new Promise((resolve, reject) => {
    const h264CodecConfiguration = {
      name: 'H264 ' + height,
      bitrate,
      rate: fps,
      profile: 'HIGH',
      width,
      height
    };
    bitmovin.encoding.codecConfigurations.h264
      .create(h264CodecConfiguration)
      .then(createdCodecConfiguration => {
        console.log('Successfully created H264 Codec Configuration.', createdCodecConfiguration);
        resolve(createdCodecConfiguration);
      })
      .catch(logErrorPromise(reject, 'Unable to create H264 Codec Configuration'));
  });
};

const createAACCodecConfiguration = (bitrate, rate) => {
  return new Promise((resolve, reject) => {
    const aacCodecConfiguration = {
      name: 'English',
      bitrate,
      rate
    };
    bitmovin.encoding.codecConfigurations.aac
      .create(aacCodecConfiguration)
      .then(createdCodecConfiguration => {
        console.log('Successfully created AAC Codec Configuration.', createdCodecConfiguration);
        resolve(createdCodecConfiguration);
      })
      .catch(logErrorPromise(reject, 'Unable to create AAC Codec Configuration'));
  });
};

/*
 STREAMS
 */
const createStream = (encoding, streamDefinition, input) => {
  const stream = {
    name: 'Stream with ' + streamDefinition.codecConfiguration.name,
    codecConfigId: streamDefinition.codecConfiguration.id,
    inputStreams: [
      {
        inputId: input.id,
        inputPath: '/',
        selectionMode: 'AUTO',
        position: streamDefinition.position
      }
    ]
  };

  return bitmovin.encoding.encodings(encoding.id).streams.add(stream);
};

/*
 MUXINGS
 */
const createFmp4MuxingsForStreams = (encoding, streams, output, streamDefinitions) => {
  return Promise.map(
    streams,
    (stream, index) => {
      return addFmp4MuxingToStream(encoding, stream, output, streamDefinitions[index].dashSegmentsPath);
    },
    {concurrency: 1}
  );
};

const createTsMuxingsForStreams = (encoding, streams, output, streamDefinitions) => {
  return Promise.map(
    streams,
    (stream, index) => {
      return addTsMuxingForStream(encoding, stream, output, streamDefinitions[index].hlsSegmentsPath);
    },
    {concurrency: 1}
  );
};

const addFmp4MuxingToStream = (encoding, stream, output, outputPrefix) => {
  const fmp4Muxing = {
    name: 'FMP4 Muxing ' + stream.codecConfigId,
    streams: [
      {
        streamId: stream.id
      }
    ],
    outputs: [
      {
        outputId: output.id,
        outputPath: OUTPUT_PATH + '/' + outputPrefix,
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

  return bitmovin.encoding.encodings(encoding.id).muxings.fmp4.add(fmp4Muxing);
};

const addTsMuxingForStream = (encoding, stream, output, outputPrefix) => {
  const tsMuxing = {
    name: 'TS Muxing ' + stream.codecConfigId,
    streams: [
      {
        streamId: stream.id
      }
    ],
    outputs: [
      {
        outputId: output.id,
        outputPath: OUTPUT_PATH + '/' + outputPrefix,
        acl: [
          {
            permission: 'PUBLIC_READ'
          }
        ]
      }
    ],
    segmentLength: 4,
    segmentNaming: 'seg_%number%.ts'
  };

  return bitmovin.encoding.encodings(encoding.id).muxings.ts.add(tsMuxing);
};

/*
 MANIFESTS
 */
const createDashManifestWithPeriodAndAdaptationSets = outputId => {
  return new Promise((resolve, reject) => {
    const dashManifest = {
      name: 'DASH Manifest for ' + ENCODING_NAME,
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
      manifestName: 'dashManifest.mpd'
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

const createHlsManifest = outputId => {
  return new Promise((resolve, reject) => {
    const hlsManifest = {
      name: 'HLS Manifest for ' + ENCODING_NAME,
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
      manifestName: 'hlsManifest.m3u8'
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

const createDashManifestFMP4Representation = (manifest, period, adaptationSet, encoding, fmp4Muxing, segmentPath) => {
  const fmp4Representation = {
    type: 'TEMPLATE',
    encodingId: encoding.id,
    muxingId: fmp4Muxing.id,
    segmentPath
  };

  return bitmovin.encoding.manifests
    .dash(manifest.id)
    .periods(period.id)
    .adaptationSets(adaptationSet.id)
    .representations.fmp4.add(fmp4Representation);
};

const createHlsAudioMedia = (manifest, groupId, name, encoding, stream, muxing, uri, segmentPath) => {
  const audioMedia = {
    groupId,
    name,
    encodingId: encoding.id,
    streamId: stream.id,
    muxingId: muxing.id,
    uri,
    segmentPath,
    language: 'en',
    assocLanguage: 'en',
    autoselect: false,
    isDefault: false,
    forced: false
  };

  return bitmovin.encoding.manifests.hls(manifest.id).media.audio.add(audioMedia);
};

const createHlsVideoVariantStream = (manifest, audioGroupId, segmentPath, uri, encoding, stream, muxing) => {
  const variantStream = {
    audio: audioGroupId,
    encodingId: encoding.id,
    streamId: stream.id,
    muxingId: muxing.id,
    uri,
    segmentPath
  };

  return bitmovin.encoding.manifests.hls(manifest.id).streams.add(variantStream);
};

/*
 ENCODING CONTROL
 */
const startLiveEncoding = (encoding, liveConfiguration) => {
  return bitmovin.encoding.encodings(encoding.id).startLive(liveConfiguration);
};

const waitUntilEncodingRunning = encoding => {
  return new Promise((resolve, reject) => {
    const waitForEncodingToBeRunningOrError = () => {
      console.log('Getting Status for Encoding with ID ', encoding.id);
      bitmovin.encoding
        .encodings(encoding.id)
        .status()
        .then(response => {
          console.log('Encoding Status is ' + response.status + '.');
          if (response.status === ENCODING_CREATION_STATUS.RUNNING) {
            return resolve(response.status);
          }
          if (response.status === ENCODING_CREATION_STATUS.ERROR) {
            return reject(response.status);
          }
          setTimeout(waitForEncodingToBeRunningOrError, ENCODING_CREATION_STATUS_POLLING_INTERVAL);
        });
    };
    waitForEncodingToBeRunningOrError();
  });
};

const waitForLiveEncodingDetails = encoding => {
  let retries = MAX_LIVESTREAM_DETAILS_FETCH_RETRIES;
  return new Promise((resolve, reject) => {
    const waitForLiveEncodingDetails = () => {
      bitmovin.encoding
        .encodings(encoding.id)
        .liveDetails()
        .then(liveEncodingDetails => {
          resolve(liveEncodingDetails);
        })
        .catch(error => {
          if (retries > 0) {
            setTimeout(waitForLiveEncodingDetails, LIVE_ENCODING_DETAILS_POLLING_INTERVAL);
            retries--;
          } else {
            console.error('Maximum retries for retrieving live encoding details reached. Aborting!');
            reject(error);
          }
        });
    };
    waitForLiveEncodingDetails();
  });
};

const logErrorPromise = (reject, errorMessage) => {
  return error => {
    console.error(errorMessage, error);
    reject(error);
  };
};

main()
  .then(response => {
    console.log('--------------------------------------------------------------');
    console.log('Successfully started live encoding! Ready for ingest!');
    console.log('');
    console.log('Encoding ID: ' + response.encodingId);
    console.log('Stream Key: ' + response.liveEncodingDetails.streamKey);
    console.log('Application: ' + response.liveEncodingDetails.application);
    console.log('Encoder IP: ' + response.liveEncodingDetails.encoderIp);
    console.log('');
    console.log(
      'Stream URL: rtmp://' + response.liveEncodingDetails.encoderIp + '/' + response.liveEncodingDetails.application
    );
    console.log('--------------------------------------------------------------');
  })
  .catch(error => {
    console.error('ERROR!', error);
    process.exit(100);
  });
