import assert from 'assert';

import {getConfiguration} from '../utils';
import manifests from '../../bitmovin/encoding/manifests/dash/dashManifests';
import outputs from '../../bitmovin/encoding/outputs';
import inputs from '../../bitmovin/encoding/inputs';
import encodings from '../../bitmovin/encoding/encodings/encodings';
import codecConfigurations from '../../bitmovin/encoding/codecConfigurations';

let testConfiguration = getConfiguration();

let sampleManifest = {
  name: 'Sample DASH Manifest',
  description: 'bitmovin-javascript sample dash manifest dashManifests.test.js',
  manifestName: 'bitmovin-javascript-dash-manifest.mpd',
  outputs: []
};

let sampleStream = {
  name: 'Bitmovin JS sample stream',
  inputStreams: [],
  codecConfigId: undefined
};

let sampleMuxing = {
  name: 'Bitmovin JS sample fmp4 muxing',
  streams: [],
  outputs: [],
  segmentLength: 4,
  segmentNaming: 'seg_%number%.m4s',
  initSegmentName: 'init.mp4'
};

const samplePeriod = {
  start: 2,
  duration: 290
};

let sampleAudioAdaptationSet = {
  lang: 'en',
  roles: ['MAIN', 'DUB'],
  //customAttributes: [ { myAwesomeKey: 'myAwesomeValue' } ]
  customAttributes: []
};

let sampleFmp4Representation = {
  type: 'TEMPLATE',
  encodingId: undefined,
  muxingId: undefined,
  startSegmentNumber: 0,
  segmentPath: '/path/to/segments'
};

let sampleDrmFmp4Representation = {
  type: 'TEMPLATE',
  encodingId: undefined,
  muxingId: undefined,
  startSegmentNumber: 0,
  segmentPath: '/path/to/segments',
  drmId: undefined
};

describe('[DASH Manifest ContentProtections]', () => {
  let manifestsClient = manifests(testConfiguration);
  let outputsClient = outputs(testConfiguration);
  let encodingsClient = encodings(testConfiguration);
  let inputsClient = inputs(testConfiguration);
  let codecConfigsClient = codecConfigurations(testConfiguration);

  let encodingResource = undefined;
  let outputResource = undefined;
  let streamResource = undefined;
  let muxingResource = undefined;
  let manifestResource = undefined;
  let periodResource = undefined;
  let adaptationSetResource = undefined;
  let drmMuxingResource = undefined;
  let fmp4RepresentationResource = undefined;
  let drmFmp4RepresentationResource = undefined;

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

  const createInput = () => {
    let sampleInput = {
      name: 'Bitmovin JS Sample HTTP Input',
      host: 'myawesomehost.mycorp.com'
    };

    return inputsClient.http.create(sampleInput);
  };

  const createEncoding = () => {
    let sampleEncoding = {
      name: 'Sample Bitmovin JS Encoding'
    };

    return encodingsClient.create(sampleEncoding);
  };

  const createCodecConfig = () => {
    let sampleCodecConfig = {
      name: 'Bitmovin JS sample codec config',
      bitrate: 128000
    };

    return codecConfigsClient.aac.create(sampleCodecConfig);
  };

  const getSampleOutput = outputId => {
    return {
      outputId: outputId,
      outputPath: 'path/to/file/destination',
      acl: [
        {
          scope: 'string',
          permission: 'PUBLIC_READ'
        }
      ]
    };
  };

  beforeAll(done => {
    let createdInput = undefined;
    let createdOutput = undefined;
    let createdCodecConfig = undefined;

    let outputPromise = createOutput();
    let inputPromise = createInput();
    let encodingPromise = createEncoding();
    let codecConfigPromise = createCodecConfig();

    Promise.all([outputPromise, inputPromise, encodingPromise, codecConfigPromise])
      .then(results => {
        outputResource = results[0];
        createdOutput = getSampleOutput(outputResource.id);
        createdInput = results[1];
        encodingResource = results[2];
        createdCodecConfig = results[3];

        sampleStream.codecConfigId = createdCodecConfig.id;
        sampleStream.inputStreams.push({
          inputId: createdInput.id,
          inputPath: 'path/to/file.mp4',
          selectionMode: 'AUTO'
        });

        return encodingsClient(encodingResource.id).streams.add(sampleStream);
      })
      .then(stream => {
        streamResource = stream;
        sampleMuxing.streams.push({streamId: stream.id});
        sampleMuxing.outputs.push(createdOutput);
        return encodingsClient(encodingResource.id).muxings.fmp4.add(sampleMuxing);
      })
      .then(muxing => {
        muxingResource = muxing;
        return encodingsClient(encodingResource.id)
          .muxings.fmp4(muxing.id)
          .drms.marlin.add({
            key: '123456789ABCDEF123456789ABCDEF12',
            kid: '123456789ABCDEF123456789ABCDEF12'
          });
      })
      .then(drm => {
        drmMuxingResource = drm;
        sampleManifest.outputs = [createdOutput];
        return manifestsClient.create(sampleManifest);
      })
      .then(manifest => {
        assert(manifest.id !== null && manifest.id !== undefined && manifest.id !== '');
        manifestResource = manifest;
        return manifestsClient(manifest.id).periods.add(samplePeriod);
      })
      .then(period => {
        assert(period.id !== null && period.id !== undefined && period.id !== '');
        periodResource = period;
        return manifestsClient(manifestResource.id)
          .periods(period.id)
          .adaptationSets.audio.create(sampleAudioAdaptationSet);
      })
      .then(adaptationSet => {
        assert(adaptationSet.id !== null && adaptationSet.id !== undefined && adaptationSet.id !== '');
        adaptationSetResource = adaptationSet;

        sampleFmp4Representation.encodingId = encodingResource.id;
        sampleFmp4Representation.muxingId = muxingResource.id;
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets(adaptationSetResource.id)
          .representations.fmp4.add(sampleFmp4Representation);
      })
      .then(representation => {
        assert(representation.id !== null && representation.id !== undefined && representation.id !== '');
        fmp4RepresentationResource = representation;
        compareFmp4Representations(representation, sampleFmp4Representation);

        sampleDrmFmp4Representation.encodingId = encodingResource.id;
        sampleDrmFmp4Representation.muxingId = muxingResource.id;
        sampleDrmFmp4Representation.drmId = drmMuxingResource.id;
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets(adaptationSetResource.id)
          .representations.drmFmp4.add(sampleDrmFmp4Representation);
      })
      .then(drmRepresentation => {
        assert(drmRepresentation.id !== null && drmRepresentation.id !== undefined && drmRepresentation.id !== '');
        drmFmp4RepresentationResource = drmRepresentation;
        compareDrmFmp4Representations(drmRepresentation, sampleDrmFmp4Representation);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should add a content protection to a dash adaptation set', done => {
    let contentProtection = {
      encodingId: encodingResource.id,
      muxingId: muxingResource.id,
      drmId: drmMuxingResource.id
    };

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .contentProtections.add(contentProtection)
      .then(protection => {
        assert(protection.id !== null && protection.id !== undefined && protection.id !== '');
        compareContentProtections(protection, contentProtection);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should list content protections of a dash adaptation set', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .contentProtections.list(5)
      .then(response => {
        assert(response.totalCount !== null && response.totalCount !== undefined);
        assert(response.items !== null && response.items !== undefined);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should return content protection details of a dash adaptation set', done => {
    let contentProtection = {
      encodingId: encodingResource.id,
      muxingId: muxingResource.id,
      drmId: drmMuxingResource.id
    };

    let createdContentProtection = undefined;

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .contentProtections.add(contentProtection)
      .then(protection => {
        assert(protection.id !== null && protection.id !== undefined && protection.id !== '');
        createdContentProtection = protection;
        compareContentProtections(protection, contentProtection);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets(adaptationSetResource.id)
          .contentProtections(protection.id)
          .details();
      })
      .then(details => {
        compareContentProtections(details, createdContentProtection);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should delete a content protection of a dash adaptation set', done => {
    let contentProtection = {
      encodingId: encodingResource.id,
      muxingId: muxingResource.id,
      drmId: drmMuxingResource.id
    };

    let createdContentProtection = undefined;

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .contentProtections.add(contentProtection)
      .then(protection => {
        assert(protection.id !== null && protection.id !== undefined && protection.id !== '');
        createdContentProtection = protection;
        compareContentProtections(protection, contentProtection);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets(adaptationSetResource.id)
          .contentProtections(protection.id)
          .delete();
      })
      .then(result => {
        assert.equal(result.id, createdContentProtection.id);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should add a content protection to a dash fmp4 representation', done => {
    let contentProtection = {
      encodingId: encodingResource.id,
      muxingId: muxingResource.id,
      drmId: drmMuxingResource.id
    };

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .representations.fmp4(fmp4RepresentationResource.id)
      .contentProtections.add(contentProtection)
      .then(protection => {
        assert(protection.id !== null && protection.id !== undefined && protection.id !== '');
        compareContentProtections(protection, contentProtection);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should list content protections of a dash fmp4 representation', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .representations.fmp4(fmp4RepresentationResource.id)
      .contentProtections.list(5)
      .then(response => {
        assert(response.totalCount !== null && response.totalCount !== undefined);
        assert(response.items !== null && response.items !== undefined);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should return content protection details of a dash fmp4 representation', done => {
    let contentProtection = {
      encodingId: encodingResource.id,
      muxingId: muxingResource.id,
      drmId: drmMuxingResource.id
    };

    let createdContentProtection = undefined;

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .representations.fmp4(fmp4RepresentationResource.id)
      .contentProtections.add(contentProtection)
      .then(protection => {
        assert(protection.id !== null && protection.id !== undefined && protection.id !== '');
        createdContentProtection = protection;
        compareContentProtections(protection, contentProtection);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets(adaptationSetResource.id)
          .representations.fmp4(fmp4RepresentationResource.id)
          .contentProtections(protection.id)
          .details();
      })
      .then(details => {
        compareContentProtections(details, createdContentProtection);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should delete a content protection of a dash fmp4 representation', done => {
    let contentProtection = {
      encodingId: encodingResource.id,
      muxingId: muxingResource.id,
      drmId: drmMuxingResource.id
    };

    let createdContentProtection = undefined;

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .representations.fmp4(fmp4RepresentationResource.id)
      .contentProtections.add(contentProtection)
      .then(protection => {
        assert(protection.id !== null && protection.id !== undefined && protection.id !== '');
        createdContentProtection = protection;
        compareContentProtections(protection, contentProtection);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets(adaptationSetResource.id)
          .representations.fmp4(fmp4RepresentationResource.id)
          .contentProtections(protection.id)
          .delete();
      })
      .then(result => {
        assert.equal(result.id, createdContentProtection.id);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should add a content protection to a dash drmFmp4 representation', done => {
    let contentProtection = {
      encodingId: encodingResource.id,
      muxingId: muxingResource.id,
      drmId: drmMuxingResource.id
    };

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .representations.drmFmp4(drmFmp4RepresentationResource.id)
      .contentProtections.add(contentProtection)
      .then(protection => {
        assert(protection.id !== null && protection.id !== undefined && protection.id !== '');
        compareContentProtections(protection, contentProtection);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should list content protections of a dash drmFmp4 representation', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .representations.drmFmp4(drmFmp4RepresentationResource.id)
      .contentProtections.list(5)
      .then(response => {
        assert(response.totalCount !== null && response.totalCount !== undefined);
        assert(response.items !== null && response.items !== undefined);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should return content protection details of a dash drmFmp4 representation', done => {
    let contentProtection = {
      encodingId: encodingResource.id,
      muxingId: muxingResource.id,
      drmId: drmMuxingResource.id
    };

    let createdContentProtection = undefined;

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .representations.drmFmp4(drmFmp4RepresentationResource.id)
      .contentProtections.add(contentProtection)
      .then(protection => {
        assert(protection.id !== null && protection.id !== undefined && protection.id !== '');
        createdContentProtection = protection;
        compareContentProtections(protection, contentProtection);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets(adaptationSetResource.id)
          .representations.drmFmp4(drmFmp4RepresentationResource.id)
          .contentProtections(protection.id)
          .details();
      })
      .then(details => {
        compareContentProtections(details, createdContentProtection);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should delete a content protection of a dash drmFmp4 representation', done => {
    let contentProtection = {
      encodingId: encodingResource.id,
      muxingId: muxingResource.id,
      drmId: drmMuxingResource.id
    };

    let createdContentProtection = undefined;

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets(adaptationSetResource.id)
      .representations.drmFmp4(drmFmp4RepresentationResource.id)
      .contentProtections.add(contentProtection)
      .then(protection => {
        assert(protection.id !== null && protection.id !== undefined && protection.id !== '');
        createdContentProtection = protection;
        compareContentProtections(protection, contentProtection);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets(adaptationSetResource.id)
          .representations.drmFmp4(drmFmp4RepresentationResource.id)
          .contentProtections(protection.id)
          .delete();
      })
      .then(result => {
        assert.equal(result.id, createdContentProtection.id);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  const compareFmp4Representations = (representationOne, representationTwo) => {
    assert.equal(representationOne.type, representationTwo.type);
    assert.equal(representationOne.encodingId, representationTwo.encodingId);
    assert.equal(representationOne.muxingId, representationTwo.muxingId);
    assert.equal(representationOne.startSegmentNumber, representationTwo.startSegmentNumber);
    assert.equal(representationOne.segmentPath, representationTwo.segmentPath);
  };

  const compareDrmFmp4Representations = (representationOne, representationTwo) => {
    compareFmp4Representations(representationOne, representationTwo);
    assert.equal(representationOne.drmId, representationTwo.drmId);
  };

  const compareContentProtections = (contentProtectionOne, contentProtectionTwo) => {
    assert.equal(contentProtectionOne.encodingId, contentProtectionTwo.encodingId);
    assert.equal(contentProtectionOne.muxingId, contentProtectionTwo.muxingId);
    assert.equal(contentProtectionOne.drmId, contentProtectionTwo.drmId);
  };
});
