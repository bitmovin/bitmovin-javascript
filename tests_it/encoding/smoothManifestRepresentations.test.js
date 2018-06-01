import assert from 'assert';

import {getConfiguration} from '../utils';
import encodings from '../../bitmovin/encoding/encodings/encodings';
import inputs from '../../bitmovin/encoding/inputs';
import codecConfigurations from '../../bitmovin/encoding/codecConfigurations';
import outputs from '../../bitmovin/encoding/outputs';
import streams from '../../bitmovin/encoding/encodings/streams';
import muxings from '../../bitmovin/encoding/encodings/muxings';
import drms from '../../bitmovin/encoding/encodings/drms';
import smoothManifests from '../../bitmovin/encoding/manifests/smooth/smoothManifests';

let testConfiguration = getConfiguration();

let encodingsClient           = encodings(testConfiguration);
let inputsClient              = inputs(testConfiguration);
let outputsClient             = outputs(testConfiguration);
let codecConfigurationsClient = codecConfigurations(testConfiguration);
let manifestsClient           = smoothManifests(testConfiguration);

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

describe('[Smooth Manifest Representation Tests]', () => {
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
        name              : 'Bitmovin javascript test Smooth manifest',
        outputs           : [
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
        serverManifestName: 'stream.ism',
        clientManifestName: 'stream.ismc'
      };
      return manifestsClient.create(manifest);
    }).then((result) => {
      manifestResource = result;
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  let sampleMp4Representation = {
    encodingId: undefined,
    muxingId  : undefined,
    mediaFile : '/path/to/file.ismv'
  };

  it('should add a mp4 representation to a smooth manifest', (done) => {
    sampleMp4Representation.encodingId = encodingResource.id;
    sampleMp4Representation.muxingId   = muxingResource.id;

    manifestsClient(manifestResource.id).representations.mp4.add(sampleMp4Representation)
    .then((createdRepresentation) => {
      compareMp4Representations(createdRepresentation, sampleMp4Representation);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list mp4 representations of a smooth manifest', (done) => {
    manifestsClient(manifestResource.id).representations.mp4.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should retrieve mp4 representation details', (done) => {
    sampleMp4Representation.encodingId = encodingResource.id;
    sampleMp4Representation.muxingId   = muxingResource.id;

    manifestsClient(manifestResource.id).representations.mp4.add(sampleMp4Representation)
    .then((createdRepresentation) => {
      compareMp4Representations(createdRepresentation, sampleMp4Representation);
      return manifestsClient(manifestResource.id).representations.mp4(createdRepresentation.id).details();
    }).then((details) => {
      compareMp4Representations(details, sampleMp4Representation);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete a mp4 representation', (done) => {
    sampleMp4Representation.encodingId = encodingResource.id;
    sampleMp4Representation.muxingId   = muxingResource.id;

    let createdRepresentationResource = undefined;

    manifestsClient(manifestResource.id).representations.mp4.add(sampleMp4Representation)
    .then((createdRepresentation) => {
      compareMp4Representations(createdRepresentation, sampleMp4Representation);
      createdRepresentationResource = createdRepresentation;
      return manifestsClient(manifestResource.id).representations.mp4(createdRepresentation.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdRepresentationResource.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  const compareMp4Representations = (representationOne, representationTwo) => {
    assert.equal(representationOne.encodingId, representationTwo.encodingId);
    assert.equal(representationOne.muxingId, representationTwo.muxingId);
    assert.equal(representationOne.mediaFile, representationTwo.mediaFile);
  };
});
