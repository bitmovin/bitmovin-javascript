import assert from 'assert';

import {getConfiguration} from '../utils';
import encodings from '../../bitmovin/encoding/encodings/encodings';
import streams from '../../bitmovin/encoding/encodings/streams';
import inputs from '../../bitmovin/encoding/inputs';
import codecConfigurations from '../../bitmovin/encoding/codecConfigurations';
import outputs from '../../bitmovin/encoding/outputs';

let testConfiguration = getConfiguration();

let sampleSprite = {
  name: 'Sample Sprite Bitmovin JS',
  description: 'Sample Sprite bitmovin-javascript sprites.test.js',
  height: 320,
  width: 640,
  positions: [1, 2, 20],
  spriteName: 'custom-name.jpg',
  vttName: 'custom-name.vtt',
  distance: 10,
  outputs: [],
  customData: {
    myList: ['a', 'b', 'c', 'd'],
    myInt: 1234
  }
};

describe('[Sprites]', () => {
  let inputsClient = inputs(testConfiguration);
  let encodingsClient = encodings(testConfiguration);
  let codecConfigsClient = codecConfigurations(testConfiguration);
  let outputsClient = outputs(testConfiguration);

  const createInput = () => {
    let input = {
      name: 'Bitmovin Javascript Sample HTTPS Input',
      description: 'Bitmovin Javascript input.test.js sampleHttpsInput',
      host: 'websrv.corpnet.local',
      username: 'john',
      password: 'correctHorseBatteryStaple',
      customData: {
        myList: ['a', 'b', 'c', 'd'],
        myInt: 1234
      }
    };

    return inputsClient.https.create(input);
  };

  const createEncoding = () => {
    let encoding = {
      name: 'MyAwesomeEncodingBitmovinJavascript',
      description: 'Just a descriptive information',
      encoderVersion: 'BETA',
      cloudRegion: 'GOOGLE_EUROPE_WEST_1',
      customData: {
        myList: ['a', 'b', 'c', 'd'],
        myInt: 1234
      }
    };

    return encodingsClient.create(encoding);
  };

  const createCodecConfig = () => {
    let sampleH264CodecConfiguration = {
      name: 'MyAwesomeH264CodecConfigBitmovinJavascript',
      description: 'Just a descriptive information',
      bitrate: 10000000,
      rate: 23.97,
      width: 1920,
      height: 1200,
      profile: 'HIGH',
      bFrames: 3,
      refFrames: 5,
      qpMin: 0,
      qpMax: 30,
      mvPredictionMode: 'SPATIAL',
      mvSearchRangeMax: 16,
      cabac: true,
      maxBitrate: 12000000,
      minBitrate: 7000000,
      bufsize: 0,
      minGop: 0,
      maxGop: 8,
      level: '2.1',
      customData: {
        myList: ['a', 'b', 'c', 'd'],
        myInt: 1234
      }
    };

    return codecConfigsClient.h264.create(sampleH264CodecConfiguration);
  };

  const createOutput = () => {
    let sampleS3Output = {
      name: 'Sample S3 Output - Bitmovin Javascript',
      description: 'Bitmovin Javascript outputs.test.js',
      accessKey: 'AKIAIOSFODNN7INVALID',
      secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYINVALIDKEY',
      bucketName: 'printtheworld',
      cloudRegion: 'SA_EAST_1',
      customData: {
        myList: ['a', 'b', 'c', 'd'],
        myInt: 1234
      }
    };

    return outputsClient.s3.create(sampleS3Output);
  };

  const createStream = encodingId => {
    let streamsClient = undefined;
    let stream = undefined;
    let inputPromise = createInput();
    let codecConfigPromise = createCodecConfig();
    let outputPromise = createOutput();

    let promise = Promise.all([inputPromise, codecConfigPromise, outputPromise]).then(results => {
      let createdInput = results[0];
      let codecConfig = results[1];
      let output = results[2];
      streamsClient = streams(testConfiguration, encodingId);

      stream = {
        name: 'Sample Stream',
        description: 'Bitmovin Javascript streams.test.js sample stream',
        codecConfigId: codecConfig.id,
        inputStreams: [
          {
            inputId: createdInput.id,
            inputPath: '/path/to/video/file.mp4',
            selectionMode: 'AUTO'
          }
        ],
        outputs: [
          {
            outputId: output.id,
            outputPath: 'path/to/file/destination',
            acl: [
              {
                scope: 'string',
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ],
        customData: {
          myList: ['a', 'b', 'c', 'd'],
          myInt: 1234
        }
      };

      return streamsClient.add(stream);
    });

    return promise;
  };

  it('should add a sprite to a stream', done => {
    let createdEncoding = undefined;
    let createdOutput = undefined;

    let encodingPromise = createEncoding();
    let outputPromise = createOutput();

    Promise.all([encodingPromise, outputPromise])
      .then(results => {
        createdEncoding = results[0];
        createdOutput = results[1];
        return createStream(createdEncoding.id);
      })
      .then(createdStream => {
        sampleSprite.outputs = [
          {
            outputId: createdOutput.id,
            outputPath: 'path/to/file/destination',
            acl: [
              {
                scope: 'string',
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ];

        return encodingsClient(createdEncoding.id)
          .streams(createdStream.id)
          .sprites.add(sampleSprite);
      })
      .then(createdSprite => {
        assert(createdSprite.id !== null && createdSprite.id !== undefined && createdSprite !== '');
        compareSprites(createdSprite, sampleSprite);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should return a list of sprites', done => {
    let createdEncoding = undefined;
    let createdOutput = undefined;

    let encodingPromise = createEncoding();
    let outputPromise = createOutput();

    Promise.all([encodingPromise, outputPromise])
      .then(results => {
        createdEncoding = results[0];
        createdOutput = results[1];
        return createStream(createdEncoding.id);
      })
      .then(createdStream => {
        return encodingsClient(createdEncoding.id)
          .streams(createdStream.id)
          .sprites.list(5);
      })
      .then(response => {
        assert(response.totalCount !== null && response.totalCount !== undefined);
        assert(response.items !== null && response.items !== undefined);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should return sprite details', done => {
    let createdEncoding = undefined;
    let createdOutput = undefined;
    let createdStream = undefined;

    let encodingPromise = createEncoding();
    let outputPromise = createOutput();

    Promise.all([encodingPromise, outputPromise])
      .then(results => {
        createdEncoding = results[0];
        createdOutput = results[1];
        return createStream(createdEncoding.id);
      })
      .then(stream => {
        createdStream = stream;
        sampleSprite.outputs = [
          {
            outputId: createdOutput.id,
            outputPath: 'path/to/file/destination',
            acl: [
              {
                scope: 'string',
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ];

        return encodingsClient(createdEncoding.id)
          .streams(createdStream.id)
          .sprites.add(sampleSprite);
      })
      .then(createdSprite => {
        assert(createdSprite.id !== null && createdSprite.id !== undefined && createdSprite !== '');
        compareSprites(createdSprite, sampleSprite);
        return encodingsClient(createdEncoding.id)
          .streams(createdStream.id)
          .sprites(createdSprite.id)
          .details();
      })
      .then(details => {
        compareSprites(details, sampleSprite);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should return custom data of sprite', done => {
    let createdEncoding = undefined;
    let createdOutput = undefined;
    let createdStream = undefined;

    let encodingPromise = createEncoding();
    let outputPromise = createOutput();

    Promise.all([encodingPromise, outputPromise])
      .then(results => {
        createdEncoding = results[0];
        createdOutput = results[1];
        return createStream(createdEncoding.id);
      })
      .then(stream => {
        createdStream = stream;
        sampleSprite.outputs = [
          {
            outputId: createdOutput.id,
            outputPath: 'path/to/file/destination',
            acl: [
              {
                scope: 'string',
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ];

        return encodingsClient(createdEncoding.id)
          .streams(createdStream.id)
          .sprites.add(sampleSprite);
      })
      .then(createdSprite => {
        assert(createdSprite.id !== null && createdSprite.id !== undefined && createdSprite !== '');
        compareSprites(createdSprite, sampleSprite);
        return encodingsClient(createdEncoding.id)
          .streams(createdStream.id)
          .sprites(createdSprite.id)
          .customData();
      })
      .then(customDataResponse => {
        assert.deepEqual(customDataResponse.customData, sampleSprite.customData);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should delete a sprite', done => {
    let createdEncoding = undefined;
    let createdOutput = undefined;
    let createdStream = undefined;
    let createdSprite = undefined;

    let encodingPromise = createEncoding();
    let outputPromise = createOutput();

    Promise.all([encodingPromise, outputPromise])
      .then(results => {
        createdEncoding = results[0];
        createdOutput = results[1];
        return createStream(createdEncoding.id);
      })
      .then(stream => {
        createdStream = stream;
        sampleSprite.outputs = [
          {
            outputId: createdOutput.id,
            outputPath: 'path/to/file/destination',
            acl: [
              {
                scope: 'string',
                permission: 'PUBLIC_READ'
              }
            ]
          }
        ];

        return encodingsClient(createdEncoding.id)
          .streams(createdStream.id)
          .sprites.add(sampleSprite);
      })
      .then(sprite => {
        createdSprite = sprite;
        assert(createdSprite.id !== null && createdSprite.id !== undefined && createdSprite !== '');
        compareSprites(createdSprite, sampleSprite);
        return encodingsClient(createdEncoding.id)
          .streams(createdStream.id)
          .sprites(createdSprite.id)
          .delete();
      })
      .then(response => {
        assert.equal(response.id, createdSprite.id);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  const compareSprites = (spriteOne, spriteTwo) => {
    assert.equal(spriteOne.name, spriteTwo.name);
    assert.equal(spriteOne.description, spriteTwo.description);
    assert.equal(spriteOne.height, spriteTwo.height);
    assert.equal(spriteOne.width, spriteTwo.width);
    assert.deepEqual(spriteOne.distance, spriteTwo.distance);
    assert.equal(spriteOne.spriteName, spriteTwo.spriteName);
    assert.equal(spriteOne.vttName, spriteTwo.vttName);
    // TODO: Hack:
    spriteOne.outputs.forEach(output => {
      output.acl.forEach(acl => {
        acl.id = undefined;
      });
    });
    spriteTwo.outputs.forEach(output => {
      output.acl.forEach(acl => {
        acl.id = undefined;
      });
    });
    // END TODO (Hack)
    assert.deepEqual(spriteOne.outputs, spriteTwo.outputs);
  };
});
