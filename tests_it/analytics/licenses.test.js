import {after, before, describe, it} from 'mocha';
import assert from 'assert';

import {getConfiguration} from '../utils';
import licenses from '../../bitmovin/analytics/licenses';

let testConfiguration = getConfiguration();

describe('[Analytics Licenses]', () => {
  const licensesClient = licenses(testConfiguration);

  it('should list analytics licenses', (done) => {
    licensesClient.list().then((response) => {
      assert(response.items instanceof Array);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should get analytics license details', (done) => {
    licensesClient.list().then((response) => {
      assert(response.items instanceof Array);
      return licensesClient(response.items[0].id).details();
    }).then((details) => {
      assert(details !== undefined);
      assert(details.id !== undefined && typeof(details.id) === 'string');
      assert(details.licenseKey !== undefined && typeof(details.licenseKey) === 'string');
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
});
