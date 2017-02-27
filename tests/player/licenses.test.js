import { getConfiguration } from '../utils';
import { licenses } from '../../bitmovin/player/licenses';
import { domains } from '../../bitmovin/player/domains';
import { channels } from '../../bitmovin/player/channels';

import {
  mockGet,
  mockPost,
  mockDelete,
  mockHttp,
  methodToMock,
  assertPayload,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup,
  assertItReturnsPromise,
  assertItReturnsCorrectResponse
} from '../assertions';

let testConfiguration = getConfiguration();

describe('player', () => {
  const licensesClient = licenses(testConfiguration, mockHttp);
  beforeEach(testSetup);

  describe('license', () => {
    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/licenses', licensesClient.list);
      assertItReturnsUnderlyingPromise(mockGet, licensesClient.list);
    });

    describe('detail', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/licenses/my-license-id', () => licensesClient('my-license-id').details());
      assertItReturnsUnderlyingPromise(mockGet, licensesClient('my-license-id').details);
    });

    describe('domains', () => {
      const domainClient = domains(testConfiguration, 'license-id', mockHttp);

      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/player/licenses/license-id/domains', domainClient.list);
        assertItReturnsUnderlyingPromise(mockGet, domainClient.list);
      });
      describe('add', () => {
        assertItCallsCorrectUrl('POST', '/v1/player/licenses/license-id/domains', domainClient.add);

        assertItReturnsUnderlyingPromise(mockPost, () => domainClient.add({
          url: 'foo'
        }));
        assertPayload(mockPost, () => domainClient.add({ url: 'foo'}), { url: 'foo' });
      });
      describe('delete', () => {
        assertItCallsCorrectUrl('DELETE', '/v1/player/licenses/license-id/domains/domain-id', domainClient('domain-id').delete);
        assertItReturnsUnderlyingPromise(mockDelete, domainClient('domain-id').delete);
      });
    });
  });

  describe('channels', () => {
    const client = channels(testConfiguration, mockHttp);

    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/channels', client.list);
      assertItReturnsUnderlyingPromise(mockGet, client.list);
    });
    describe('versions', () => {
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/player/channels/stable/versions', client('stable').versions.list);
        assertItReturnsUnderlyingPromise(mockGet, client('stable').versions.list);
      });
      describe('latest', () => {
        assertItCallsCorrectUrl('GET', '/v1/player/channels/stable/versions/latest', client('stable').versions.latest);
        assertItReturnsUnderlyingPromise(mockGet, client('stable').versions.latest);
      });
    });
  });
});
