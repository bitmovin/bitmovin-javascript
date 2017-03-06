import {after, before, describe, it} from 'mocha';
import assert from 'assert';
import {getConfiguration} from '../utils';

import statistics from '../../bitmovin/encoding/statistics';

const testConfiguration = getConfiguration();

describe('[Statistics]', () => {

  let statisticsClient = statistics(testConfiguration);

  it('should return an overall statistics object', (done) => {
    statisticsClient.overall().then((response) => {
      assert(response.bytesEncodedTotal !== null && response.bytesEncodedTotal !== undefined);
      assert(response.timeEncodedTotal !== null && response.timeEncodedTotal !== undefined);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });
});
