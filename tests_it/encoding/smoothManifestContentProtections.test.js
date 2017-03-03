import {after, before, describe, it} from 'mocha';
import assert from 'assert';

import {getConfiguration} from '../utils';
import encodings from '../../bitmovin/encoding/encodings';
import inputs from '../../bitmovin/encoding/inputs';
import codecConfigurations from '../../bitmovin/encoding/codecConfigurations';
import outputs from '../../bitmovin/encoding/outputs';
import streams from '../../bitmovin/encoding/streams';
import muxings from '../../bitmovin/encoding/muxings';
import drms from '../../bitmovin/encoding/drms';
import smoothManifests from '../../bitmovin/encoding/smoothManifests';

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

describe('[Smooth Manifest Content Protection Tests]', () => {
  let encodingResource    = undefined;
  let inputResource       = undefined;
  let outputResource      = undefined;
  let codecConfigResource = undefined;
  let streamResource      = undefined;
  let muxingResource      = undefined;
  let manifestResource    = undefined;
  let drmResource         = undefined;

  before((done) => {
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

  let sampleContentProtection = {
    encodingId: undefined,
    muxingId  : undefined,
    drmId: undefined
  };

  it('should add a content protection to a smooth manifest', (done) => {
    sampleContentProtection.encodingId = encodingResource.id;
    sampleContentProtection.muxingId   = muxingResource.id;
    sampleContentProtection.drmId = drmResource.id;

    manifestsClient(manifestResource.id).contentProtections.add(sampleContentProtection)
    .then((createdProtection) => {
      compareContentProtections(createdProtection, sampleContentProtection);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list content protections of a smooth manifest', (done) => {
    manifestsClient(manifestResource.id).contentProtections.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should retrieve content protection details', (done) => {
    sampleContentProtection.encodingId = encodingResource.id;
    sampleContentProtection.muxingId   = muxingResource.id;
    sampleContentProtection.drmId = drmResource.id;

    manifestsClient(manifestResource.id).contentProtections.add(sampleContentProtection)
    .then((createdProtection) => {
      compareContentProtections(createdProtection, sampleContentProtection);
      return manifestsClient(manifestResource.id).contentProtections(createdProtection.id).details();
    }).then((details) => {
      compareContentProtections(details, sampleContentProtection);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete a content protection', (done) => {
    sampleContentProtection.encodingId = encodingResource.id;
    sampleContentProtection.muxingId   = muxingResource.id;
    sampleContentProtection.drmId = drmResource.id;

    let createdProtectionResource = undefined;

    manifestsClient(manifestResource.id).contentProtections.add(sampleContentProtection)
    .then((createdProtection) => {
      compareContentProtections(createdProtection, sampleContentProtection);
      createdProtectionResource = createdProtection;
      return manifestsClient(manifestResource.id).contentProtections(createdProtection.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdProtectionResource.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  const compareContentProtections = (protectionOne, protectionTwo) => {
    assert.equal(protectionOne.encodingId, protectionTwo.encodingId);
    assert.equal(protectionOne.muxingId, protectionTwo.muxingId);
    assert.equal(protectionOne.drmId, protectionTwo.drmId);
  };
});
