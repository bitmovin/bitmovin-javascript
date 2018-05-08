import {customBuilds} from '../../bitmovin/player/customBuilds';

import {
  mockDelete,
  mockGet,
  mockHttp,
  mockPost,
  assertPayload,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup,
} from '../assertions';
import {getConfiguration} from '../utils';

let testConfiguration = getConfiguration();

describe('player', () => {
  beforeEach(testSetup);

  describe('custom-builds', () => {
    const customBuildsClient = customBuilds(testConfiguration, mockHttp);

    describe('add', function () {
      assertItCallsCorrectUrl('POST', '/v1/player/custom-builds/web', customBuildsClient.web.add);
      assertItReturnsUnderlyingPromise(mockPost, () => customBuildsClient.web.add({
        playerVersion: 'v7.6.3',
        domains: [
          {
            domainId: 'my-domain-id'
          }
        ]
      }));
    });

    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/custom-builds/web', customBuildsClient.web.list);
      assertItReturnsUnderlyingPromise(mockGet, customBuildsClient.web.list);
    });

    describe('detail', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/custom-builds/web', () => customBuildsClient.web('example-id').details());
      assertItReturnsUnderlyingPromise(mockGet, customBuildsClient.web('example-id').details);
    });

    describe('download', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/custom-builds/web/example-id/download', () => customBuildsClient.web('example-id').download());
      assertItReturnsUnderlyingPromise(mockGet, customBuildsClient.web('example-id').download);
    });

    describe('status', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/custom-builds/web/example-id/status', () => customBuildsClient.web('example-id').status());
      assertItReturnsUnderlyingPromise(mockGet, customBuildsClient.web('example-id').status);
    });

    describe('start', () => {
      assertItCallsCorrectUrl('POST', '/v1/player/custom-builds/web/example-id/start', () => customBuildsClient.web('example-id').start());
      assertItReturnsUnderlyingPromise(mockPost, customBuildsClient.web('example-id').start);
    });

    describe('delete', () => {
      assertItCallsCorrectUrl('DELETE', '/v1/player/custom-builds/web/example-id', () => customBuildsClient.web('example-id').delete());
      assertItReturnsUnderlyingPromise(mockPost, customBuildsClient.web('example-id').delete);
    });

    describe('domains', () => {
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/player/custom-builds/web/domains', customBuildsClient.web.domains.list);
        assertItReturnsUnderlyingPromise(mockGet, customBuildsClient.web.domains.list);
      });
      describe('add', () => {
        assertItCallsCorrectUrl('POST', '/v1/player/custom-builds/web/domains', customBuildsClient.web.domains.add);
        assertItReturnsUnderlyingPromise(mockPost, () => customBuildsClient.web.domains.add({
          domain: 'example.com'
        }));
        assertPayload(mockPost, () => customBuildsClient.web.domains.add({url: 'foo'}), {url: 'foo'});
      });
      describe('details', () => {
        assertItCallsCorrectUrl('GET', '/v1/player/custom-builds/web/domains/example-id', customBuildsClient.web.domains('example-id').details);
        assertItReturnsUnderlyingPromise(mockGet, customBuildsClient.web.domains('example-id').details);
      });
      describe('delete', () => {
        assertItCallsCorrectUrl('DELETE', '/v1/player/custom-builds/web/domains/domain-id', customBuildsClient.web.domains('domain-id').delete);
        assertItReturnsUnderlyingPromise(mockDelete, customBuildsClient.web.domains('domain-id').delete);
      });
    });
  });
});
