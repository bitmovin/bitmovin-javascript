import { getConfiguration } from '../utils';
import { statistics } from '../../bitmovin/analytics/statistics';

import {
  mockGet,
  mockHttp,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup
} from '../assertions';

let testConfiguration = getConfiguration();

describe('analytics', () => {
  const statisticsClient = statistics(testConfiguration, mockHttp);
  beforeEach(testSetup);

  describe('statistics', () => {
    describe('impressions', () => {
      describe('impressions default interval', () => {
        assertItCallsCorrectUrl('GET', '/v1/analytics/statistics/impressions',
          statisticsClient.impressions.bind(this, 'asdf', '2017-01-01', '2017-01-02'));
        assertItReturnsUnderlyingPromise(mockGet,
          statisticsClient.impressions.bind(this, 'asdf', '2017-01-01', '2017-01-02'));
      });
      describe('impressions daily interval', () => {
        assertItCallsCorrectUrl('GET', '/v1/analytics/statistics/impressions',
          statisticsClient.impressions.bind(this, 'asdf', '2017-01-01', '2017-01-02', statisticsClient.INTERVAL.DAILY));
        assertItReturnsUnderlyingPromise(mockGet,
          statisticsClient.impressions.bind(this, 'asdf', '2017-01-01', '2017-01-02', statisticsClient.INTERVAL.DAILY));
      });
    });
  });
});
