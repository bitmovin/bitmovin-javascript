import {after, before, describe, it} from 'mocha';
import assert from 'assert';

import {getConfiguration} from '../utils';
import encodings from '../../bitmovin/encoding/encodings';
import streams from '../../bitmovin/encoding/streams';
import inputs from '../../bitmovin/encoding/inputs';
import codecConfigurations from '../../bitmovin/encoding/codecConfigurations';
import outputs from '../../bitmovin/encoding/outputs';

let testConfiguration = getConfiguration();

let sampleThumbnail = {
  name       : 'Sample Thumbnail Bitmovin JS',
  description: 'Sample Thumbnail bitmovin-javascript thumbnails.test.js',
  height     : 320,
  positions  : [1, 2, 20],
  pattern    : 'thumbnail-%number%.png',
  outputs    : [],
  customData : {
    myList: ['a', 'b', 'c', 'd'],
    myInt : 1234
  }
};

describe('[Thumbnails]', () => {
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

  it('should add a thumbnail muxing to a stream', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      sampleThumbnail.outputs = [
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
      ];

      return encodingsClient(createdEncoding.id).streams(createdStream.id).thumbnails.add(sampleThumbnail);
    }).then((createdThumbnail) => {
      assert((createdThumbnail.id !== null) && createdThumbnail.id !== undefined && createdThumbnail !== '');
      compareThumbnails(createdThumbnail, sampleThumbnail);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of thumbnails', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((createdStream) => {
      return encodingsClient(createdEncoding.id).streams(createdStream.id).thumbnails.list(5);
    }).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return thumbnail details', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let createdStream   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((stream) => {
      createdStream           = stream;
      sampleThumbnail.outputs = [
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
      ];

      return encodingsClient(createdEncoding.id).streams(createdStream.id).thumbnails.add(sampleThumbnail);
    }).then((createdThumbnail) => {
      assert((createdThumbnail.id !== null) && createdThumbnail.id !== undefined && createdThumbnail !== '');
      compareThumbnails(createdThumbnail, sampleThumbnail);
      return encodingsClient(createdEncoding.id).streams(createdStream.id).thumbnails(createdThumbnail.id).details();
    }).then((details) => {
      compareThumbnails(details, sampleThumbnail);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return custom data of thumbnail', (done) => {
    let createdEncoding = undefined;
    let createdOutput   = undefined;
    let createdStream   = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((stream) => {
      createdStream           = stream;
      sampleThumbnail.outputs = [
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
      ];

      return encodingsClient(createdEncoding.id).streams(createdStream.id).thumbnails.add(sampleThumbnail);
    }).then((createdThumbnail) => {
      assert((createdThumbnail.id !== null) && createdThumbnail.id !== undefined && createdThumbnail !== '');
      compareThumbnails(createdThumbnail, sampleThumbnail);
      return encodingsClient(createdEncoding.id).streams(createdStream.id).thumbnails(createdThumbnail.id).customData();
    }).then((customDataResponse) => {
      assert.deepEqual(customDataResponse.customData, sampleThumbnail.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete a thumbnail', (done) => {
    let createdEncoding  = undefined;
    let createdOutput    = undefined;
    let createdStream    = undefined;
    let createdThumbnail = undefined;

    let encodingPromise = createEncoding();
    let outputPromise   = createOutput();

    Promise.all([encodingPromise, outputPromise]).then((results) => {
      createdEncoding = results[0];
      createdOutput   = results[1];
      return createStream(createdEncoding.id);
    }).then((stream) => {
      createdStream           = stream;
      sampleThumbnail.outputs = [
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
      ];

      return encodingsClient(createdEncoding.id).streams(createdStream.id).thumbnails.add(sampleThumbnail);
    }).then((thumbnail) => {
      createdThumbnail = thumbnail;
      assert((createdThumbnail.id !== null) && createdThumbnail.id !== undefined && createdThumbnail !== '');
      compareThumbnails(createdThumbnail, sampleThumbnail);
      return encodingsClient(createdEncoding.id).streams(createdStream.id).thumbnails(createdThumbnail.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdThumbnail.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  const compareThumbnails = (thumbnailOne, thumbnailTwo) => {
    assert.equal(thumbnailOne.name, thumbnailTwo.name);
    assert.equal(thumbnailOne.description, thumbnailTwo.description);
    assert.equal(thumbnailOne.height, thumbnailTwo.height);
    assert.deepEqual(thumbnailOne.positions, thumbnailTwo.positions);
    assert.equal(thumbnailOne.pattern, thumbnailTwo.pattern);
    // TODO: Hack:
    thumbnailOne.outputs.forEach((output) => {
      output.acl.forEach((acl) => {
        acl.id = undefined;
      });
    });
    thumbnailTwo.outputs.forEach((output) => {
      output.acl.forEach((acl) => {
        acl.id = undefined;
      });
    });
    // END TODO (Hack)
    assert.deepEqual(thumbnailOne.outputs, thumbnailTwo.outputs);
  };
});
