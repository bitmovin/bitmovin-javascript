import {getConfiguration} from '../utils';
import { impressions } from '../../bitmovin/analytics/impressions';

import {
  mockGet,
  mockPost,
  mockDelete,
  mockHttp,
  methodToMock,
  assertPayload,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup
} from '../assertions';

let testConfiguration = getConfiguration();

describe('analytics', () => {
  beforeEach(testSetup);
  const impressionsClient = impressions(testConfiguration, mockHttp);

  describe('impressions', () => {
    describe('detail', () => {
      assertItCallsCorrectUrl('GET', '/v1/analytics/impressions/my-impression-id', () => impressionsClient('my-impression-id').details());
      assertItReturnsUnderlyingPromise(mockGet, impressionsClient('my-impression-id').details);
    });
  });
});
