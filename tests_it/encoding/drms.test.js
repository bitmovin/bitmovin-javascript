import {after, before, describe, it} from 'mocha';
import assert from 'assert';

import {getConfiguration} from '../utils';
import encodings from '../../bitmovin/encoding/encodings';
import streams from '../../bitmovin/encoding/streams';
import inputs from '../../bitmovin/encoding/inputs';
import codecConfigurations from '../../bitmovin/encoding/codecConfigurations';
import outputs from '../../bitmovin/encoding/outputs';

let testConfiguration = getConfiguration();

let sampleWidevineDrm = {
  name       : 'Sample Widevine DRM (bitmovin javascript)',
  description: 'sample Widevine drm bitmovin javascript drms.test.js',
  key        : 'cab5b529ae28d5cc5e3e7bc3fd4a544d',
  kid        : '08eecef4b026deec395234d94218273d',
  pssh       : 'QWRvYmVhc2Rmc2FkZmFzZg==',
  outputs    : [],
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

let samplePlayReadyDrm = {
  name       : 'Sample PlayReady DRM (bitmovin javascript)',
  description: 'sample PlayReady drm bitmovin javascript drms.test.js',
  keySeed    : 'XVBovsmzhP9gRIZxWfFta3VVRPzVEWmJsazEJ46I',
  kid        : '746573745f69645f4639465043304e4f',
  laUrl      : 'http://playready.directtaps.net/pr/svc/rightsmanager.asmx',
  method     : 'MPEG_CENC',
  outputs    : [],
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

let samplePrimeTimeDrm = {
  name       : 'Sample PrimeTime DRM (bitmovin javascript)',
  description: 'sample PrimeTime drm bitmovin javascript drms.test.js',
  key        : 'cab5b529ae28d5cc5e3e7bc3fd4a544d',
  kid        : '08eecef4b026deec395234d94218273d',
  pssh       : 'QWRvYmVhc2Rmc2FkZmFzZg==',
  outputs    : [],
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

let sampleFairPlayDrm = {
  name       : 'Sample FairPlay DRM (bitmovin javascript)',
  description: 'sample FairPlay drm bitmovin javascript drms.test.js',
  outputs    : [],
  key        : 'cab5b529ae28d5cc5e3e7bc3fd4a544d',
  iv         : '08eecef4b026deec395234d94218273d',
  uri        : 'skd://userspecifc?custom=information',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

let sampleMarlinDrm = {
  name       : 'Sample Marlin DRM (bitmovin javascript)',
  description: 'sample Marlin drm bitmovin javascript drms.test.js',
  key        : '123456789ABCDEF123456789ABCDEF12',
  kid        : '123456789ABCDEF123456789ABCDEF12',
  outputs    : [],
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

let sampleClearKeyDrm = {
  name       : 'Sample ClearKey DRM (bitmovin javascript)',
  description: 'sample ClearKey drm bitmovin javascript drms.test.js',
  outputs    : [],
  key        : 'cab5b529ae28d5cc5e3e7bc3fd4a544d',
  kid        : '08eecef4b026deec395234d94218273d',
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }

};

let sampleCencDrm = {
  name       : 'Sample CENC DRM (bitmovin javascript)',
  description: 'sample CENC drm bitmovin javascript drms.test.js',
  key        : 'cab5b529ae28d5cc5e3e7bc3fd4a544d',
  kid        : '08eecef4b026deec395234d94218273d',
  widevine   : {
    pssh: 'QWRvYmVhc2Rmc2FkZmFzZg=='
  },
  playReady  : {
    pssh: 'QWRvYmVhc2Rmc2FkZmFzZg=='
  },
  marlin     : {},
  outputs    : [],
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

let sampleAesDrm = {
  name       : 'Sample AES DRM (bitmovin javascript)',
  description: 'sample AES drm bitmovin javascript drms.test.js',
  method     : 'SAMPLE_AES',
  key        : 'cab5b529ae28d5cc5e3e7bc3fd4a544d',
  iv         : '08eecef4b026deec395234d94218273d',
  keyFileUri : 'path/to/keyfile.key',
  outputs    : [],
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

describe('[DRMs]', () => {
  let inputsClient       = inputs(testConfiguration);
  let encodingsClient    = encodings(testConfiguration);
  let codecConfigsClient = codecConfigurations(testConfiguration);
  let outputsClient      = outputs(testConfiguration);

  const constructEncodingOutput = (outputId) => {
    return {
      outputId  : outputId,
      outputPath: 'path/to/files',
      acl       : [
        {
          scope     : 'string',
          permission: 'PUBLIC_READ'
        }
      ]
    };
  };

  const createInput = () => {
    let input = {
      name       : 'Bitmovin Javascript Sample HTTPS Input',
      description: 'Bitmovin Javascript input.test.js sampleHttpsInput',
      host       : 'websrv.corpnet.local',
      username   : 'john',
      password   : 'correctHorseBatteryStaple',
      customData : {
        myList: ['a', 'b', 'c', 'd'],
        myInt : 1234
      }
    };

    return inputsClient.https.create(input);
  };

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

  const createCodecConfig = () => {
    let sampleH264CodecConfiguration = {
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

    return codecConfigsClient.h264.create(sampleH264CodecConfiguration);
  };

  const createOutput = () => {
    let sampleS3Output = {
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

    return outputsClient.s3.create(sampleS3Output);
  };

  const createStream = (encodingId) => {
    let streamsClient      = undefined;
    let stream             = undefined;
    let inputPromise       = createInput();
    let codecConfigPromise = createCodecConfig();
    let outputPromise      = createOutput();

    let promise = Promise.all([inputPromise, codecConfigPromise, outputPromise]).then((results) => {
      let createdInput = results[0];
      let codecConfig  = results[1];
      let output       = results[2];
      streamsClient    = streams(testConfiguration, encodingId);

      stream = {
        name         : 'Sample Stream',
        description  : 'Bitmovin Javascript streams.test.js sample stream',
        codecConfigId: codecConfig.id,
        inputStreams : [
          {
            inputId      : createdInput.id,
            inputPath    : '/path/to/video/file.mp4',
            selectionMode: 'AUTO'
          }
        ],
        outputs      : [
          {
            outputId  : output.id,
            outputPath: 'path/to/file/destination',
            acl       : [
              {
                scope     : 'string',
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ],
        customData   : {
          myList: ['a', 'b', 'c', 'd'],
          myInt : 1234
        }
      };

      return streamsClient.add(stream);
    });

    return promise;
  };

  const createFmp4Muxing = (encodingId, outputId) => {
    let promise = Promise.resolve(createStream(encodingId)).then((createdStream) => {
      let fmp4Muxing = {
        name           : 'Awesome FMP4',
        description    : 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs        : [
          {
            outputId  : outputId,
            outputPath: 'path/to/file/destination',
            acl       : [
              {
                scope     : 'string',
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ],
        streams        : [
          {
            streamId: createdStream.id
          }
        ],
        segmentLength  : 4,
        initSegmentName: 'init.mp4',
        segmentNaming  : 'seg_%number%.m4s'
      };
      return encodingsClient(encodingId).muxings.fmp4.add(fmp4Muxing);
    }).catch((error) => {
      throw new Error(error);
    });

    return promise;
  };

  const createTsMuxing = (encodingId, outputId) => {
    let promise = Promise.resolve(createStream(encodingId)).then((createdStream) => {
      let tsMuxing = {
        name         : 'Awesome TS',
        description  : 'Bitmovin Javascript TS muxing muxings.test.js',
        outputs      : [
          {
            outputId  : outputId,
            outputPath: 'path/to/file/destination',
            acl       : [
              {
                scope     : 'string',
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ],
        streams      : [
          {
            streamId: createdStream.id
          }
        ],
        segmentLength: 4,
        segmentNaming: 'seg_%number%.m4s'
      };
      return encodingsClient(encodingId).muxings.ts.add(tsMuxing);
    }).catch((error) => {
      throw new Error(error);
    });

    return promise;
  };

  const createMp4Muxing = (encodingId, outputId) => {
    let promise = Promise.resolve(createStream(encodingId)).then((createdStream) => {
      let mp4Muxing = {
        name       : 'Awesome MP4',
        description: 'Bitmovin Javascript MP4 muxing muxings.test.js',
        outputs    : [
          {
            outputId  : outputId,
            outputPath: 'path/to/file/destination',
            acl       : [
              {
                scope     : 'string',
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ],
        streams    : [
          {
            streamId: createdStream.id
          }
        ],
        filename   : 'progressive.mp4'
      };
      return encodingsClient(encodingId).muxings.mp4.add(mp4Muxing);
    }).catch((error) => {
      throw new Error(error);
    });

    return promise;
  };

  it('should list drms of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list drms of TS muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list drms of MP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list drms of MP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createMp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).drms.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });


  it('should add a widevine drm to fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let widevineDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      widevineDrm = {
        ...sampleWidevineDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.widevine.add(widevineDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareWidevineDrms(createdDrm, widevineDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list widevine drms of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.widevine.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get widevine drm details of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let widevineDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      widevineDrm = {
        ...sampleWidevineDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.widevine.add(widevineDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareWidevineDrms(createdDrm, widevineDrm);
      widevineDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.widevine(createdDrm.id).details();
    }).then((details) => {
      compareWidevineDrms(details, widevineDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get widevine drm custom data of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let widevineDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      widevineDrm = {
        ...sampleWidevineDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.widevine.add(widevineDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareWidevineDrms(createdDrm, widevineDrm);
      widevineDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.widevine(createdDrm.id).customData();
    }).then((customDataResponse) => {
      compareWidevineDrms(customDataResponse.customData, sampleWidevineDrm.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete widevine drm of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let widevineDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      widevineDrm = {
        ...sampleWidevineDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.widevine.add(widevineDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareWidevineDrms(createdDrm, widevineDrm);
      widevineDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.widevine(createdDrm.id).delete();
    }).then((response) => {
      assert.equal(response.id, widevineDrm.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should add a playReady drm to fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let playReadyDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      playReadyDrm = {
        ...samplePlayReadyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.playReady.add(playReadyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePlayReadyDrms(createdDrm, playReadyDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list playReady drms of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.playReady.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get playReady drm details of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let playReadyDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      playReadyDrm = {
        ...samplePlayReadyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.playReady.add(playReadyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePlayReadyDrms(createdDrm, playReadyDrm);
      playReadyDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.playReady(createdDrm.id).details();
    }).then((details) => {
      comparePlayReadyDrms(details, playReadyDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get playReady drm custom data of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let playReadyDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      playReadyDrm = {
        ...samplePlayReadyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.playReady.add(playReadyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePlayReadyDrms(createdDrm, playReadyDrm);
      playReadyDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.playReady(createdDrm.id).customData();
    }).then((customDataResponse) => {
      comparePlayReadyDrms(customDataResponse.customData, samplePlayReadyDrm.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete playReady drm of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let playReadyDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      playReadyDrm = {
        ...samplePlayReadyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.playReady.add(playReadyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePlayReadyDrms(createdDrm, playReadyDrm);
      playReadyDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.playReady(createdDrm.id).delete();
    }).then((response) => {
      assert.equal(response.id, playReadyDrm.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should add a primeTime drm to fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let primeTimeDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      primeTimeDrm = {
        ...samplePrimeTimeDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.primeTime.add(primeTimeDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePrimeTimeDrms(createdDrm, primeTimeDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list primeTime drms of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.primeTime.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get primeTime drm details of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let primeTimeDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      primeTimeDrm = {
        ...samplePrimeTimeDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.primeTime.add(primeTimeDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePrimeTimeDrms(createdDrm, primeTimeDrm);
      primeTimeDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.primeTime(createdDrm.id).details();
    }).then((details) => {
      comparePrimeTimeDrms(details, primeTimeDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get primeTime drm custom data of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let primeTimeDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      primeTimeDrm = {
        ...samplePrimeTimeDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.primeTime.add(primeTimeDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePrimeTimeDrms(createdDrm, primeTimeDrm);
      primeTimeDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.primeTime(createdDrm.id).customData();
    }).then((customDataResponse) => {
      comparePrimeTimeDrms(customDataResponse.customData, samplePrimeTimeDrm.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete primeTime drm of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let primeTimeDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      primeTimeDrm = {
        ...samplePrimeTimeDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.primeTime.add(primeTimeDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePrimeTimeDrms(createdDrm, primeTimeDrm);
      primeTimeDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.primeTime(createdDrm.id).delete();
    }).then((response) => {
      assert.equal(response.id, primeTimeDrm.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should add a fairPlay drm to fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let fairPlayDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      fairPlayDrm = {
        ...sampleFairPlayDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.fairPlay.add(fairPlayDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareFairPlayDrms(createdDrm, fairPlayDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list fairPlay drms of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.fairPlay.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get fairPlay drm details of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let fairPlayDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      fairPlayDrm = {
        ...sampleFairPlayDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.fairPlay.add(fairPlayDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareFairPlayDrms(createdDrm, fairPlayDrm);
      fairPlayDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.fairPlay(createdDrm.id).details();
    }).then((details) => {
      compareFairPlayDrms(details, fairPlayDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get fairPlay drm custom data of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let fairPlayDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      fairPlayDrm = {
        ...sampleFairPlayDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.fairPlay.add(fairPlayDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareFairPlayDrms(createdDrm, fairPlayDrm);
      fairPlayDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.fairPlay(createdDrm.id).customData();
    }).then((customDataResponse) => {
      compareFairPlayDrms(customDataResponse.customData, sampleFairPlayDrm.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete fairPlay drm of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let fairPlayDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      fairPlayDrm = {
        ...sampleFairPlayDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.fairPlay.add(fairPlayDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareFairPlayDrms(createdDrm, fairPlayDrm);
      fairPlayDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.fairPlay(createdDrm.id).delete();
    }).then((response) => {
      assert.equal(response.id, fairPlayDrm.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should add a marlin drm to fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let marlinDrm       = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      marlinDrm = {
        ...sampleMarlinDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.marlin.add(marlinDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareMarlinDrms(createdDrm, marlinDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list marlin drms of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.marlin.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get marlin drm details of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let marlinDrm       = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      marlinDrm = {
        ...sampleMarlinDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.marlin.add(marlinDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareMarlinDrms(createdDrm, marlinDrm);
      marlinDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.marlin(createdDrm.id).details();
    }).then((details) => {
      compareMarlinDrms(details, marlinDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get marlin drm custom data of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let marlinDrm       = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      marlinDrm = {
        ...sampleMarlinDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.marlin.add(marlinDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareMarlinDrms(createdDrm, marlinDrm);
      marlinDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.marlin(createdDrm.id).customData();
    }).then((customDataResponse) => {
      compareMarlinDrms(customDataResponse.customData, sampleMarlinDrm.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete marlin drm of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let marlinDrm       = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      marlinDrm = {
        ...sampleMarlinDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.marlin.add(marlinDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareMarlinDrms(createdDrm, marlinDrm);
      marlinDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.marlin(createdDrm.id).delete();
    }).then((response) => {
      assert.equal(response.id, marlinDrm.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should add a clearKey drm to fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let clearKeyDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      clearKeyDrm = {
        ...sampleClearKeyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.clearKey.add(clearKeyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareClearKeyDrms(createdDrm, clearKeyDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list clearKey drms of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.clearKey.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get clearKey drm details of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let clearKeyDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      clearKeyDrm = {
        ...sampleClearKeyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.clearKey.add(clearKeyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareClearKeyDrms(createdDrm, clearKeyDrm);
      clearKeyDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.clearKey(createdDrm.id).details();
    }).then((details) => {
      compareClearKeyDrms(details, clearKeyDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get clearKey drm custom data of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let clearKeyDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      clearKeyDrm = {
        ...sampleClearKeyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.clearKey.add(clearKeyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareClearKeyDrms(createdDrm, clearKeyDrm);
      clearKeyDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.clearKey(createdDrm.id).customData();
    }).then((customDataResponse) => {
      compareClearKeyDrms(customDataResponse.customData, sampleClearKeyDrm.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete clearKey drm of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let clearKeyDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      clearKeyDrm = {
        ...sampleClearKeyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.clearKey.add(clearKeyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareClearKeyDrms(createdDrm, clearKeyDrm);
      clearKeyDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.clearKey(createdDrm.id).delete();
    }).then((response) => {
      assert.equal(response.id, clearKeyDrm.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should add a cenc drm to fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let cencDrm         = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      cencDrm = {
        ...sampleCencDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.cenc.add(cencDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareCencDrms(createdDrm, cencDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list cenc drms of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.cenc.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get cenc drm details of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let cencDrm         = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      cencDrm = {
        ...sampleCencDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.cenc.add(cencDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareCencDrms(createdDrm, cencDrm);
      cencDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.cenc(createdDrm.id).details();
    }).then((details) => {
      compareCencDrms(details, cencDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get cenc drm custom data of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let cencDrm         = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      cencDrm = {
        ...sampleCencDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.cenc.add(cencDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareCencDrms(createdDrm, cencDrm);
      cencDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.cenc(createdDrm.id).customData();
    }).then((customDataResponse) => {
      compareCencDrms(customDataResponse.customData, sampleCencDrm.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete cenc drm of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;
    let cencDrm         = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createFmp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      fmp4Muxing = createdMuxing;

      cencDrm = {
        ...sampleCencDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).drms.cenc.add(cencDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareCencDrms(createdDrm, cencDrm);
      cencDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.fmp4(fmp4Muxing.id).drms.cenc(createdDrm.id).delete();
    }).then((response) => {
      assert.equal(response.id, cencDrm.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should add a fairPlay drm to TS muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;
    let fairPlayDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      tsMuxing = createdMuxing;

      fairPlayDrm = {
        ...sampleFairPlayDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.fairPlay.add(fairPlayDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareFairPlayDrms(createdDrm, fairPlayDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list fairPlay drms of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.fairPlay.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get fairPlay drm details of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;
    let fairPlayDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      tsMuxing = createdMuxing;

      fairPlayDrm = {
        ...sampleFairPlayDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.fairPlay.add(fairPlayDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareFairPlayDrms(createdDrm, fairPlayDrm);
      fairPlayDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.ts(tsMuxing.id).drms.fairPlay(createdDrm.id).details();
    }).then((details) => {
      compareFairPlayDrms(details, fairPlayDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get fairPlay drm custom data of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;
    let fairPlayDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      tsMuxing = createdMuxing;

      fairPlayDrm = {
        ...sampleFairPlayDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.fairPlay.add(fairPlayDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareFairPlayDrms(createdDrm, fairPlayDrm);
      fairPlayDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.ts(tsMuxing.id).drms.fairPlay(createdDrm.id).customData();
    }).then((customDataResponse) => {
      compareFairPlayDrms(customDataResponse.customData, sampleFairPlayDrm.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete fairPlay drm of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;
    let fairPlayDrm     = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      tsMuxing = createdMuxing;

      fairPlayDrm = {
        ...sampleFairPlayDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.fairPlay.add(fairPlayDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareFairPlayDrms(createdDrm, fairPlayDrm);
      fairPlayDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.ts(tsMuxing.id).drms.fairPlay(createdDrm.id).delete();
    }).then((response) => {
      assert.equal(response.id, fairPlayDrm.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should add a aes drm to TS muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;
    let aesDrm          = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      tsMuxing = createdMuxing;

      aesDrm = {
        ...sampleAesDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.aes.add(aesDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareAesDrms(createdDrm, aesDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list aes drms of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.aes.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get aes drm details of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;
    let aesDrm          = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      tsMuxing = createdMuxing;

      aesDrm = {
        ...sampleAesDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.aes.add(aesDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareAesDrms(createdDrm, aesDrm);
      aesDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.ts(tsMuxing.id).drms.aes(createdDrm.id).details();
    }).then((details) => {
      compareAesDrms(details, aesDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get aes drm custom data of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;
    let aesDrm          = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      tsMuxing = createdMuxing;

      aesDrm = {
        ...sampleAesDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.aes.add(aesDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareAesDrms(createdDrm, aesDrm);
      aesDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.ts(tsMuxing.id).drms.aes(createdDrm.id).customData();
    }).then((customDataResponse) => {
      compareAesDrms(customDataResponse.customData, sampleAesDrm.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete aes drm of fMP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;
    let aesDrm          = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createTsMuxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      tsMuxing = createdMuxing;

      aesDrm = {
        ...sampleAesDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).drms.aes.add(aesDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      compareAesDrms(createdDrm, aesDrm);
      aesDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.ts(tsMuxing.id).drms.aes(createdDrm.id).delete();
    }).then((response) => {
      assert.equal(response.id, aesDrm.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should add a playReady drm to MP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let mp4Muxing       = undefined;
    let playReadyDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createMp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      mp4Muxing = createdMuxing;

      playReadyDrm = {
        ...samplePlayReadyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).drms.playReady.add(playReadyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePlayReadyDrms(createdDrm, playReadyDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list playReady drms of MP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createMp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).drms.playReady.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get playReady drm details of MP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let mp4Muxing       = undefined;
    let playReadyDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createMp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      mp4Muxing = createdMuxing;

      playReadyDrm = {
        ...samplePlayReadyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).drms.playReady.add(playReadyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePlayReadyDrms(createdDrm, playReadyDrm);
      playReadyDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.mp4(mp4Muxing.id).drms.playReady(createdDrm.id).details();
    }).then((details) => {
      comparePlayReadyDrms(details, playReadyDrm);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get playReady drm custom data of MP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let mp4Muxing       = undefined;
    let playReadyDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createMp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      mp4Muxing = createdMuxing;

      playReadyDrm = {
        ...samplePlayReadyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).drms.playReady.add(playReadyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePlayReadyDrms(createdDrm, playReadyDrm);
      playReadyDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.mp4(mp4Muxing.id).drms.playReady(createdDrm.id).customData();
    }).then((customDataResponse) => {
      comparePlayReadyDrms(customDataResponse.customData, samplePlayReadyDrm.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete playReady drm of MP4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let mp4Muxing       = undefined;
    let playReadyDrm    = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createMp4Muxing(createdEncoding.id, createdOutput.id);
    }).then((createdMuxing) => {
      mp4Muxing = createdMuxing;

      playReadyDrm = {
        ...samplePlayReadyDrm,
        outputs: [constructEncodingOutput(createdOutput.id)]
      };

      return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).drms.playReady.add(playReadyDrm);
    }).then((createdDrm) => {
      assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
      comparePlayReadyDrms(createdDrm, playReadyDrm);
      playReadyDrm = createdDrm;
      return encodingsClient(createdEncoding.id).muxings.mp4(mp4Muxing.id).drms.playReady(createdDrm.id).delete();
    }).then((response) => {
      assert.equal(response.id, playReadyDrm.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // TODO: [ClearKey@MP4] uncomment that when it's implemented
  /*
   it('should add a clearKey drm to MP4 muxing', (done) => {
   let createdEncoding = undefined;
   let createdOutput = undefined;
   let mp4Muxing = undefined;
   let clearKeyDrm = undefined;

   let encodingPromise = createEncoding();
   let outputPromise = createOutput();

   Promise.all([encodingPromise, outputPromise]).then((results) => {
   createdEncoding = results[0];
   createdOutput = results[1];
   return createMp4Muxing(createdEncoding.id, createdOutput.id);
   }).then((createdMuxing) => {
   mp4Muxing = createdMuxing;

   clearKeyDrm = {
   ...sampleClearKeyDrm,
   outputs: [ constructEncodingOutput(createdOutput.id) ]
   };

   return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).drms.clearKey.add(clearKeyDrm);
   }).then((createdDrm) => {
   assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
   compareClearKeyDrms(createdDrm, clearKeyDrm);
   done();
   }).catch((error) => {
   done(new Error(error));
   });
   });

   it('should list clearKey drms of MP4 muxing', (done) => {
   let createdEncoding = undefined;
   let createdOutput = undefined;

   let encodingPromise = createEncoding();
   let outputPromise = createOutput();

   Promise.all([encodingPromise, outputPromise]).then((results) => {
   createdEncoding = results[0];
   createdOutput = results[1];
   return createMp4Muxing(createdEncoding.id, createdOutput.id);
   }).then((createdMuxing) => {
   return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).drms.clearKey.list();
   }).then((response) => {
   assert((response.totalCount !== null) && response.totalCount !== undefined);
   assert((response.items !== null) && response.items !== undefined);
   done();
   }).catch((error) => {
   done(new Error(error));
   });
   });

   it('should get clearKey drm details of MP4 muxing', (done) => {
   let createdEncoding = undefined;
   let createdOutput = undefined;
   let mp4Muxing = undefined;
   let clearKeyDrm = undefined;

   let encodingPromise = createEncoding();
   let outputPromise = createOutput();

   Promise.all([encodingPromise, outputPromise]).then((results) => {
   createdEncoding = results[0];
   createdOutput = results[1];
   return createMp4Muxing(createdEncoding.id, createdOutput.id);
   }).then((createdMuxing) => {
   mp4Muxing = createdMuxing;

   clearKeyDrm = {
   ...sampleClearKeyDrm,
   outputs: [ constructEncodingOutput(createdOutput.id) ]
   };

   return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).drms.clearKey.add(clearKeyDrm);
   }).then((createdDrm) => {
   assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
   compareClearKeyDrms(createdDrm, clearKeyDrm);
   clearKeyDrm = createdDrm;
   return encodingsClient(createdEncoding.id).muxings.mp4(mp4Muxing.id).drms.clearKey(createdDrm.id).details();
   }).then((details) => {
   compareClearKeyDrms(details, clearKeyDrm);
   done();
   }).catch((error) => {
   done(new Error(error));
   });
   });

   it('should get clearKey drm custom data of MP4 muxing', (done) => {
   let createdEncoding = undefined;
   let createdOutput = undefined;
   let mp4Muxing = undefined;
   let clearKeyDrm = undefined;

   let encodingPromise = createEncoding();
   let outputPromise = createOutput();

   Promise.all([encodingPromise, outputPromise]).then((results) => {
   createdEncoding = results[0];
   createdOutput = results[1];
   return createMp4Muxing(createdEncoding.id, createdOutput.id);
   }).then((createdMuxing) => {
   mp4Muxing = createdMuxing;

   clearKeyDrm = {
   ...sampleClearKeyDrm,
   outputs: [ constructEncodingOutput(createdOutput.id) ]
   };

   return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).drms.clearKey.add(clearKeyDrm);
   }).then((createdDrm) => {
   assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
   compareClearKeyDrms(createdDrm, clearKeyDrm);
   clearKeyDrm = createdDrm;
   return encodingsClient(createdEncoding.id).muxings.mp4(mp4Muxing.id).drms.clearKey(createdDrm.id).customData();
   }).then((customDataResponse) => {
   compareClearKeyDrms(customDataResponse.customData, sampleClearKeyDrm.customData);
   done();
   }).catch((error) => {
   done(new Error(error));
   });
   });

   it('should delete clearKey drm of MP4 muxing', (done) => {
   let createdEncoding = undefined;
   let createdOutput = undefined;
   let mp4Muxing = undefined;
   let clearKeyDrm = undefined;

   let encodingPromise = createEncoding();
   let outputPromise = createOutput();

   Promise.all([encodingPromise, outputPromise]).then((results) => {
   createdEncoding = results[0];
   createdOutput = results[1];
   return createMp4Muxing(createdEncoding.id, createdOutput.id);
   }).then((createdMuxing) => {
   mp4Muxing = createdMuxing;

   clearKeyDrm = {
   ...sampleClearKeyDrm,
   outputs: [ constructEncodingOutput(createdOutput.id) ]
   };

   return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).drms.clearKey.add(clearKeyDrm);
   }).then((createdDrm) => {
   assert((createdDrm.id !== null) && createdDrm.id !== undefined && createdDrm !== '');
   compareClearKeyDrms(createdDrm, clearKeyDrm);
   clearKeyDrm = createdDrm;
   return encodingsClient(createdEncoding.id).muxings.mp4(mp4Muxing.id).drms.clearKey(createdDrm.id).delete();
   }).then((response) => {
   assert.equal(response.id, clearKeyDrm.id);
   done();
   }).catch((error) => {
   done(new Error(error));
   });
   });
   */

  const compareDrms = (drmOne, drmTwo) => {
    assert.equal(drmOne.name, drmTwo.name);
    assert.equal(drmOne.description, drmTwo.description);
    assert.deepEqual(drmOne.outputs, drmTwo.outputs);
  };

  const compareWidevineDrms = (drmOne, drmTwo) => {
    compareDrms(drmOne, drmTwo);
    assert.equal(drmOne.key, drmTwo.key);
    assert.equal(drmOne.kid, drmTwo.kid);
    assert.equal(drmOne.pssh, drmTwo.pssh);
  };

  const comparePlayReadyDrms = (drmOne, drmTwo) => {
    compareDrms(drmOne, drmTwo);
    assert.equal(drmOne.keySeed, drmTwo.keySeed);
    assert.equal(drmOne.kid, drmTwo.kid);
    assert.equal(drmOne.laUrl, drmTwo.laUrl);
    assert.equal(drmOne.method, drmTwo.method);
  };

  const comparePrimeTimeDrms = (drmOne, drmTwo) => {
    compareDrms(drmOne, drmTwo);
    assert.equal(drmOne.key, drmTwo.key);
    assert.equal(drmOne.kid, drmTwo.kid);
    assert.equal(drmOne.pssh, drmTwo.pssh);
  };

  const compareFairPlayDrms = (drmOne, drmTwo) => {
    compareDrms(drmOne, drmTwo);
    assert.equal(drmOne.key, drmTwo.key);
    assert.equal(drmOne.iv, drmTwo.iv);
    assert.equal(drmOne.uri, drmTwo.uri);
  };

  const compareMarlinDrms = (drmOne, drmTwo) => {
    compareDrms(drmOne, drmTwo);
    assert.equal(drmOne.key, drmTwo.key);
    assert.equal(drmOne.kid, drmTwo.kid);
  };

  const compareClearKeyDrms = (drmOne, drmTwo) => {
    compareDrms(drmOne, drmTwo);
    assert.equal(drmOne.key, drmTwo.key);
    assert.equal(drmOne.kid, drmTwo.kid);
  };

  const compareAesDrms = (drmOne, drmTwo) => {
    compareDrms(drmOne, drmTwo);
    assert.equal(drmOne.method, drmTwo.method);
    assert.equal(drmOne.key, drmTwo.key);
    assert.equal(drmOne.iv, drmTwo.iv);
    assert.equal(drmOne.keyFileUri, drmTwo.keyFileUri);
  };

  const compareCencDrms = (drmOne, drmTwo) => {
    compareDrms(drmOne, drmTwo);
    assert.equal(drmOne.key, drmTwo.key);
    assert.equal(drmOne.kid, drmTwo.kid);
    assert.deepEqual(drmOne.widevine, drmTwo.widevine);
    assert.deepEqual(drmOne.playReady, drmTwo.playReady);
    assert.deepEqual(drmOne.marlin, drmTwo.marlin);
  };
});