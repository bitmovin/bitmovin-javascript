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

  it('should return vod statistics', (done) => {
    statisticsClient.vod.list().then((response) => {
      assert(response !== undefined && response !== null);
      assert(response.next !== undefined && response.next !== null);
      assert(response.previous !== undefined && response.previous !== null);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return vod statistics with limit offset', (done) => {
    statisticsClient.vod.list(10, 5).then((response) => {
      assert(response !== undefined && response !== null);
      assert(response.next !== undefined && response.next !== null);
      assert(response.previous !== undefined && response.previous !== null);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

});
