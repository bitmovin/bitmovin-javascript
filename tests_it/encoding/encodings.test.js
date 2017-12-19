import assert from 'assert';

import {getConfiguration} from '../utils';
import encodings from '../../bitmovin/encoding/encodings/encodings';
import inputs from '../../bitmovin/encoding/inputs';
import codecConfigurations from '../../bitmovin/encoding/codecConfigurations';
import outputs from '../../bitmovin/encoding/outputs';
import streams from '../../bitmovin/encoding/encodings/streams';
import muxings from '../../bitmovin/encoding/encodings/muxings';

let testConfiguration = getConfiguration();

describe('[Encodings]', () => {
  let encodingsClient = encodings(testConfiguration);

  it('should return a list of encodings', (done) => {
    encodingsClient.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.previous !== null) && response.previous !== undefined);
      assert((response.next !== null) && response.next !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of encodings sorted by created at asc', (done) => {
    const sort = 'createdAt:asc';

    const isSortedAsc = (array) => {
      for (let i = 0; i < array.length; i++) {
        if (array[i] > array[i+1])
          return false;
      }
      return true;
    };

    encodingsClient.list(10, 0, sort).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.previous !== null) && response.previous !== undefined);
      assert((response.next !== null) && response.next !== undefined);
      assert((response.items !== null) && response.items !== undefined);

      assert.equal(isSortedAsc(response.items), true);

      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create an encoding', (done) => {
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

    encodingsClient.create(encoding).then((createdEncoding) => {
      assert((createdEncoding.id !== null) && createdEncoding.id !== undefined && createdEncoding !== '');
      compareEncodings(createdEncoding, encoding);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get details of an encoding', (done) => {
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

    encodingsClient.create(encoding).then((createdEncoding) => {
      assert((createdEncoding.id !== null) && createdEncoding.id !== undefined && createdEncoding !== '');
      return encodingsClient(createdEncoding.id).details();
    }).then((details) => {
      compareEncodings(details, encoding);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get custom data of an encoding', (done) => {
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

    encodingsClient.create(encoding).then((createdEncoding) => {
      assert((createdEncoding.id !== null) && createdEncoding.id !== undefined && createdEncoding !== '');
      return encodingsClient(createdEncoding.id).customData();
    }).then((customData) => {
      assert.deepEqual(customData.customData, encoding.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete an encoding', (done) => {
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

    let createdEncodingId = undefined;

    encodingsClient.create(encoding).then((createdEncoding) => {
      assert((createdEncoding.id !== null) && createdEncoding.id !== undefined && createdEncoding !== '');
      createdEncodingId = createdEncoding.id;
      return encodingsClient(createdEncoding.id).delete();
    }).then((response) => {
      assert.equal(createdEncodingId, response.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  const compareEncodings = (encodingOne, encodingTwo) => {
    assert.equal(encodingOne.name, encodingTwo.name);
    assert.equal(encodingOne.description, encodingTwo.description);
    assert.equal(encodingOne.encoderVersion, encodingTwo.encoderVersion);
    assert.equal(encodingOne.cloudRegion, encodingTwo.cloudRegion);
  };
});

describe('[Encoding Control]', () => {
  let encodingsClient           = encodings(testConfiguration);
  let inputsClient              = inputs(testConfiguration);
  let outputsClient             = outputs(testConfiguration);
  let codecConfigurationsClient = codecConfigurations(testConfiguration);

  let encodingResource    = undefined;
  let inputResource       = undefined;
  let outputResource      = undefined;
  let codecConfigResource = undefined;
  let streamResource      = undefined;
  let muxingResource      = undefined;

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
            "streamId": streamResource.id
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
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should start an encoding', (done) => {
    encodingsClient(encodingResource.id).start().then((result) => {
      assert.equal(result.id, encodingResource.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should stop an encoding', (done) => {
    encodingsClient(encodingResource.id).stop().then((result) => {
      assert.equal(result.id, encodingResource.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get the status of an encoding', (done) => {
    encodingsClient(encodingResource.id).status().then((result) => {
      const states = ['CREATED', 'QUEUED', 'RUNNING', 'FINISHED', 'ERROR'];
      assert(states.includes(result.status));
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
});

describe('[Live Encoding Control]', () => {
  let encodingsClient           = encodings(testConfiguration);
  let inputsClient              = inputs(testConfiguration);
  let outputsClient             = outputs(testConfiguration);
  let codecConfigurationsClient = codecConfigurations(testConfiguration);

  let encodingResource    = undefined;
  let inputResource       = undefined;
  let outputResource      = undefined;
  let codecConfigResource = undefined;
  let streamResource      = undefined;
  let muxingResource      = undefined;

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

  const getLiveInput = () => {
    return inputsClient.rtmp.list(1);
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

  beforeAll((done) => {
    let encodingPromise    = createEncoding();
    let inputPromise       = getLiveInput();
    let outputPromise      = createOutput();
    let codecConfigPromise = createCodecConfiguration();

    Promise.all([encodingPromise, inputPromise, outputPromise, codecConfigPromise]).then((results) => {
      encodingResource    = results[0];
      inputResource       = results[1].items[0];
      outputResource      = results[2];
      codecConfigResource = results[3];

      let streamsClient = streams(testConfiguration, encodingResource.id);
      let stream        = {
        name         : 'Bitmovin JS sample stream',
        codecConfigId: codecConfigResource.id,
        inputStreams : [
          {
            inputId      : inputResource.id,
            inputPath    : 'live',
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
            "streamId": streamResource.id
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
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  let stopLive = (encodingId) => {
    Promise.resolve(encodingsClient(encodingId).stopLive());
  };

  it.skip('should start a live encoding', (done) => {
    const liveSettings = {
      streamKey: 'myAwesomeKey'
    };
    encodingsClient(encodingResource.id).startLive(liveSettings).then((result) => {
      assert.equal(result.id, encodingResource.id);
      stopLive(encodingResource.id);
      done();
    }).catch((error) => {
      stopLive(encodingResource.id);
      done(new Error(error));
    });
  });

  it('should stop a live encoding', (done) => {
    const liveSettings = {
      streamKey: 'myAwesomeKey'
    };
    encodingsClient(encodingResource.id).stop(liveSettings).then((result) => {
      assert.equal(result.id, encodingResource.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
});
