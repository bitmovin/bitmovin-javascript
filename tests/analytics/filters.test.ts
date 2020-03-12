import {filters} from '../../bitmovin/analytics/filters';
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
  const filtersClient = filters(testConfiguration, mockHttp);

  describe('filters customUserId', () => {
    const start = 1573137000000;
    const end = 1573396200000;
    assertItCallsCorrectUrl('POST', '/v1/analytics/filters/customUserId', () =>
      filtersClient.customUserId({licenseKey: 'license-key', start, end})
    );
    assertItReturnsUnderlyingPromise(mockPost, () =>
      filtersClient.customUserId({licenseKey: 'license-key', start, end})
    );
    assertPayload(
      mockPost,
      () => {
        return filtersClient.customUserId({licenseKey: 'license-key', start, end, query: 'foo'});
      },
      {
        licenseKey: 'license-key',
        start: 1573137000000,
        end: 1573396200000,
        query: 'foo'
      }
    );
  });

  describe('filters video', () => {
    const start = 1573137000000;
    const end = 1573396200000;
    assertItCallsCorrectUrl('POST', '/v1/analytics/filters/video', () =>
      filtersClient.video({licenseKey: 'license-key', start, end})
    );
    assertItReturnsUnderlyingPromise(mockPost, () => filtersClient.video({licenseKey: 'license-key', start, end}));
    assertPayload(
      mockPost,
      () => {
        return filtersClient.video({licenseKey: 'license-key', start, end, query: 'foo'});
      },
      {
        licenseKey: 'license-key',
        start: 1573137000000,
        end: 1573396200000,
        query: 'foo'
      }
    );
  });
});
