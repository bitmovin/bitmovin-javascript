import {encodings} from '../../bitmovin/encoding/encodings';
import {
  assertItCallsCorrectUrl,
  assertItReturnsUnderlyingPromise,
  mockDelete,
  mockGet,
  mockHttp,
  mockPost,
  testSetup
} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('encodings', () => {
    beforeEach(testSetup);
    const client = encodings(testConfiguration, mockHttp);

    describe('list', () => {
      describe('un parameterized list call', () => {
        assertItCallsCorrectUrl('GET', '/v1/encoding/encodings', client.list);
        assertItReturnsUnderlyingPromise(mockGet, client.list);
      });

      describe('list call with limit only', () => {
        const limit = 100;
        const expectedGetParameter = 'limit=' + limit;
        assertItCallsCorrectUrl('GET', '/v1/encoding/encodings\\?' + expectedGetParameter, () => client.list(limit));
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(limit));
      });

      describe('list call with offset only', () => {
        const offset = 0;
        const expectedGetParameter = 'offset=' + offset;
        assertItCallsCorrectUrl('GET', '/v1/encoding/encodings\\?' + expectedGetParameter, () =>
          client.list(undefined, offset)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(undefined, offset));
      });

      describe('list call with sort only', () => {
        const sort = 'createdAt:DESC';
        const expectedGetParameter = 'sort=' + sort;
        assertItCallsCorrectUrl('GET', '/v1/encoding/encodings\\?' + expectedGetParameter, () =>
          client.list(undefined, undefined, sort)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(undefined, undefined, sort));
      });

      describe('list call with multiple double filter only', () => {
        const filter = {
          type: ['VOD', 'LIVE'],
          status: ['RUNNING', 'QUEUED']
        };

        const expectedGetParameter = 'type=VOD,LIVE&status=RUNNING,QUEUED';
        assertItCallsCorrectUrl('GET', '/v1/encoding/encodings\\?' + expectedGetParameter, () =>
          client.list(undefined, undefined, undefined, filter)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(undefined, undefined, undefined, filter));
      });

      describe('fully parameterized list call with multiple double filter', () => {
        const limit = 100;
        const offset = 0;
        const sort = 'createdAt:ASC';
        const filter = {
          type: ['VOD', 'LIVE'],
          status: ['RUNNING', 'QUEUED']
        };

        const expectedGetParameter =
          'type=VOD,LIVE&status=RUNNING,QUEUED&limit=' + limit + '&offset=' + offset + '&sort=' + sort;
        assertItCallsCorrectUrl('GET', '/v1/encoding/encodings\\?' + expectedGetParameter, () =>
          client.list(limit, offset, sort, filter)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(limit, offset, sort, filter));
      });
    });

    describe('create', () => {
      assertItCallsCorrectUrl('POST', '/v1/encoding/encodings', client.create);
      assertItReturnsUnderlyingPromise(mockPost, client.create);
    });

    describe('encoding', () => {
      const enc = client('encoding-id');
      describe('details', () => {
        assertItCallsCorrectUrl('GET', '/v1/encoding/encodings/encoding-id', enc.details);
        assertItReturnsUnderlyingPromise(mockGet, enc.details);
      });
      describe('liveDetails', () => {
        assertItCallsCorrectUrl('GET', '/v1/encoding/encodings/encoding-id/live', enc.liveDetails);
        assertItReturnsUnderlyingPromise(mockGet, enc.liveDetails);
      });
      describe('customData', () => {
        assertItCallsCorrectUrl('GET', '/v1/encoding/encodings/encoding-id/customData', enc.customData);
        assertItReturnsUnderlyingPromise(mockGet, enc.customData);
      });
      describe('delete', () => {
        assertItCallsCorrectUrl('DELETE', '/v1/encoding/encodings/encoding-id', enc.delete);
        assertItReturnsUnderlyingPromise(mockDelete, enc.delete);
      });
      describe('start', () => {
        assertItCallsCorrectUrl('POST', '/v1/encoding/encodings/encoding-id/start', enc.start);
        assertItReturnsUnderlyingPromise(mockPost, enc.start);
      });
      describe('stop', () => {
        assertItCallsCorrectUrl('POST', '/v1/encoding/encodings/encoding-id/stop', enc.stop);
        assertItReturnsUnderlyingPromise(mockPost, enc.stop);
      });
      describe('startLive', () => {
        assertItCallsCorrectUrl('POST', '/v1/encoding/encodings/encoding-id/live/start', enc.startLive);
        assertItReturnsUnderlyingPromise(mockPost, enc.startLive);
      });
      describe('stopLive', () => {
        assertItCallsCorrectUrl('POST', '/v1/encoding/encodings/encoding-id/live/stop', enc.stopLive);
        assertItReturnsUnderlyingPromise(mockPost, enc.stopLive);
      });
      describe('status', () => {
        assertItCallsCorrectUrl('GET', '/v1/encoding/encodings/encoding-id/status', enc.status);
        assertItReturnsUnderlyingPromise(mockGet, enc.status);
      });
    });
  });
});
