import assert from 'assert';

import {getConfiguration} from '../utils';
import licenses from '../../bitmovin/player/licenses';

let testConfiguration = getConfiguration();

const getRandom = () => {
  return Math.floor(Math.random() * (4096 - 1 + 1)) + 1;
};

describe('[Player License Domains]', () => {
  const licensesClient = licenses(testConfiguration);

  let sampleDomain = () => {
    return {
      'url': 'yourhost' + getRandom() + '.com'
    };
  };

  it('should add player license domain', (done) => {
    let playerLicenseId = undefined;
    const domain = sampleDomain();

    licensesClient.list().then((response) => {
      assert(response.items instanceof Array);
      playerLicenseId = response.items[0].id;
      return licensesClient(playerLicenseId).domains.add(domain);
    }).then((response) => {
      assert.equal(response.url, domain.url);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should list player license domains', (done) => {
    licensesClient.list().then((response) => {
      assert(response.items instanceof Array);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should delete player license domain', (done) => {
    let playerLicenseId = undefined;
    let createdDomain = undefined;
    const domain = sampleDomain();

    licensesClient.list().then((response) => {
      assert(response.items instanceof Array);
      playerLicenseId = response.items[0].id;
      return licensesClient(playerLicenseId).domains.add(domain);
    }).then((response) => {
      assert.equal(response.url, domain.url);
      createdDomain = response;
      return licensesClient(playerLicenseId).domains(createdDomain.id).delete();
    }).then((response) => {
      assert.equal(response.id, createdDomain.id);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
});
