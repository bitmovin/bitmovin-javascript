import assert from 'assert';

import {getConfiguration} from '../utils';
import manifests from '../../bitmovin/encoding/manifests/dash/dashManifests';
import outputs from '../../bitmovin/encoding/outputs';

let testConfiguration = getConfiguration();

const sampleManifest = {
  name: 'Sample DASH Manifest',
  description: 'bitmovin-javascript sample dash manifest dashManifests.test.js',
  manifestName: 'bitmovin-javascript-dash-manifest.mpd',
  outputs: []
};

const samplePeriod = {
  start: 2,
  duration: 290
};

const sampleAudioAdaptationSet = {
  lang: 'en',
  roles: ['MAIN', 'DUB']
};

const sampleVideoAdaptationSet = {
  roles: ['MAIN', 'CAPTION']
};

const sampleSubtitleAdaptationSet = {
  roles: ['MAIN', 'SUBTITLE']
};

const sampleCustomAdaptationSet = {
  roles: ['ALTERNATE', 'SUPPLEMENTARY'],
  customAttributes: [{myKey: 'myValue'}]
};

describe('[DASH Manifest AdaptationSets]', () => {
  let manifestsClient = manifests(testConfiguration);
  let outputsClient = outputs(testConfiguration);
  let manifestResource = undefined;
  let periodResource = undefined;

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
    let createdOutput = undefined;

    createOutput()
      .then(output => {
        createdOutput = getSampleOutput(output.id);
        sampleManifest.outputs = [createdOutput];
        return manifestsClient.create(sampleManifest);
      })
      .then(manifest => {
        assert(manifest.id !== null && manifest.id !== undefined && manifest.id !== '');
        manifestResource = manifest;
        compareManifests(manifest, sampleManifest);
        return manifestsClient(manifest.id).periods.add(samplePeriod);
      })
      .then(period => {
        assert(period.id !== null && period.id !== undefined && period.id !== '');
        periodResource = period;
        comparePeriods(period, samplePeriod);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should create a dash manifest audio adaptation set', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.audio.create(sampleAudioAdaptationSet)
      .then(adaptationSet => {
        assert(adaptationSet.id !== null && adaptationSet.id !== undefined && adaptationSet.id !== '');
        compareAudioAdaptationSets(adaptationSet, sampleAudioAdaptationSet);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should list dash manifest audio adaptation sets', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.audio.list(5)
      .then(response => {
        assert(response.totalCount !== null && response.totalCount !== undefined);
        assert(response.items !== null && response.items !== undefined);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should return dash manifest audio adaptation set details', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.audio.create(sampleAudioAdaptationSet)
      .then(adaptationSet => {
        assert(adaptationSet.id !== null && adaptationSet.id !== undefined && adaptationSet.id !== '');
        compareAudioAdaptationSets(adaptationSet, sampleAudioAdaptationSet);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets.audio(adaptationSet.id)
          .details();
      })
      .then(details => {
        compareAudioAdaptationSets(details, sampleAudioAdaptationSet);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should delete a dash manifest audio adaptation set', done => {
    let createdAudioAdaptationSet = undefined;

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.audio.create(sampleAudioAdaptationSet)
      .then(adaptationSet => {
        assert(adaptationSet.id !== null && adaptationSet.id !== undefined && adaptationSet.id !== '');
        createdAudioAdaptationSet = adaptationSet;
        compareAudioAdaptationSets(adaptationSet, sampleAudioAdaptationSet);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets.audio(adaptationSet.id)
          .delete();
      })
      .then(response => {
        assert.equal(response.id, createdAudioAdaptationSet.id);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should create a dash manifest video adaptation set', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.video.create(sampleVideoAdaptationSet)
      .then(adaptationSet => {
        assert(adaptationSet.id !== null && adaptationSet.id !== undefined && adaptationSet.id !== '');
        compareVideoAdaptationSets(adaptationSet, sampleVideoAdaptationSet);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should list dash manifest video adaptation sets', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.video.list(5)
      .then(response => {
        assert(response.totalCount !== null && response.totalCount !== undefined);
        assert(response.items !== null && response.items !== undefined);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should return dash manifest video adaptation set details', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.video.create(sampleVideoAdaptationSet)
      .then(adaptationSet => {
        assert(adaptationSet.id !== null && adaptationSet.id !== undefined && adaptationSet.id !== '');
        compareVideoAdaptationSets(adaptationSet, sampleVideoAdaptationSet);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets.video(adaptationSet.id)
          .details();
      })
      .then(details => {
        compareVideoAdaptationSets(details, sampleVideoAdaptationSet);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should delete a dash manifest video adaptation set', done => {
    let createdVideoAdaptationSet = undefined;

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.video.create(sampleVideoAdaptationSet)
      .then(adaptationSet => {
        assert(adaptationSet.id !== null && adaptationSet.id !== undefined && adaptationSet.id !== '');
        createdVideoAdaptationSet = adaptationSet;
        compareVideoAdaptationSets(adaptationSet, sampleVideoAdaptationSet);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets.video(adaptationSet.id)
          .delete();
      })
      .then(response => {
        assert.equal(response.id, createdVideoAdaptationSet.id);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should create a dash manifest subtitle adaptation set', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.subtitle.create(sampleSubtitleAdaptationSet)
      .then(adaptationSet => {
        assert(adaptationSet.id !== null && adaptationSet.id !== undefined && adaptationSet.id !== '');
        compareSubtitleAdaptationSets(adaptationSet, sampleSubtitleAdaptationSet);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should list dash manifest subtitle adaptation sets', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.subtitle.list(5)
      .then(response => {
        assert(response.totalCount !== null && response.totalCount !== undefined);
        assert(response.items !== null && response.items !== undefined);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should return dash manifest subtitle adaptation set details', done => {
    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.subtitle.create(sampleSubtitleAdaptationSet)
      .then(adaptationSet => {
        assert(adaptationSet.id !== null && adaptationSet.id !== undefined && adaptationSet.id !== '');
        compareSubtitleAdaptationSets(adaptationSet, sampleSubtitleAdaptationSet);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets.subtitle(adaptationSet.id)
          .details();
      })
      .then(details => {
        compareSubtitleAdaptationSets(details, sampleSubtitleAdaptationSet);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  it('should delete a dash manifest subtitle adaptation set', done => {
    let createdSubtitleAdaptationSet = undefined;

    manifestsClient(manifestResource.id)
      .periods(periodResource.id)
      .adaptationSets.subtitle.create(sampleSubtitleAdaptationSet)
      .then(adaptationSet => {
        assert(adaptationSet.id !== null && adaptationSet.id !== undefined && adaptationSet.id !== '');
        createdSubtitleAdaptationSet = adaptationSet;
        compareSubtitleAdaptationSets(adaptationSet, sampleSubtitleAdaptationSet);
        return manifestsClient(manifestResource.id)
          .periods(periodResource.id)
          .adaptationSets.subtitle(adaptationSet.id)
          .delete();
      })
      .then(response => {
        assert.equal(response.id, createdSubtitleAdaptationSet.id);
        done();
      })
      .catch(error => {
        done(new Error(error));
      });
  });

  /* TODO: uncomment when it's implemented!
   it('should create a dash manifest custom adaptation set', (done) => {
   manifestsClient(manifestResource.id).periods(periodResource.id).adaptationSets.custom.create(sampleCustomAdaptationSet).then((adaptationSet) => {
   assert((adaptationSet.id !== null) && adaptationSet.id !== undefined && adaptationSet.id !== '');
   compareCustomAdaptationSets(adaptationSet, sampleCustomAdaptationSet);
   done();
   }).catch((error) => {
   done(new Error(error));
   });
   });

   it('should list dash manifest custom adaptation sets', (done) => {
   manifestsClient(manifestResource.id).periods(periodResource.id).adaptationSets.custom.list(5).then((response) => {
   assert((response.totalCount !== null) && response.totalCount !== undefined);
   assert((response.items !== null) && response.items !== undefined);
   done();
   }).catch((error) => {
   done(new Error(error));
   });
   });

   it('should return dash manifest custom adaptation set details', (done) => {
   manifestsClient(manifestResource.id).periods(periodResource.id).adaptationSets.custom.create(sampleCustomAdaptationSet).then((adaptationSet) => {
   assert((adaptationSet.id !== null) && adaptationSet.id !== undefined && adaptationSet.id !== '');
   compareCustomAdaptationSets(adaptationSet, sampleCustomAdaptationSet);
   return manifestsClient(manifestResource.id).periods(periodResource.id).adaptationSets.custom(adaptationSet.id).details();
   }).then((details) => {
   compareCustomAdaptationSets(details, sampleCustomAdaptationSet);
   done();
   }).catch((error) => {
   done(new Error(error));
   });
   });

   it('should delete a dash manifest custom adaptation set', (done) => {
   let createdCustomAdaptationSet = undefined;

   manifestsClient(manifestResource.id).periods(periodResource.id).adaptationSets.custom.create(sampleCustomAdaptationSet).then((adaptationSet) => {
   assert((adaptationSet.id !== null) && adaptationSet.id !== undefined && adaptationSet.id !== '');
   createdCustomAdaptationSet = adaptationSet;
   compareCustomAdaptationSets(adaptationSet, sampleCustomAdaptationSet);
   return manifestsClient(manifestResource.id).periods(periodResource.id).adaptationSets.custom(adaptationSet.id).delete();
   }).then((response) => {
   assert.equal(response.id, createdCustomAdaptationSet.id);
   done();
   }).catch((error) => {
   done(new Error(error));
   });
   });
   */

  const compareManifests = (manifestOne, manifestTwo) => {
    assert.equal(manifestOne.name, manifestTwo.name);
    assert.equal(manifestOne.description, manifestTwo.description);
    assert.equal(manifestOne.manifestName, manifestTwo.manifestName);
    // TODO: Hack: MRS does not return ACL object inside created manifest output's object
    manifestOne.outputs.forEach(output => {
      output.acl = undefined;
    });
    manifestTwo.outputs.forEach(output => {
      output.acl = undefined;
    });
    // END TODO (Hack)
    assert.deepEqual(manifestOne.outputs, manifestTwo.outputs);
  };

  const comparePeriods = (periodOne, periodTwo) => {
    assert.equal(periodOne.start, periodTwo.start);
    assert.equal(periodOne.duration, periodTwo.duration);
  };

  const compareAdaptationSets = (adaptationSetOne, adaptationSetTwo) => {
    assert.deepEqual(adaptationSetOne.roles, adaptationSetTwo.roles);
    assert.deepEqual(adaptationSetOne.customAttributes, adaptationSetTwo.customAttributes);
  };

  const compareAudioAdaptationSets = (adaptationSetOne, adaptationSetTwo) => {
    compareAdaptationSets(adaptationSetOne, adaptationSetTwo);
    assert.equal(adaptationSetOne.lang, adaptationSetTwo.lang);
  };

  const compareVideoAdaptationSets = (adaptationSetOne, adaptationSetTwo) => {
    compareAdaptationSets(adaptationSetOne, adaptationSetTwo);
  };

  const compareSubtitleAdaptationSets = (adaptationSetOne, adaptationSetTwo) => {
    compareAdaptationSets(adaptationSetOne, adaptationSetTwo);
    assert.equal(adaptationSetOne.lang, adaptationSetTwo.lang);
  };

  const compareCustomAdaptationSets = (adaptationSetOne, adaptationSetTwo) => {
    compareAdaptationSets(adaptationSetOne, adaptationSetTwo);
  };
});
