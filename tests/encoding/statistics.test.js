import { getConfiguration } from '../utils';
import { statistics } from '../../bitmovin/encoding/statistics';

import {
  mockHttp,
  assertItCallsUrlAndReturnsPromise,
  testSetup,
} from '../assertions';

let testConfiguration = getConfiguration();
describe('encoding', () => {
  beforeEach(testSetup);
  const client = statistics(testConfiguration, mockHttp);

  describe('statistics', () => {
    describe('overall', () => {
      assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/statistics', client.overall);
    });
    describe('encodings', () => {
      describe('live-statistics', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/statistics/encodings/encoding-id/live-statistics', client.encodings('encoding-id').liveStatistics);
      });
      describe('vod', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/statistics/encodings/vod', client.vod.list);
      });
      describe('live', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/statistics/encodings/live', client.live.list);
      });
    });

  });
});
