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
    assertItCallsCorrectUrl('POST', '/v1/analytics/impressions/my-impression-id', () => impressionsClient('my-impression-id', 'license-key'));
    assertItReturnsUnderlyingPromise(mockPost, () => impressionsClient('my-impression-id', 'license-key'));
    assertPayload(mockPost, () => impressionsClient('my-impression-id', 'license-key'), { licenseKey: 'license-key' });

    describe('without license key', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/impressions/my-impression-id', () => impressionsClient('my-impression-id'));
      assertItReturnsUnderlyingPromise(mockPost, () => impressionsClient('my-impression-id'));
      assertPayload(mockPost, () => impressionsClient('my-impression-id'), { licenseKey: undefined });
    });
  });
});
