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

    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/custom-builds/web', customBuildsClient.web.list);
      assertItReturnsUnderlyingPromise(mockGet, customBuildsClient.web.list);
    });

    describe('detail', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/custom-builds/web', () => customBuildsClient.web('example-id').details());
      assertItReturnsUnderlyingPromise(mockGet, customBuildsClient.web('example-id').details);
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
      describe('delete', () => {
        assertItCallsCorrectUrl('DELETE', '/v1/player/custom-builds/web/domains/domain-id', customBuildsClient.web.domains('domain-id').delete);
        assertItReturnsUnderlyingPromise(mockDelete, customBuildsClient.web.domains('domain-id').delete);
      });
    });
  });
});