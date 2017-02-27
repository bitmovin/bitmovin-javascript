import {after, before, describe, it} from 'mocha';
import assert from 'assert';

import {getConfiguration} from '../utils';
import manifests from '../../bitmovin/encoding/dashManifests';
import outputs from '../../bitmovin/encoding/outputs';

let testConfiguration = getConfiguration();

const sampleManifest = {
  name        : 'Sample DASH Manifest',
  description : 'bitmovin-javascript sample dash manifest dashManifests.test.js',
  manifestName: 'bitmovin-javascript-dash-manifest.mpd',
  outputs     : []
};

const samplePeriod = {
  start   : 2,
  duration: 290
};

describe('[DASH Manifest Periods]', () => {
  let manifestsClient  = manifests(testConfiguration);
  let outputsClient    = outputs(testConfiguration);
  let manifestResource = undefined;

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

  const getSampleOutput = (outputId) => {
    return {
      outputId  : outputId,
      outputPath: 'path/to/file/destination',
      acl       : [
        {
          scope     : 'string',
          permission: 'PUBLIC_READ'
        }
      ]
    };
  };

  before((done) => {
    let createdOutput = undefined;

    createOutput().then((output) => {
      createdOutput          = getSampleOutput(output.id);
      sampleManifest.outputs = [createdOutput];
      return manifestsClient.create(sampleManifest);
    }).then((manifest) => {
      assert((manifest.id !== null) && manifest.id !== undefined && manifest.id !== '');
      manifestResource = manifest;
      compareManifests(manifest, sampleManifest);
      done();
    }).catch((error) => {
      done(new Error(error));
    })
  });

  it('should create a dash manifest period', (done) => {
    manifestsClient(manifestResource.id).periods.add(samplePeriod).then((period) => {
      assert((period.id !== null) && period.id !== undefined && period.id !== '');
      comparePeriods(period, samplePeriod);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return a list of DASH manifest periods', (done) => {
    manifestsClient(manifestResource.id).periods.list(5).then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items !== null) && response.items !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return manifest period details', (done) => {
    let createdPeriod = undefined;

    manifestsClient(manifestResource.id).periods.add(samplePeriod).then((period) => {
      assert((period.id !== null) && period.id !== undefined && period.id !== '');
      comparePeriods(period, samplePeriod);
      createdPeriod = period;
      return manifestsClient(manifestResource.id).periods(period.id).details();
    }).then((details) => {
      comparePeriods(details, createdPeriod);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete a dash manifest period', (done) => {
    let createdPeriod = undefined;

    manifestsClient(manifestResource.id).periods.add(samplePeriod).then((period) => {
      assert((period.id !== null) && period.id !== undefined && period.id !== '');
      comparePeriods(period, samplePeriod);
      createdPeriod = period;
      return manifestsClient(manifestResource.id).periods(period.id).delete();
    }).then((result) => {
      assert.equal(result.id, createdPeriod.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  const compareManifests = (manifestOne, manifestTwo) => {
    assert.equal(manifestOne.name, manifestTwo.name);
    assert.equal(manifestOne.description, manifestTwo.description);
    assert.equal(manifestOne.manifestName, manifestTwo.manifestName);
    // TODO: Hack: MRS does not return ACL object inside created manifest output's object
    manifestOne.outputs.forEach((output) => {
      output.acl = undefined;
    });
    manifestTwo.outputs.forEach((output) => {
      output.acl = undefined;
    });
    // END TODO (Hack)
    assert.deepEqual(manifestOne.outputs, manifestTwo.outputs);
  };

  const comparePeriods = (periodOne, periodTwo) => {
    assert.equal(periodOne.start, periodTwo.start);
    assert.equal(periodOne.duration, periodTwo.duration);
  };
});