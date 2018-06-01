import {getConfiguration} from '../utils';
import {licenses} from '../../bitmovin/analytics/licenses';
import {domains} from '../../bitmovin/analytics/domains';
import {
  mockGet,
  mockPost,
  mockPut,
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
  const licensesClient = licenses(testConfiguration, mockHttp);

  let sampleDomain = {
    url: 'yourhost.com'
  };

  describe('license', () => {
    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/analytics/licenses', licensesClient.list);
      assertItReturnsUnderlyingPromise(mockGet, licensesClient.list);
    });
    describe('detail', () => {
      assertItCallsCorrectUrl('GET', '/v1/analytics/licenses/my-license-id', () =>
        licensesClient('my-license-id').details()
      );
      assertItReturnsUnderlyingPromise(mockGet, licensesClient('my-license-id').details);
    });

    describe('update', () => {
      assertItCallsCorrectUrl('PUT', '/v1/analytics/licenses/my-license-id', () =>
        licensesClient('my-license-id').update()
      );
      assertItReturnsUnderlyingPromise(mockPut, licensesClient('my-license-id').update);
      assertPayload(mockPut, () => licensesClient('my-license-id').update({name: 'foo'}), {name: 'foo'});
    });

    describe('domains', () => {
      const domainClient = domains(testConfiguration, 'license-id', mockHttp);

      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/analytics/licenses/license-id/domains', domainClient.list);
        assertItReturnsUnderlyingPromise(mockGet, domainClient.list);
      });
      describe('add', () => {
        assertItCallsCorrectUrl('POST', '/v1/analytics/licenses/license-id/domains', domainClient.add);

        assertItReturnsUnderlyingPromise(mockPost, () =>
          domainClient.add({
            url: 'foo'
          })
        );
        assertPayload(mockPost, () => domainClient.add({url: 'foo'}), {url: 'foo'});
      });
      describe('delete', () => {
        assertItCallsCorrectUrl(
          'DELETE',
          '/v1/analytics/licenses/license-id/domains/domain-id',
          domainClient('domain-id').delete
        );
        assertItReturnsUnderlyingPromise(mockDelete, domainClient('domain-id').delete);
      });
    });
  });
});
