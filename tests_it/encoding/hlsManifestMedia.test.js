import assert from 'assert';

import {getConfiguration} from '../utils';
import encodings from '../../bitmovin/encoding/encodings/encodings';
import inputs from '../../bitmovin/encoding/inputs';
import codecConfigurations from '../../bitmovin/encoding/codecConfigurations';
import outputs from '../../bitmovin/encoding/outputs';
import streams from '../../bitmovin/encoding/encodings/streams';
import muxings from '../../bitmovin/encoding/encodings/muxings';
import drms from '../../bitmovin/encoding/encodings/drms';
import hlsManifests from '../../bitmovin/encoding/manifests/hls/hlsManifests';
import hlsManifestMedia from '../../bitmovin/encoding/manifests/hls/hlsManifestMedia';

let testConfiguration = getConfiguration();

let encodingsClient           = encodings(testConfiguration);
let inputsClient              = inputs(testConfiguration);
let outputsClient             = outputs(testConfiguration);
let codecConfigurationsClient = codecConfigurations(testConfiguration);
let manifestsClient           = hlsManifests(testConfiguration);

const createEncoding = () => {
  let encoding = {
    name          : 'MyAwesomeEncodingBitmovinJavascript',
    description   : 'Just a descriptive information',
    encoderVersion: 'BETA',
    cloudRegion   : 'GOOGLE_EUROPE_WEST_1',
    customData    : {
      myList: ['a', 'b', 'c', 'd'],
      myInt : 1234
    }
  };

  return encodingsClient.create(encoding);
};

const createInput = () => {
  let input = {
    name       : 'Bitmovin Javascript Sample HTTP Input',
    description: 'Bitmovin Javascript input.test.js sampleHttpInput',
    host       : 'websrv.corpnet.local',
    username   : 'jim',
    password   : 'correctHorseBatteryStaple',
    customData : {
      myList: ['a', 'b', 'c', 'd'],
      myInt : 1234
    }
  };

  return inputsClient.http.create(input);
};

const createOutput = () => {
  let output = {
    name       : 'Sample S3 Output - Bitmovin Javascript',
    description: 'Bitmovin Javascript outputs.test.js',
    accessKey  : 'AKIAIOSFODNN7INVALID',
    secretKey  : 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYINVALIDKEY',
    bucketName : 'printtheworld',
    cloudRegion: 'SA_EAST_1',
    customData : {
      myList: ['a', 'b', 'c', 'd'],
      myInt : 1234
    }
  };

  return outputsClient.s3.create(output);
};

const createCodecConfiguration = () => {
  let codecConfiguration = {
    name            : 'MyAwesomeH264CodecConfigBitmovinJavascript',
    description     : 'Just a descriptive information',
    bitrate         : 10000000,
    rate            : 23.97,
    width           : 1920,
    height          : 1200,
    profile         : 'HIGH',
    bFrames         : 3,
    refFrames       : 5,
    qpMin           : 0,
    qpMax           : 30,
    mvPredictionMode: 'SPATIAL',
    mvSearchRangeMax: 16,
    cabac           : true,
    maxBitrate      : 12000000,
    minBitrate      : 7000000,
    bufsize         : 0,
    minGop          : 0,
    maxGop          : 8,
    level           : '2.1',
    customData      : {
      myList: ['a', 'b', 'c', 'd'],
      myInt : 1234
    }
  };

  return codecConfigurationsClient.h264.create(codecConfiguration);
};

describe('[HLS Manifest Media Tests]', () => {
  let encodingResource    = undefined;
  let inputResource       = undefined;
  let outputResource      = undefined;
  let codecConfigResource = undefined;
  let streamResource      = undefined;
  let muxingResource      = undefined;
  let manifestResource    = undefined;
  let drmResource         = undefined;

  beforeAll((done) => {
    let encodingPromise    = createEncoding();
    let inputPromise       = createInput();
    let outputPromise      = createOutput();
    let codecConfigPromise = createCodecConfiguration();

    Promise.all([encodingPromise, inputPromise, outputPromise, codecConfigPromise]).then((results) => {
      encodingResource    = results[0];
      inputResource       = results[1];
      outputResource      = results[2];
      codecConfigResource = results[3];

      let streamsClient = streams(testConfiguration, encodingResource.id);
      let stream        = {
        name         : 'Bitmovin JS sample stream',
        codecConfigId: codecConfigResource.id,
        inputStreams : [
          {
            inputId      : inputResource.id,
            inputPath    : '/path/to/videos/sintel.mp4',
            selectionMode: 'AUTO'
          }
        ]
      };
      return streamsClient.add(stream);
    }).then((result) => {
      streamResource = result;

      let muxingClient = muxings(testConfiguration, encodingResource.id);
      let muxing       = {
        name           : 'Sample Bitmovin JS FMP4 Muxing',
        segmentLength  : 4,
        segmentNaming  : 'seg_%number%.m4s',
        initSegmentName: 'init.mp4',
        streams        : [
          {
            'streamId': streamResource.id
          }
        ],
        outputs        : [
          {
            outputId  : outputResource.id,
            outputPath: '/path/to/outputFolder/',
            acl       : [
              {
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ]
      };
      return muxingClient.fmp4.add(muxing);
    }).then((result) => {
      muxingResource = result;

      let drmClient = drms(testConfiguration, encodingResource.id, 'fmp4', muxingResource.id);

      let marlinDrm = {
        name   : 'bitmovin js sample marlin drm',
        outputs: [
          {
            outputId  : outputResource.id,
            outputPath: '/path/to/outputFolder/',
            acl       : [
              {
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ],
        key    : '123456789ABCDEF123456789ABCDEF12',
        kid    : '123456789ABCDEF123456789ABCDEF12'
      };
      return drmClient.marlin.add(marlinDrm);
    }).then((result) => {
      drmResource  = result;
      let manifest = {
        name        : 'Bitmovin javascript test HLS manifest',
        outputs     : [
          {
            outputId  : outputResource.id,
            outputPath: '/path/to/outputFolder/',
            acl       : [
              {
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ],
        manifestName: 'stream.m3u8'
      };
      return manifestsClient.create(manifest);
    }).then((result) => {
      manifestResource = result;
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  let sampleVideoMedia = {
    name              : 'Bitmovin JS sample video media',
    groupId           : 'video_group',
    language          : 'en',
    assocLanguage     : 'en',
    isDefault         : false,
    autoselect        : false,
    segmentPath       : 'path/to/segments/video/',
    encodingId        : undefined,
    streamId          : undefined,
    muxingId          : undefined,
    drmId             : undefined,
    startSegmentNumber: 0,
    endSegmentNumber  : 4603,
    uri               : 'yourhost.com/playlist/url',
    characteristics   : [
      'public.accessibility.describes-video'
    ]
  };

  let sampleAudioMedia = {
    name              : 'Bitmovin JS sample audio media',
    groupId           : 'audio_group',
    language          : 'en',
    assocLanguage     : 'en',
    isDefault         : false,
    autoselect        : false,
    segmentPath       : 'path/to/segments/audio/',
    encodingId        : undefined,
    streamId          : undefined,
    muxingId          : undefined,
    drmId             : undefined,
    startSegmentNumber: 0,
    endSegmentNumber  : 4603,
    uri               : 'yourhost.com/playlist/url',
    characteristics   : [
      'public.accessibility.describes-audio'
    ]
  };

  let sampleSubtitlesMedia = {
    name              : 'Bitmovin JS sample subtitles media',
    groupId           : 'subtitles_group',
    language          : 'en',
    assocLanguage     : 'en',
    isDefault         : false,
    autoselect        : false,
    segmentPath       : 'path/to/segments/subtitles/',
    encodingId        : undefined,
    streamId          : undefined,
    muxingId          : undefined,
    drmId             : undefined,
    startSegmentNumber: 0,
    endSegmentNumber  : 4603,
    uri               : 'yourhost.com/playlist/url',
    characteristics   : [
      'public.accessibility.describes-subtitles'
    ],
    forced            : false
  };

  let sampleClosedCaptionsMedia = {
    name              : 'Bitmovin JS sample closed captions media',
    groupId           : 'cc_group',
    language          : 'en',
    assocLanguage     : 'en',
    isDefault         : false,
    autoselect        : false,
    segmentPath       : 'path/to/segments/subtitles/',
    encodingId        : undefined,
    streamId          : undefined,
    muxingId          : undefined,
    drmId             : undefined,
    startSegmentNumber: 0,
    endSegmentNumber  : 4603,
    characteristics   : [
      'public.accessibility.describes-audio'
    ]
  };

  // TODO: not correctly implemented yet in MRS
  it.skip('should add video media to a hls manifest', (done) => {
    sampleVideoMedia.encodingId = encodingResource.id;
    sampleVideoMedia.streamId   = streamResource.id;
    sampleVideoMedia.muxingId   = muxingResource.id;
    sampleVideoMedia.drmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.video.add(sampleVideoMedia).then((createdMedia) => {
      compareVideoMedia(createdMedia, sampleVideoMedia);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of video media entries of a hls manifests', (done) => {
    manifestsClient(manifestResource.id).media.video.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // TODO: not correctly implemented yet in MRS
  it.skip('should return details of a video media entry', (done) => {
    sampleVideoMedia.encodingId = encodingResource.id;
    sampleVideoMedia.streamId   = streamResource.id;
    sampleVideoMedia.muxingId   = muxingResource.id;
    sampleVideoMedia.drmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.video.add(sampleVideoMedia).then((createdMedia) => {
      compareVideoMedia(createdMedia, sampleVideoMedia);
      return manifestsClient(manifestResource.id).media.video(createdMedia.id).details();
    }).then((details) => {
      compareVideoMedia(details, sampleVideoMedia);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete a video media entry', (done) => {
    let createdMediaResource = undefined;

    sampleVideoMedia.encodingId = encodingResource.id;
    sampleVideoMedia.streamId   = streamResource.id;
    sampleVideoMedia.muxingId   = muxingResource.id;
    sampleVideoMedia.drmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.video.add(sampleVideoMedia).then((createdMedia) => {
      createdMediaResource = createdMedia;
      return manifestsClient(manifestResource.id).media.video(createdMedia.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdMediaResource.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // TODO: not correctly implemented yet in MRS
  it.skip('should add audio media to a hls manifest', (done) => {
    sampleAudioMedia.encodingId = encodingResource.id;
    sampleAudioMedia.streamId   = streamResource.id;
    sampleAudioMedia.muxingId   = muxingResource.id;
    sampleAudioMedia.dskiprmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.audio.add(sampleAudioMedia).then((createdMedia) => {
      compareAudioMedia(createdMedia, sampleAudioMedia);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of audio media entries of a hls manifests', (done) => {
    manifestsClient(manifestResource.id).media.audio.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // TODO: not correctly implemented yet in MRS
  it.skip('should return details of a audio media entry', (done) => {
    sampleAudioMedia.encodingId = encodingResource.id;
    sampleAudioMedia.streamId   = streamResource.id;
    sampleAudioMedia.muxingId   = muxingResource.id;
    sampleAudioMedia.drmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.audio.add(sampleAudioMedia).then((createdMedia) => {
      compareAudioMedia(createdMedia, sampleAudioMedia);
      return manifestsClient(manifestResource.id).media.audio(createdMedia.id).details();
    }).then((details) => {
      compareAudioMedia(details, sampleAudioMedia);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete a audio media entry', (done) => {
    let createdMediaResource = undefined;

    sampleAudioMedia.encodingId = encodingResource.id;
    sampleAudioMedia.streamId   = streamResource.id;
    sampleAudioMedia.muxingId   = muxingResource.id;
    sampleAudioMedia.drmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.audio.add(sampleAudioMedia).then((createdMedia) => {
      createdMediaResource = createdMedia;
      return manifestsClient(manifestResource.id).media.audio(createdMedia.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdMediaResource.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });


  // TODO: not correctly implemented yet in MRS
  it.skip('should add subtitles media to a hls manifest', (done) => {
    sampleSubtitlesMedia.encodingId = encodingResource.id;
    sampleSubtitlesMedia.streamId   = streamResource.id;
    sampleSubtitlesMedia.muxingId   = muxingResource.id;
    sampleSubtitlesMedia.drmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.subtitles.add(sampleSubtitlesMedia).then((createdMedia) => {
      compareSubtitlesMedia(createdMedia, sampleSubtitlesMedia);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of subtitles media entries of a hls manifests', (done) => {
    manifestsClient(manifestResource.id).media.subtitles.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // TODO: not correctly implemented yet in MRS
  it.skip('should return details of a subtitles media entry', (done) => {
    sampleSubtitlesMedia.encodingId = encodingResource.id;
    sampleSubtitlesMedia.streamId   = streamResource.id;
    sampleSubtitlesMedia.muxingId   = muxingResource.id;
    sampleSubtitlesMedia.drmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.subtitles.add(sampleSubtitlesMedia).then((createdMedia) => {
      compareSubtitlesMedia(createdMedia, sampleSubtitlesMedia);
      return manifestsClient(manifestResource.id).media.subtitles(createdMedia.id).details();
    }).then((details) => {
      compareSubtitlesMedia(details, sampleSubtitlesMedia);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it.skip('should delete a subtitles media entry', (done) => {
    let createdMediaResource = undefined;

    sampleSubtitlesMedia.encodingId = encodingResource.id;
    sampleSubtitlesMedia.streamId   = streamResource.id;
    sampleSubtitlesMedia.muxingId   = muxingResource.id;
    sampleSubtitlesMedia.drmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.subtitles.add(sampleSubtitlesMedia).then((createdMedia) => {
      createdMediaResource = createdMedia;
      return manifestsClient(manifestResource.id).media.subtitles(createdMedia.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdMediaResource.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // TODO: 400 Bad request
  it('should add closedCaptions media to a hls manifest', (done) => {
    sampleClosedCaptionsMedia.encodingId = encodingResource.id;
    sampleClosedCaptionsMedia.streamId   = streamResource.id;
    sampleClosedCaptionsMedia.muxingId   = muxingResource.id;
    sampleClosedCaptionsMedia.drmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.closedCaptions.add(sampleClosedCaptionsMedia).then((createdMedia) => {
      compareClosedCaptionsMedia(createdMedia, sampleClosedCaptionsMedia);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of closedCaptions media entries of a hls manifests', (done) => {
    manifestsClient(manifestResource.id).media.closedCaptions.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // TODO: 400 bad request
  it.skip('should return details of a closedCaptions media entry', (done) => {
    sampleClosedCaptionsMedia.encodingId = encodingResource.id;
    sampleClosedCaptionsMedia.streamId   = streamResource.id;
    sampleClosedCaptionsMedia.muxingId   = muxingResource.id;
    sampleClosedCaptionsMedia.drmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.closedCaptions.add(sampleClosedCaptionsMedia).then((createdMedia) => {
      compareClosedCaptionsMedia(createdMedia, sampleClosedCaptionsMedia);
      return manifestsClient(manifestResource.id).media.closedCaptions(createdMedia.id).details();
    }).then((details) => {
      compareClosedCaptionsMedia(details, sampleClosedCaptionsMedia);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // TODO: Error: 400 Bad request
  it.skip('should delete a closedCaptions media entry', (done) => {
    let createdMediaResource = undefined;

    sampleClosedCaptionsMedia.encodingId = encodingResource.id;
    sampleClosedCaptionsMedia.streamId   = streamResource.id;
    sampleClosedCaptionsMedia.muxingId   = muxingResource.id;
    sampleClosedCaptionsMedia.drmId      = drmResource.id;
    manifestsClient(manifestResource.id).media.closedCaptions.add(sampleClosedCaptionsMedia).then((createdMedia) => {
      compareClosedCaptionsMedia(createdMedia, sampleClosedCaptionsMedia);
      createdMediaResource = createdMedia;
      return manifestsClient(manifestResource.id).media.closedCaptions(createdMedia.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdMediaResource.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  const compareMedia = (mediaOne, mediaTwo) => {
    assert.equal(mediaOne.groupId, mediaTwo.groupId);
    assert.equal(mediaOne.language, mediaTwo.language);
    assert.equal(mediaOne.assocLanguage, mediaTwo.assocLanguage);
    assert.equal(mediaOne.isDefault, mediaTwo.isDefault);
    assert.equal(mediaOne.autoselect, mediaTwo.autoselect);
    assert.equal(mediaOne.segmentPath, mediaTwo.segmentPath);
    assert.equal(mediaOne.encodingId, mediaTwo.encodingId);
    assert.equal(mediaOne.streamId, mediaTwo.streamId);
    assert.equal(mediaOne.muxingId, mediaTwo.muxingId);
    assert.equal(mediaOne.drmId, mediaTwo.drmId);
    assert.equal(mediaOne.startSegmentNumber, mediaTwo.startSegmentNumber);
    assert.equal(mediaOne.endSegmentNumber, mediaTwo.endSegmentNumber);
    assert.deepEqual(mediaOne.characteristics, mediaTwo.characteristics);
  };

  const compareVideoMedia = (mediaOne, mediaTwo) => {
    compareMedia(mediaOne, mediaTwo);
    assert.equal(mediaOne.uri, mediaTwo.uri);
  };

  const compareAudioMedia = (mediaOne, mediaTwo) => {
    compareMedia(mediaOne, mediaTwo);
    assert.equal(mediaOne.uri, mediaTwo.uri);
  };

  const compareSubtitlesMedia = (mediaOne, mediaTwo) => {
    compareMedia(mediaOne, mediaTwo);
    assert.equal(mediaOne.uri, mediaTwo.uri);
    assert.equal(mediaOne.forced, mediaTwo.forced);
  };

  const compareClosedCaptionsMedia = (mediaOne, mediaTwo) => {
    compareMedia(mediaOne, mediaTwo);
  };
});
