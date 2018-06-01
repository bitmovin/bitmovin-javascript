import {getConfiguration} from '../utils';
import { manifests } from '../../bitmovin/encoding/manifests/manifests';
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
  assertItReturnsCorrectResponse,
  assertItCallsUrlAndReturnsPromise
} from '../assertions';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests', () => {
    beforeEach(testSetup);
    const client = manifests(testConfiguration, mockHttp);
    describe('list', () => {
      describe('un parameterized list call', () => {
        assertItCallsCorrectUrl('GET', '/v1/encoding/manifests', client.list);
        assertItReturnsUnderlyingPromise(mockGet, client.list);
      });

      describe('list call with limit only', () => {
        const limit = 100;
        const expectedGetParameter = 'limit\=' + limit;
        assertItCallsCorrectUrl('GET', '/v1/encoding/manifests\\?' + expectedGetParameter, () => client.list(limit));
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(limit));
      });

      describe('list call with offset only', () => {
        const offset = 0;
        const expectedGetParameter = 'offset\=' + offset;
        assertItCallsCorrectUrl('GET', '/v1/encoding/manifests\\?' + expectedGetParameter, () => client.list(null, offset));
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(null, offset));
      });

      describe('list call with sort only', () => {
        const sort = 'createdAt:DESC';
        const expectedGetParameter = 'sort\=' + sort;
        assertItCallsCorrectUrl('GET', '/v1/encoding/manifests\\?' + expectedGetParameter, () => client.list(null, null, sort));
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(null, null, sort));
      });

      describe('list call with multiple double filter only', () => {
        const filter = {
          type: [ 'VOD', 'LIVE'],
          status: ['RUNNING', 'QUEUED']
        };

        const expectedGetParameter = 'type=VOD,LIVE&status=RUNNING,QUEUED';
        assertItCallsCorrectUrl('GET', '/v1/encoding/manifests\\?' + expectedGetParameter, () => client.list(null, null, null, filter));
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(null, null, null, filter));
      });

      describe('fully parameterized list call with multiple double filter', () => {
        const limit = 100;
        const offset = 0;
        const sort = 'createdAt:ASC';
        const filter = {
          type: [ 'VOD', 'LIVE'],
          status: ['RUNNING', 'QUEUED']
        };

        const expectedGetParameter = 'type=VOD,LIVE&status=RUNNING,QUEUED&limit=' + limit + '&offset=' + offset + '&sort=' + sort;
        assertItCallsCorrectUrl('GET', '/v1/encoding/manifests\\?' + expectedGetParameter, () => client.list(limit, offset, sort, filter));
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(limit, offset, sort, filter));
      });
    });
  });
});
