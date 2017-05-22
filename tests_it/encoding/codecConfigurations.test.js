import assert from 'assert';

import {getConfiguration} from '../utils';
import codecConfigurations from '../../bitmovin/encoding/codecConfigurations';

let testConfiguration = getConfiguration();

describe('[CodecConfigurations]', () => {
  let codecConfigurationsClient = codecConfigurations(testConfiguration);

  let sampleAacCodecConfig = {
    name         : 'MyAwesomeAACCodecConfigBitmovinJavascript',
    description  : 'Just a descriptive information',
    bitrate      : 128000,
    rate         : 48000,
    channelLayout: '5.1_BACK',
    volumeAdjust : 95,
    normalize    : false,
    customData   : {
      myList: ['a', 'b', 'c', 'd'],
      myInt : 1234
    }
  };

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

  let sampleH265CodecConfiguration = {
    name                    : 'MyAwesomeH265CodecConfigBitmovinJavascript',
    description             : 'Just a descriptive information',
    bitrate                 : 10000000,
    rate                    : 23.97,
    width                   : 1920,
    height                  : 1200,
    profile                 : 'main10',
    bFrames                 : 3,
    refFrames               : 5,
    qp                      : 1,
    maxBitrate              : 12000000,
    minBitrate              : 7000000,
    bufsize                 : 0,
    minGop                  : 0,
    maxGop                  : 8,
    level                   : '2.1',
    rcLookahead             : 20,
    bAdapt                  : 'FULL',
    maxCTUSize              : "64",
    tuIntraDepth            : 1,
    tuInterDepth            : 1,
    motionSearch            : 'HEX',
    subMe                   : 2,
    motionSearchRange       : 57,
    weightPredictionOnPSlice: true,
    weightPredictionOnBSlice: false,
    sao                     : false
  };

  it('should list all codec configurations', (done) => {
    codecConfigurationsClient.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.previous !== null) && response.previous !== undefined);
      assert((response.next !== null) && response.next !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should create an aac codec configuration', (done) => {
    let aacCodecConfig = sampleAacCodecConfig;

    codecConfigurationsClient.aac.create(aacCodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, aacCodecConfig);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list aac codec configurations', (done) => {
    codecConfigurationsClient.aac.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      //assert((response.previous !== null) && response.previous !== undefined);
      //assert((response.next !== null) && response.next !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get aac audio configuration details', (done) => {
    let aacCodecConfig = sampleAacCodecConfig;

    codecConfigurationsClient.aac.create(aacCodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, aacCodecConfig);
      return codecConfigurationsClient.aac(createdCodecConfig.id).details();
    }).then((codecConfigDetails) => {
      compareAACCodecConfigurations(codecConfigDetails, aacCodecConfig);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get aac audio configuration type', (done) => {
    let aacCodecConfig = sampleAacCodecConfig;

    codecConfigurationsClient.aac.create(aacCodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, aacCodecConfig);
      return codecConfigurationsClient.getType(createdCodecConfig.id);
    }).then((type) => {
      assert.equal(type.type, 'AAC');
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get custom data of an aac codec config', (done) => {
    let aacCodecConfig = sampleAacCodecConfig;

    codecConfigurationsClient.aac.create(aacCodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, aacCodecConfig);
      return codecConfigurationsClient.aac(createdCodecConfig.id).customData();
    }).then((customData) => {
      assert.deepEqual(customData.customData, aacCodecConfig.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete an aac audio configuration', (done) => {
    let aacCodecConfig = sampleAacCodecConfig;

    let createdCodecConfigId = undefined;

    codecConfigurationsClient.aac.create(aacCodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, aacCodecConfig);
      createdCodecConfigId = createdCodecConfig.id;
      return codecConfigurationsClient.aac(createdCodecConfig.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdCodecConfigId);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it('should create an h264 codec configuration', (done) => {
    let h264CodecConfig = sampleH264CodecConfiguration;

    codecConfigurationsClient.h264.create(h264CodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, h264CodecConfig);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list h264 codec configurations', (done) => {
    codecConfigurationsClient.h264.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      //assert((response.previous !== null) && response.previous !== undefined);
      //assert((response.next !== null) && response.next !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get h264 audio configuration details', (done) => {
    let h264CodecConfig = sampleH264CodecConfiguration;

    codecConfigurationsClient.h264.create(h264CodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, h264CodecConfig);
      return codecConfigurationsClient.h264(createdCodecConfig.id).details();
    }).then((codecConfigDetails) => {
      compareAACCodecConfigurations(codecConfigDetails, h264CodecConfig);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get custom data of a h264 codec config', (done) => {
    let h264CodecConfig = sampleH264CodecConfiguration;

    codecConfigurationsClient.h264.create(h264CodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, h264CodecConfig);
      return codecConfigurationsClient.h264(createdCodecConfig.id).customData();
    }).then((customData) => {
      assert.deepEqual(customData.customData, h264CodecConfig.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete an h264 audio configuration', (done) => {
    let h264CodecConfig = sampleH264CodecConfiguration;

    let createdCodecConfigId = undefined;

    codecConfigurationsClient.h264.create(h264CodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, h264CodecConfig);
      createdCodecConfigId = createdCodecConfig.id;
      return codecConfigurationsClient.h264(createdCodecConfig.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdCodecConfigId);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it('should create an h265 codec configuration', (done) => {
    let h265CodecConfig = sampleH265CodecConfiguration;

    codecConfigurationsClient.h265.create(h265CodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, h265CodecConfig);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list h265 codec configurations', (done) => {
    codecConfigurationsClient.h265.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      //assert((response.previous !== null) && response.previous !== undefined);
      //assert((response.next !== null) && response.next !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get h265 audio configuration details', (done) => {
    let h265CodecConfig = sampleH265CodecConfiguration;

    codecConfigurationsClient.h265.create(h265CodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, h265CodecConfig);
      return codecConfigurationsClient.h265(createdCodecConfig.id).details();
    }).then((codecConfigDetails) => {
      compareAACCodecConfigurations(codecConfigDetails, h265CodecConfig);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get custom data of a h265 codec config', (done) => {
    let h265CodecConfig = sampleH265CodecConfiguration;

    codecConfigurationsClient.h265.create(h265CodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, h265CodecConfig);
      return codecConfigurationsClient.h265(createdCodecConfig.id).customData();
    }).then((customData) => {
      assert.deepEqual(customData.customData, h265CodecConfig.customData);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete an h265 audio configuration', (done) => {
    let h265CodecConfig = sampleH265CodecConfiguration;

    let createdCodecConfigId = undefined;

    codecConfigurationsClient.h265.create(h265CodecConfig).then((createdCodecConfig) => {
      assert((createdCodecConfig.id !== null) && createdCodecConfig.id !== undefined && createdCodecConfig.id !== '');
      compareAACCodecConfigurations(createdCodecConfig, h265CodecConfig);
      createdCodecConfigId = createdCodecConfig.id;
      return codecConfigurationsClient.h265(createdCodecConfig.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdCodecConfigId);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const compareAACCodecConfigurations = (configOne, configTwo) => {
    assert.equal(configOne.name, configTwo.name);
    assert.equal(configOne.description, configTwo.description);
    assert.equal(configOne.bitrate, configTwo.bitrate);
    assert.equal(configOne.rate, configTwo.rate);
    assert.equal(configOne.channelLayout, configTwo.channelLayout);
    assert.equal(configOne.volumeAdjust, configTwo.volumeAdjust);
    assert.equal(configOne.normalize, configTwo.normalize);
  };

  const compareH264CodecConfiguration = (configOne, configTwo) => {
    assert.equal(configOne.name, configTwo.name);
    assert.equal(configOne.description, configTwo.description);
    assert.equal(configOne.bitrate, configTwo.bitrate);
    assert.equal(configOne.rate, configTwo.rate);
    assert.equal(configOne.width, configTwo.width);
    assert.equal(configOne.height, configTwo.height);
    assert.equal(configOne.profile, configTwo.profile);
    assert.equal(configOne.bFrames, configTwo.bFrames);
    assert.equal(configOne.refFrames, configTwo.refFrames);
    assert.equal(configOne.qpMin, configTwo.qpMin);
    assert.equal(configOne.qpMax, configTwo.qpMax);
    assert.equal(configOne.mvPredictionMode, configTwo, mvPredictionMode);
    assert.equal(configOne.mvSearchRangeMax, configTwo.mvSearchRangeMax);
    assert.equal(configOne.cabac, configTwo.cabac);
    assert.equal(configOne.maxBitrate, configTwo.maxBitrate);
    assert.equal(configOne.minBitrate, configTwo.minBitrate);
    assert.equal(configOne.bufsize, configTwo.bufsize);
    assert.equal(configOne.minGop, configTwo.minGop);
    assert.equal(configOne.maxGop, configTwo.maxGop);
    assert.equal(configOne.level, configTwo.level);
  };

  const compareH265CodecConfiguration = (configOne, configTwo) => {
    assert.equal(configOne.name, configTwo.name);
    assert.equal(configOne.description, configTwo.description);
    assert.equal(configOne.bitrate, configTwo.bitrate);
    assert.equal(configOne.rate, configTwo.rate);
    assert.equal(configOne.width, configTwo.width);
    assert.equal(configOne.height, configTwo.height);
    assert.equal(configOne.profile, configTwo.profile);
    assert.equal(configOne.bFrames, configTwo.bFrames);
    assert.equal(configOne.refFrames, configTwo.refFrames);
    assert.equal(configOne.qp, configTwo.qp);
    assert.equal(configOne.maxBitrate, configTwo.maxBitrate);
    assert.equal(configOne.minBitrate, configTwo.minBitrate);
    assert.equal(configOne.bufsize, configTwo.bufsize);
    assert.equal(configOne.minGop, configTwo.minGop);
    assert.equal(configOne.maxGop, configTwo.maxGop);
    assert.equal(configOne.level, configTwo.level);
    assert.equal(configOne.rcLookahead, configTwo.rcLookahead);
    assert.equal(configOne.bAdapt, configTwo.bAdapt);
    assert.equal(configOne.maxCTUSize, configTwo.maxCTUSize);
    assert.equal(configOne.tuIntraDepth, configTwo.tuIntraDepth);
    assert.equal(configOne.tuInterDepth, configTwo.tuInterDepth);
    assert.equal(configOne.motionSearch, configTwo.motionSearch);
    assert.equal(configOne.subMe, configTwo.subMe);
    assert.equal(configOne.motionSearchRange, configTwo.motionSearchRange);
    assert.equal(configOne.weightPredictionOnPSlice, configTwo.weightPredictionOnPSlice);
    assert.equal(configOne.weightPredictionOnBSlice, configTwo.weightPredictionOnBSlice);
    assert.equal(configOne.sao, configTwo.sao);
  };
});
