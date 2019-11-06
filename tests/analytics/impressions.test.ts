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

  describe('impression details', () => {
    assertItCallsCorrectUrl('POST', '/v1/analytics/impressions/my-impression-id', () =>
      impressionsClient.details('my-impression-id', 'license-key')
    );
    assertItReturnsUnderlyingPromise(mockPost, () => impressionsClient.details('my-impression-id', 'license-key'));
    assertPayload(mockPost, () => impressionsClient.details('my-impression-id', 'license-key'), {
      licenseKey: 'license-key'
    });

    describe('without license key', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/impressions/my-impression-id', () =>
        impressionsClient.details('my-impression-id', undefined)
      );
      assertItReturnsUnderlyingPromise(mockPost, () => impressionsClient.details('my-impression-id', undefined));
      assertPayload(mockPost, () => impressionsClient.details('my-impression-id', undefined), {licenseKey: undefined});
    });
  });

  describe('impressions', () => {
    const start = 1573137000000;
    const end = 1573396200000;
    assertItCallsCorrectUrl('POST', '/v1/analytics/impressions', () =>
      impressionsClient({licenseKey: 'license-key', start, end})
    );
    assertItReturnsUnderlyingPromise(mockPost, () => impressionsClient({licenseKey: 'license-key', start, end}));
    assertPayload(
      mockPost,
      () => {
        const filters = [{name: 'CUSTOM_USER_ID', operator: 'EQ', value: 'customer#1'}];
        return impressionsClient({licenseKey: 'license-key', start, end, filters});
      },
      {
        licenseKey: 'license-key',
        start: 1573137000000,
        end: 1573396200000,
        filters: [{name: 'CUSTOM_USER_ID', operator: 'EQ', value: 'customer#1'}]
      }
    );
  });
});
