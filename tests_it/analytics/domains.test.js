import assert from 'assert';

import {getConfiguration} from '../utils';
import licenses from '../../bitmovin/analytics/licenses';

let testConfiguration = getConfiguration();

const getRandom = () => {
  return Math.floor(Math.random() * (4096 - 1 + 1)) + 1;
};

describe('[Analytics License Domains]', () => {
  const licensesClient = licenses(testConfiguration);

  let sampleDomain = {
    'url': 'yourhost' + getRandom() + '.com'
  };

  it('should add analytics license domain', (done) => {
    let analyticsLicenseId = undefined;

    licensesClient.list().then((response) => {
      assert(response.items instanceof Array);
      analyticsLicenseId = response.items[0].id;
      return licensesClient(analyticsLicenseId).domains.add(sampleDomain);
    }).then((response) => {
      assert.equal(response.url, sampleDomain.url);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list analytics license domains', (done) => {
    licensesClient.list().then((response) => {
      assert(response.items instanceof Array);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // TODO: investigate why there's a 400
  it.skip('should delete analytics license domain', (done) => {
    let analyticsLicenseId = undefined;
    let createdDomain      = undefined;

    licensesClient.list().then((response) => {
      assert(response.items instanceof Array);
      analyticsLicenseId = response.items[0].id;
      return licensesClient(analyticsLicenseId).domains.add(sampleDomain);
    }).then((response) => {
      assert.equal(response.url, sampleDomain.url);
      createdDomain = response;
      return licensesClient(analyticsLicenseId).domains(createdDomain.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdDomain.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
});
