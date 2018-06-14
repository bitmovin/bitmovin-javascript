import {impressions} from '../../bitmovin/analytics/impressions';
import {
  assertItCallsCorrectUrl,
  assertItReturnsUnderlyingPromise,
  assertPayload,
  mockHttp,
  mockPost,
  testSetup
} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('analytics', () => {
  beforeEach(testSetup);
  const impressionsClient = impressions(testConfiguration, mockHttp);

  describe('impressions', () => {
    assertItCallsCorrectUrl('POST', '/v1/analytics/impressions/my-impression-id', () =>
      impressionsClient('my-impression-id', 'license-key')
    );
    assertItReturnsUnderlyingPromise(mockPost, () => impressionsClient('my-impression-id', 'license-key'));
    assertPayload(mockPost, () => impressionsClient('my-impression-id', 'license-key'), {licenseKey: 'license-key'});

    describe('without license key', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/impressions/my-impression-id', () =>
        impressionsClient('my-impression-id', undefined)
      );
      assertItReturnsUnderlyingPromise(mockPost, () => impressionsClient('my-impression-id', undefined));
      assertPayload(mockPost, () => impressionsClient('my-impression-id', undefined), {licenseKey: undefined});
    });
  });
});
