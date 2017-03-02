import {after, before, describe, it} from 'mocha';
import assert from 'assert';

import {getConfiguration} from '../utils';
import encodings from '../../bitmovin/encoding/encodings';
import streams from '../../bitmovin/encoding/streams';
import inputs from '../../bitmovin/encoding/inputs';
import filters from '../../bitmovin/encoding/filters';
import codecConfigurations from '../../bitmovin/encoding/codecConfigurations';
import outputs from '../../bitmovin/encoding/outputs';

let testConfiguration = getConfiguration();

describe('[Streams]', () => {
  let inputsClient       = inputs(testConfiguration);
  let encodingsClient    = encodings(testConfiguration);
  let codecConfigsClient = codecConfigurations(testConfiguration);
  let outputsClient      = outputs(testConfiguration);
  let filtersClient      = filters(testConfiguration);

  const createCropFilter = () => {
    const sampleCropFilter = {
      name       : 'Sample Crop Filter',
      description: 'bitmovin-javascript sample crop filter filters.test.js',
      left       : 10,
      top        : 10,
      customData : {
        myList: ['a', 'b', 'c', 'd'],
        myInt : 1234
      }
    };

    return filtersClient.crop.create(sampleCropFilter);
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

  it('should add a stream to an encoding', (done) => {
    let streamsClient      = undefined;
    let stream             = undefined;
    let inputPromise       = createInput();
    let encodingPromise    = createEncoding();
    let codecConfigPromise = createCodecConfig();
    let outputPromise      = createOutput();

    Promise.all([inputPromise, encodingPromise, codecConfigPromise, outputPromise]).then((results) => {
      let createdInput    = results[0];
      let createdEncoding = results[1];
      let codecConfig     = results[2];
      let output          = results[3];
      streamsClient       = streams(testConfiguration, createdEncoding.id);

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
    }).then((createdStream) => {
      compareStreams(createdStream, stream);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of streams', (done) => {
    let streamsClient   = undefined;
    let encodingPromise = createEncoding();

    encodingPromise.then((createdEncoding) => {
      streamsClient = streams(testConfiguration, createdEncoding.id);
      return streamsClient.list(5);
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return stream details', (done) => {
    let streamsClient      = undefined;
    let stream             = undefined;
    let inputPromise       = createInput();
    let encodingPromise    = createEncoding();
    let codecConfigPromise = createCodecConfig();
    let outputPromise      = createOutput();

    Promise.all([inputPromise, encodingPromise, codecConfigPromise, outputPromise]).then((results) => {
      let createdInput    = results[0];
      let createdEncoding = results[1];
      let codecConfig     = results[2];
      let output          = results[3];
      streamsClient       = streams(testConfiguration, createdEncoding.id);

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
    }).then((createdStream) => {
      compareStreams(createdStream, stream);
      return streamsClient(createdStream.id).details();
    }).then((streamDetails) => {
      compareStreams(streamDetails, stream);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return custom data of stream', (done) => {
    let streamsClient      = undefined;
    let stream             = undefined;
    let inputPromise       = createInput();
    let encodingPromise    = createEncoding();
    let codecConfigPromise = createCodecConfig();
    let outputPromise      = createOutput();

    Promise.all([inputPromise, encodingPromise, codecConfigPromise, outputPromise]).then((results) => {
      let createdInput    = results[0];
      let createdEncoding = results[1];
      let codecConfig     = results[2];
      let output          = results[3];
      streamsClient       = streams(testConfiguration, createdEncoding.id);

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
    }).then((createdStream) => {
      compareStreams(createdStream, stream);
      return streamsClient(createdStream.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, stream.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete a stream', (done) => {
    let streamsClient      = undefined;
    let stream             = undefined;
    let inputPromise       = createInput();
    let encodingPromise    = createEncoding();
    let codecConfigPromise = createCodecConfig();
    let outputPromise      = createOutput();

    Promise.all([inputPromise, encodingPromise, codecConfigPromise, outputPromise]).then((results) => {
      let createdInput    = results[0];
      let createdEncoding = results[1];
      let codecConfig     = results[2];
      let output          = results[3];
      streamsClient       = streams(testConfiguration, createdEncoding.id);

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
    }).then((createdStream) => {
      compareStreams(createdStream, stream);
      stream = createdStream;
      return streamsClient(createdStream.id).delete();
    }).then((response) => {
      assert.equal(response.id, stream.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it.skip('should return the inputDetails of a stream', (done) => {
    done(new Error('TODO'));
  });

  it('should add a crop filter to a stream', (done) => {
    let createdCropFilter  = undefined;
    let streamsClient      = undefined;
    let stream             = undefined;
    let inputPromise       = createInput();
    let encodingPromise    = createEncoding();
    let codecConfigPromise = createCodecConfig();
    let outputPromise      = createOutput();
    let cropFilterPromise  = createCropFilter();

    Promise.all([inputPromise, encodingPromise, codecConfigPromise, outputPromise, cropFilterPromise])
    .then((results) => {
      let createdInput    = results[0];
      let createdEncoding = results[1];
      let codecConfig     = results[2];
      let output          = results[3];
      createdCropFilter   = results[4];
      streamsClient       = streams(testConfiguration, createdEncoding.id);

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
    }).then((createdStream) => {
      compareStreams(createdStream, stream);
      return streamsClient(createdStream.id).filters.add([{
        position: 0,
        id      : createdCropFilter.id
      }]);
    }).then((createdFilterResponse) => {
      assert.deepEqual(createdFilterResponse.filters, [{
        position: 0,
        id      : createdCropFilter.id
      }]);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list crop filters for a stream', (done) => {
    let createdCropFilter  = undefined;
    let streamsClient      = undefined;
    let stream             = undefined;
    let inputPromise       = createInput();
    let encodingPromise    = createEncoding();
    let codecConfigPromise = createCodecConfig();
    let outputPromise      = createOutput();
    let cropFilterPromise  = createCropFilter();

    Promise.all([inputPromise, encodingPromise, codecConfigPromise, outputPromise, cropFilterPromise])
    .then((results) => {
      let createdInput    = results[0];
      let createdEncoding = results[1];
      let codecConfig     = results[2];
      let output          = results[3];
      createdCropFilter   = results[4];
      streamsClient       = streams(testConfiguration, createdEncoding.id);

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
    }).then((createdStream) => {
      compareStreams(createdStream, stream);
      return streamsClient(createdStream.id).filters.list();
    }).then((response) => {
      // TODO!
      //assert((response.totalCount !== null) && response.totalCount !== undefined);
      //assert((response.items !== null) && response.items !== undefined);
      assert((response.filters !== null) && response.filters !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete all filters from a stream', (done) => {
    let createdCropFilter  = undefined;
    let streamsClient      = undefined;
    let stream             = undefined;
    let inputPromise       = createInput();
    let encodingPromise    = createEncoding();
    let codecConfigPromise = createCodecConfig();
    let outputPromise      = createOutput();
    let cropFilterPromise  = createCropFilter();

    Promise.all([inputPromise, encodingPromise, codecConfigPromise, outputPromise, cropFilterPromise])
    .then((results) => {
      let createdInput    = results[0];
      let createdEncoding = results[1];
      let codecConfig     = results[2];
      let output          = results[3];
      createdCropFilter   = results[4];
      streamsClient       = streams(testConfiguration, createdEncoding.id);

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
    }).then((createdStream) => {
      compareStreams(createdStream, stream);
      stream = createdStream;
      return streamsClient(createdStream.id).filters.add([{
        position: 0,
        id      : createdCropFilter.id
      }]);
    }).then((createdFilterResponse) => {
      assert.deepEqual(createdFilterResponse.filters, [{
        position: 0,
        id      : createdCropFilter.id
      }]);
      return streamsClient(stream.id).filters.list();
    }).then((response) => {
      assert.equal(response.filters.length, 1);
      return streamsClient(stream.id).filters.deleteAll();
    }).then((filtersDeletedResponse) => {
      console.log(filtersDeletedResponse);
      assert.equal(filtersDeletedResponse[0].id, createdCropFilter.id);
      return streamsClient(stream.id).filters.list();
    }).then((response) => {
      assert.equal(response.filters.length, 0);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it.skip('should delete a specific filter from a stream', (done) => {
    let createdCropFilter  = undefined;
    let streamsClient      = undefined;
    let stream             = undefined;
    let inputPromise       = createInput();
    let encodingPromise    = createEncoding();
    let codecConfigPromise = createCodecConfig();
    let outputPromise      = createOutput();
    let cropFilterPromise  = createCropFilter();

    Promise.all([inputPromise, encodingPromise, codecConfigPromise, outputPromise, cropFilterPromise])
    .then((results) => {
      let createdInput    = results[0];
      let createdEncoding = results[1];
      let codecConfig     = results[2];
      let output          = results[3];
      createdCropFilter   = results[4];
      streamsClient       = streams(testConfiguration, createdEncoding.id);

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
    }).then((createdStream) => {
      compareStreams(createdStream, stream);
      stream = createdStream;
      return streamsClient(createdStream.id).filters.add([{
        position: 0,
        id      : createdCropFilter.id
      }]);
    }).then((createdFilterResponse) => {
      assert.deepEqual(createdFilterResponse.filters, [{
        position: 0,
        id      : createdCropFilter.id
      }]);
      return streamsClient(stream.id).filters.list();
    }).then((response) => {
      assert.equal(response.filters.length, 1);
      return streamsClient(stream.id).filters(createdCropFilter.id).delete();
    }).then((filtersDeletedResponse) => {
      console.log(filtersDeletedResponse);
      assert.equal(filtersDeletedResponse.id, createdCropFilter.id);
      return streamsClient(stream.id).filters.list();
    }).then((response) => {
      assert.equal(response.filters.length, 0);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  const compareStreams = (streamOne, streamTwo) => {
    assert.equal(streamOne.name, streamTwo.name);
    assert.equal(streamOne.description, streamTwo.description);
    assert.deepEqual(streamOne.inputStreams, streamTwo.inputStreams);
    assert.equal(streamOne.codecConfigId, streamTwo.codecConfigId);
    assert.deepEqual(streamOne.outputs, streamTwo.outputs);
  };
});