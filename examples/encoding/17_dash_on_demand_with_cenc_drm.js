const Bitmovin = require('bitmovin-javascript').default;
const Promise = require('bluebird');
const urljoin = require('url-join');

const BITMOVIN_API_KEY = '<YOUR BITMOVIN API KEY>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});

// Input Settings
// See https://bitmovin.com/encoding-documentation/bitmovin-api/#/reference/encoding/inputs/create-s3-input for more information
const S3_INPUT_ACCESS_KEY = '<YOUR S3 INPUT ACCESS KEY>';
const S3_INPUT_SECRET_KEY = '<YOUR S3 INPUT SECRET KEY>';
const S3_INPUT_BUCKET_NAME = '<YOUR S3 INPUT BUCKET NAME>';

const INPUT_FILE_PATH = '/path/to/your/input/file.mkv';

// Output Settings
// See https://bitmovin.com/encoding-documentation/bitmovin-api/#/reference/encoding/outputs/create-ftp-output for more information
const S3_OUTPUT_ACCESS_KEY = '<YOUR S3 OUTPUT ACCESS KEY>';
const S3_OUTPUT_SECRET_KEY = '<YOUR S3 OUTPUT SECRET KEY>';
const S3_OUTPUT_BUCKET_NAME = '<YOUR S3 OUTPUT BUCKET NAME>';
const OUTPUT_BASE_PATH = '/output/on-demand-drm-javascript-' + new Date().toISOString();

// DRM Settings
const DRM_KID = '<YOUR CENC DRM KID>';
const DRM_KEY = '<YOUR CENC DRM KEY>';
const DRM_WIDEVINE_PSSH = '<YOUR CENC DRM WIDEVINE PSSH>';
const DRM_PLAYREADY_LA_URL = '<YOUR CENC DRM PLAYREADY LA URL>';

const video_profiles = [
  {
    name: '1080p profile',
    width: 1920,
    height: 1080,
    bitrate: 48000000,
    fps: 25,
    profile: 'HIGH',
    filename: 'video1080p.mp4',
    outputPath: '/video1080p/'
  },
  {
    name: '720p profile',
    width: 1280,
    height: 720,
    bitrate: 2400000,
    fps: 25,
    profile: 'HIGH',
    filename: 'video720p.mp4',
    outputPath: '/video720p/'
  },
  {
    name: '480p profile',
    width: 854,
    height: 480,
    bitrate: 1200000,
    fps: 25,
    profile: 'HIGH',
    filename: 'video480p.mp4',
    outputPath: '/video480p/'
  },
  {
    name: '360p profile',
    width: 640,
    height: 360,
    bitrate: 800000,
    fps: 25,
    profile: 'HIGH',
    filename: 'video360p.mp4',
    outputPath: '/video360p/'
  },
  {
    name: '240p profile',
    width: 426,
    height: 240,
    bitrate: 400000,
    fps: 25,
    profile: 'HIGH',
    filename: 'video240p.mp4',
    outputPath: '/video240p/'
  }
];

const audio_profiles = [
  {name: '96kbps audio', bitrate: 96000, sampleRate: 48000, filename: 'audio_96kbps.mp4', outputPath: '/audio/'},
  {name: '128kbps audio', bitrate: 128000, sampleRate: 48000, filename: 'audio_128kbps.mp4', outputPath: '/audio/'},
  {name: '192kbps audio', bitrate: 192000, sampleRate: 48000, filename: 'audio_192kbps.mp4', outputPath: '/audio/'},
  {name: '256kbps audio', bitrate: 256000, sampleRate: 48000, filename: 'audio_256kbps.mp4', outputPath: '/audio/'}
];

const createS3Input = () => {
  const input = {
    name: 'S3 input',
    accessKey: S3_INPUT_ACCESS_KEY,
    secretKey: S3_INPUT_SECRET_KEY,
    bucketName: S3_INPUT_BUCKET_NAME
  };
  return bitmovin.encoding.inputs.s3.create(input);
};

const createS3Output = () => {
  const output = {
    name: 'S3 output',
    accessKey: S3_OUTPUT_ACCESS_KEY,
    secretKey: S3_OUTPUT_SECRET_KEY,
    bucketName: S3_OUTPUT_BUCKET_NAME
  };
  return bitmovin.encoding.outputs.s3.create(output);
};

const createEncoding = () => {
  const encoding = {
    name: 'MyOnDemand DRM Encoding',
    encoderVersion: 'BETA'
  };
  return bitmovin.encoding.encodings.create(encoding);
};

const createVideoCodecConfigs = () => {
  return video_profiles.map(profile => {
    const codecConfig = {
      name: 'H264 ' + profile.height + 'p',
      bitrate: profile.bitrate,
      height: profile.height,
      profile: profile.profile
    };
    return bitmovin.encoding.codecConfigurations.h264.create(codecConfig);
  });
};

const createAudioCodecConfigs = () => {
  return audio_profiles.map(profile => {
    const codecConfig = {
      name: 'AAC ' + profile.bitrate,
      rate: profile.sampleRate,
      bitrate: profile.bitrate
    };
    return bitmovin.encoding.codecConfigurations.aac.create(codecConfig);
  });
};

const createVideoStreams = (encoding, videoCodecConfigs, input) => {
  return videoCodecConfigs.map(codecConfig => {
    const inputStreams = [
      {
        inputId: input.id,
        inputPath: INPUT_FILE_PATH,
        selectionMode: 'VIDEO_RELATIVE',
        position: 0
      }
    ];
    const videoStream = {
      codecConfigId: codecConfig.id,
      inputStreams
    };
    return bitmovin.encoding.encodings(encoding.id).streams.add(videoStream);
  });
};

const createAudioStreams = (encoding, audioCodecConfigs, input) => {
  return audioCodecConfigs.map(codecConfig => {
    const inputStreams = [
      {
        inputId: input.id,
        inputPath: INPUT_FILE_PATH,
        selectionMode: 'AUDIO_RELATIVE',
        position: 0
      }
    ];
    const audioStream = {
      codecConfigId: codecConfig.id,
      inputStreams
    };
    return bitmovin.encoding.encodings(encoding.id).streams.add(audioStream);
  });
};

const createMp4Muxings = (encoding, streamsWithFilenames) => {
  return streamsWithFilenames.map(stream => {
    const muxing = {
      fragmentedMP4MuxingManifestType: 'DASH_ON_DEMAND',
      fragmentDuration: 4000,
      streams: {
        streamId: stream.id
      },
      filename: stream.filename
    };
    return bitmovin.encoding.encodings(encoding.id).muxings.mp4.add(muxing);
  });
};

const addDrmToRepresentations = (representations, output) => {
  return representations.map(representation => {
    const cencDrm = {
      outputs: [
        {
          outputId: output.id,
          outputPath: urljoin(OUTPUT_BASE_PATH, representation.profile.outputPath),
          acl: [
            {
              permission: 'PUBLIC_READ'
            }
          ]
        }
      ],
      kid: DRM_KID,
      key: DRM_KEY,
      widevine: {
        pssh: DRM_WIDEVINE_PSSH
      },
      playReady: {
        laUrl: DRM_PLAYREADY_LA_URL
      },
      marlin: {},
      encryptionMode: 'CTR'
    };
    return bitmovin.encoding
      .encodings(representation.encoding.id)
      .muxings.mp4(representation.muxing.id)
      .drms.cenc.add(cencDrm);
  });
};

const createDashManifest = output => {
  const manifest = {
    name: 'Sample On Demand Encoding Manifest',
    profile: 'ON_DEMAND',
    outputs: [
      {
        outputId: output.id,
        outputPath: urljoin(OUTPUT_BASE_PATH, '/mpds'),
        acl: [
          {
            permission: 'PUBLIC_READ'
          }
        ]
      }
    ],
    manifestName: 'myOnDemandManifest.mpd'
  };
  return bitmovin.encoding.manifests.dash.create(manifest);
};

const addPeriodToManifest = manifest => {
  const period = {
    start: '0',
    duration: 4000
  };
  return bitmovin.encoding.manifests.dash(manifest.id).periods.add(period);
};

const addVideoAdaptationSetToPeriod = (manifest, period) => {
  const videoAdaptationSet = {};
  return bitmovin.encoding.manifests
    .dash(manifest.id)
    .periods(period.id)
    .adaptationSets.video.create(videoAdaptationSet);
};

const addAudioAdaptationSetToPeriod = (manifest, period) => {
  const audioAdaptationSet = {};
  return bitmovin.encoding.manifests
    .dash(manifest.id)
    .periods(period.id)
    .adaptationSets.audio.create(audioAdaptationSet);
};

const buildOutputFileUrlForProfile = profile => {
  return urljoin('..', profile.outputPath, profile.filename);
};

const addDashDrmMp4RepresentationToAdaptationSet = (
  manifest,
  period,
  adaptationSet,
  encoding,
  muxing,
  profile,
  drm
) => {
  const drmRepresentation = {
    encodingId: encoding.id,
    muxingId: muxing.id,
    filePath: buildOutputFileUrlForProfile(profile),
    drmId: drm.id
  };

  return bitmovin.encoding.manifests
    .dash(manifest.id)
    .periods(period.id)
    .adaptationSets(adaptationSet.id)
    .representations.drmMp4.add(drmRepresentation);
};

const createManifest = (output, videoDrmManifestRepresentations, audioDrmManifestRepresentations) =>
  new Promise(resolve => {
    return createDashManifest(output).then(createdManifest => {
      return addPeriodToManifest(createdManifest).then(createdPeriod => {
        const videoRepresentationPromises = addVideoAdaptationSetToPeriod(createdManifest, createdPeriod).then(
          createdVideoAdaptationSet => {
            return Promise.map(
              videoDrmManifestRepresentations,
              videoRepresentation => {
                return addDashDrmMp4RepresentationToAdaptationSet(
                  createdManifest,
                  createdPeriod,
                  createdVideoAdaptationSet,
                  videoRepresentation.encoding,
                  videoRepresentation.muxing,
                  videoRepresentation.profile,
                  videoRepresentation.drm
                );
              },
              {concurrency: 1}
            );
          }
        );
        const audioRepresentationPromises = addAudioAdaptationSetToPeriod(createdManifest, createdPeriod).then(
          createdAudioAdaptationSet => {
            return Promise.map(
              audioDrmManifestRepresentations,
              audioRepresentation => {
                return addDashDrmMp4RepresentationToAdaptationSet(
                  createdManifest,
                  createdPeriod,
                  createdAudioAdaptationSet,
                  audioRepresentation.encoding,
                  audioRepresentation.muxing,
                  audioRepresentation.profile,
                  audioRepresentation.drm
                );
              },
              {concurrency: 1}
            );
          }
        );
        return Promise.all([videoRepresentationPromises, audioRepresentationPromises]).then(() => {
          return resolve(createdManifest);
        });
      });
    });
  });

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

const startEncodingAndWaitForItToBeFinished = encoding => {
  const startPromise = bitmovin.encoding.encodings(encoding.id).start(null);
  return startPromise
    .then(() => {
      return waitUntilEncodingFinished(encoding).then(success => {
        console.log('dash encoding finished', success);
      });
    })
    .catch(error => {
      console.log('dash encoding errored', error);
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

const startDashManifestCreationAndWaitUntilFinishedOrError = manifest => {
  const startPromise = bitmovin.encoding.manifests.dash(manifest.id).start();
  return startPromise.then(() => {
    return waitUntilDashManifestFinished(manifest)
      .then(success => {
        console.log('manifest finished', success);
      })
      .catch(error => {
        console.log('manifest errored', error);
      });
  });
};

const main = () =>
  new Promise(() => {
    const createEncodingPromise = createEncoding();
    const createInputPromise = createS3Input();
    const createOutputPromise = createS3Output();
    const videoCodecConfigsPromises = createVideoCodecConfigs();
    const audioCodecConfigsPromises = createAudioCodecConfigs();

    const videoCodecConfigPromise = Promise.all(videoCodecConfigsPromises);
    const audioCodecConfigPromise = Promise.all(audioCodecConfigsPromises);

    const preparationPromises = [
      createEncodingPromise,
      createInputPromise,
      createOutputPromise,
      videoCodecConfigPromise,
      audioCodecConfigPromise
    ];

    Promise.all(preparationPromises).then(
      ([createdEncoding, createdInput, createdOutput, createdVideoConfigs, createdAudioConfigs]) => {
        console.log(
          'Successfully created encoding, input, output, video codec configs and audio codec configs',
          createdEncoding,
          createdInput,
          createdOutput,
          createdVideoConfigs,
          createdAudioConfigs
        );

        /* Add streams to encoding */

        const videoStreamPromises = createVideoStreams(
          createdEncoding,
          createdVideoConfigs,
          createdInput,
          createdOutput
        );
        const audioStreamPromises = createAudioStreams(
          createdEncoding,
          createdAudioConfigs,
          createdInput,
          createdOutput
        );

        const videoStreamPromise = Promise.all(videoStreamPromises);
        const audioStreamPromise = Promise.all(audioStreamPromises);

        const streamPromises = [videoStreamPromise, audioStreamPromise];

        Promise.all(streamPromises).then(([createdVideoStreams, createdAudioStreams]) => {
          console.log('Successfullly added streams to encoding', createdVideoStreams, createdAudioStreams);
          const audioStreamsWithFilenames = createdAudioStreams.map((audioStream, index) => {
            return Object.assign(
              {
                filename: audio_profiles[index].filename,
                outputPath: audio_profiles[index].outputPath
              },
              audioStream
            );
          });
          const videoStreamsWithFilenames = createdVideoStreams.map((videoStream, index) => {
            return Object.assign(
              {
                filename: video_profiles[index].filename,
                outputPath: video_profiles[index].outputPath
              },
              videoStream
            );
          });

          const videoMp4MuxingPromise = Promise.all(
            createMp4Muxings(createdEncoding, videoStreamsWithFilenames, createdOutput)
          );
          const audioMp4MuxingPromise = Promise.all(
            createMp4Muxings(createdEncoding, audioStreamsWithFilenames, createdOutput)
          );

          const mp4MuxingPromises = [videoMp4MuxingPromise, audioMp4MuxingPromise];

          Promise.all(mp4MuxingPromises).then(([createdVideoMuxings, createdAudioMuxings]) => {
            console.log('Successfully created mp4 muxings', createdVideoMuxings, createdAudioMuxings);

            const videoRepresentations = createdVideoMuxings.map((videoMuxing, index) => {
              return {
                muxing: videoMuxing,
                encoding: createdEncoding,
                profile: video_profiles[index]
              };
            });

            const audioRepresentations = createdAudioMuxings.map((audioMuxing, index) => {
              return {
                muxing: audioMuxing,
                encoding: createdEncoding,
                profile: audio_profiles[index]
              };
            });

            const videoDrmPromises = Promise.all(addDrmToRepresentations(videoRepresentations, createdOutput));
            const audioDrmPromises = Promise.all(addDrmToRepresentations(audioRepresentations, createdOutput));

            const drmPromises = [videoDrmPromises, audioDrmPromises];

            Promise.all(drmPromises).then(([createdVideoDrms, createdAudioDrms]) => {
              console.log('Successfully added drms to muxings', createdVideoDrms, createdAudioDrms);

              const videoDrmRepresentations = createdVideoMuxings.map((videoMuxing, index) => {
                return {
                  muxing: videoMuxing,
                  encoding: createdEncoding,
                  drm: createdVideoDrms[index],
                  profile: video_profiles[index]
                };
              });

              const audioDrmRepresentations = createdAudioMuxings.map((audioMuxing, index) => {
                return {
                  muxing: audioMuxing,
                  encoding: createdEncoding,
                  drm: createdAudioDrms[index],
                  profile: audio_profiles[index]
                };
              });

              startEncodingAndWaitForItToBeFinished(createdEncoding).then(() => {
                createManifest(createdOutput, videoDrmRepresentations, audioDrmRepresentations).then(
                  createdManifest => {
                    console.log('Successfully created manifest', createdManifest);
                    startDashManifestCreationAndWaitUntilFinishedOrError(createdManifest).then(() => {
                      console.log('Successfully finished encoding and manifest generation!');
                    });
                  }
                );
              });
            });
          });
        });
      }
    );
  });

const exit = (code, message) => {
  console.error('ERROR: ', message, 'Exiting with code ', code);
  process.exit(code);
};

main()
  .then(() => {
    console.log('Finished!');
  })
  .catch(error => {
    exit(100, error);
  });
