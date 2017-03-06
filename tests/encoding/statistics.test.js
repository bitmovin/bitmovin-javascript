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
  });
});