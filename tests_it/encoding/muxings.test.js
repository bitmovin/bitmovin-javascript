import assert from 'assert';

import {getConfiguration} from '../utils';
import encodings from '../../bitmovin/encoding/encodings';
import streams from '../../bitmovin/encoding/streams';
import inputs from '../../bitmovin/encoding/inputs';
import codecConfigurations from '../../bitmovin/encoding/codecConfigurations';
import outputs from '../../bitmovin/encoding/outputs';

let testConfiguration = getConfiguration();

describe('[Muxings]', () => {
  let inputsClient       = inputs(testConfiguration);
  let encodingsClient    = encodings(testConfiguration);
  let codecConfigsClient = codecConfigurations(testConfiguration);
  let outputsClient      = outputs(testConfiguration);

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

  it('should add a fmp4 muxing to an encoding', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      fmp4Muxing = {
        name           : 'Awesome FMP4',
        description    : 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs        : [
          {
            outputId  : createdOutput.id,
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
      return encodingsClient(createdEncoding.id).muxings.fmp4.add(fmp4Muxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareFmp4Muxings(createdMuxing, fmp4Muxing);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of fmp4 muxings', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      return encodingsClient(createdEncoding.id).muxings.fmp4.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return fmp4 muxing details', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      fmp4Muxing = {
        name           : 'Awesome FMP4',
        description    : 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs        : [
          {
            outputId  : createdOutput.id,
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
      return encodingsClient(createdEncoding.id).muxings.fmp4.add(fmp4Muxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareFmp4Muxings(createdMuxing, fmp4Muxing);
      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).details();
    }).then((muxingDetails) => {
      compareFmp4Muxings(muxingDetails, fmp4Muxing);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return custom data of fmp4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      fmp4Muxing = {
        name           : 'Awesome FMP4',
        description    : 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs        : [
          {
            outputId  : createdOutput.id,
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
        segmentNaming  : 'seg_%number%.m4s',
        customData     : {
          myList: ['a', 'b', 'c', 'd'],
          myInt : 1234
        }
      };
      return encodingsClient(createdEncoding.id).muxings.fmp4.add(fmp4Muxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareFmp4Muxings(createdMuxing, fmp4Muxing);
      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, fmp4Muxing.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // NOT YET IMPLEMENTED IN ERS
  it.skip('should delete a fmp4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let fmp4Muxing      = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      fmp4Muxing = {
        name           : 'Awesome FMP4',
        description    : 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs        : [
          {
            outputId  : createdOutput.id,
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
        segmentNaming  : 'seg_%number%.m4s',
        customData     : {
          myList: ['a', 'b', 'c', 'd'],
          myInt : 1234
        }
      };
      return encodingsClient(createdEncoding.id).muxings.fmp4.add(fmp4Muxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareFmp4Muxings(createdMuxing, fmp4Muxing);
      fmp4Muxing = createdMuxing;
      return encodingsClient(createdEncoding.id).muxings.fmp4(createdMuxing.id).delete();
    }).then((response) => {
      assert.equal(response.id, fmp4Muxing.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });


  it('should add a ts muxing to an encoding', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      tsMuxing = {
        name         : 'Awesome FMP4',
        description  : 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs      : [
          {
            outputId  : createdOutput.id,
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
      return encodingsClient(createdEncoding.id).muxings.fmp4.add(tsMuxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareTsMuxings(createdMuxing, tsMuxing);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of fmp4 muxings', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      return encodingsClient(createdEncoding.id).muxings.ts.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return ts muxing details', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      tsMuxing = {
        name         : 'Awesome FMP4',
        description  : 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs      : [
          {
            outputId  : createdOutput.id,
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
      return encodingsClient(createdEncoding.id).muxings.ts.add(tsMuxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareTsMuxings(createdMuxing, tsMuxing);
      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).details();
    }).then((muxingDetails) => {
      compareTsMuxings(muxingDetails, tsMuxing);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return custom data of ts muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      tsMuxing = {
        name         : 'Awesome FMP4',
        description  : 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs      : [
          {
            outputId  : createdOutput.id,
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
        segmentNaming: 'seg_%number%.m4s',
        customData   : {
          myList: ['a', 'b', 'c', 'd'],
          myInt : 1234
        }
      };
      return encodingsClient(createdEncoding.id).muxings.ts.add(tsMuxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareTsMuxings(createdMuxing, tsMuxing);
      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, tsMuxing.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // NOT YET IMPLEMENTED IN ERS
  it.skip('should delete a ts muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let tsMuxing        = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      tsMuxing = {
        name         : 'Awesome FMP4',
        description  : 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs      : [
          {
            outputId  : createdOutput.id,
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
        segmentNaming: 'seg_%number%.m4s',
        customData   : {
          myList: ['a', 'b', 'c', 'd'],
          myInt : 1234
        }
      };
      return encodingsClient(createdEncoding.id).muxings.ts.add(tsMuxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareTsMuxings(createdMuxing, tsMuxing);
      tsMuxing = createdMuxing;
      return encodingsClient(createdEncoding.id).muxings.ts(createdMuxing.id).delete();
    }).then((response) => {
      assert.equal(response.id, tsMuxing.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });


  it('should add a mp4 muxing to an encoding', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let mp4Muxing       = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      mp4Muxing = {
        name       : 'Awesome FMP4',
        description: 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs    : [
          {
            outputId  : createdOutput.id,
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
        filename   : 'myProgressive.mp4'
      };
      return encodingsClient(createdEncoding.id).muxings.mp4.add(mp4Muxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareMp4Muxings(createdMuxing, mp4Muxing);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of mp4 muxings', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      return encodingsClient(createdEncoding.id).muxings.mp4.list();
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return mp4 muxing details', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let mp4Muxing       = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      mp4Muxing = {
        name       : 'Awesome FMP4',
        description: 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs    : [
          {
            outputId  : createdOutput.id,
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
        filename   : 'myProgressive.mp4'
      };
      return encodingsClient(createdEncoding.id).muxings.mp4.add(mp4Muxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareMp4Muxings(createdMuxing, mp4Muxing);
      return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).details();
    }).then((muxingDetails) => {
      compareMp4Muxings(muxingDetails, mp4Muxing);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return custom data of mp4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let mp4Muxing       = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      mp4Muxing = {
        name       : 'Awesome FMP4',
        description: 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs    : [
          {
            outputId  : createdOutput.id,
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
        filename   : 'myProgressive.mp4',
        customData : {
          myList: ['a', 'b', 'c', 'd'],
          myInt : 1234
        }
      };
      return encodingsClient(createdEncoding.id).muxings.mp4.add(mp4Muxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareMp4Muxings(createdMuxing, mp4Muxing);
      return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, mp4Muxing.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // NOT YET IMPLEMENTED IN ERS
  it.skip('should delete a mp4 muxing', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let mp4Muxing       = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      mp4Muxing = {
        name       : 'Awesome FMP4',
        description: 'Bitmovin Javascript fmp4 muxing muxings.test.js',
        outputs    : [
          {
            outputId  : createdOutput.id,
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
        filename   : 'myProgressive.mp4',
        customData : {
          myList: ['a', 'b', 'c', 'd'],
          myInt : 1234
        }
      };
      return encodingsClient(createdEncoding.id).muxings.mp4.add(mp4Muxing);
    }).then((createdMuxing) => {
      assert((createdMuxing.id !== null) && createdMuxing.id !== undefined && createdMuxing !== '');
      compareMp4Muxings(createdMuxing, mp4Muxing);
      mp4Muxing = createdMuxing;
      return encodingsClient(createdEncoding.id).muxings.mp4(createdMuxing.id).delete();
    }).then((response) => {
      assert.equal(response.id, mp4Muxing.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });


  const compareMuxings = (muxingOne, muxingTwo) => {
    assert.equal(muxingOne.name, muxingTwo.name);
    assert.equal(muxingOne.description, muxingTwo.description);
    assert.deepEqual(muxingOne.streams, muxingTwo.streams);
    assert.deepEqual(muxingOne.outputs, muxingTwo.outputs);
  };

  const compareFmp4Muxings = (muxingOne, muxingTwo) => {
    compareMuxings(muxingOne, muxingTwo);
    assert.equal(muxingOne.segmentLength, muxingTwo.segmentLength);
    assert.equal(muxingOne.initSegmentName, muxingTwo.initSegmentName);
    assert.equal(muxingOne.segmentNaming, muxingTwo.segmentNaming);
  };

  const compareTsMuxings = (muxingOne, muxingTwo) => {
    compareMuxings(muxingOne, muxingTwo);
    assert.equal(muxingOne.segmentLength, muxingTwo.segmentLength);
    assert.equal(muxingOne.segmentNaming, muxingTwo.segmentNaming);
  };

  const compareMp4Muxings = (muxingOne, muxingTwo) => {
    compareMuxings(muxingOne, muxingTwo);
    assert.equal(muxingOne.filename, muxingTwo.filename);
    assert.equal(muxingOne.fragmentDuration, muxingTwo.fragmentDuration);
  };
});