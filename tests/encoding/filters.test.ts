import {streams} from '../../bitmovin/encoding/encodings/streams';
import {filters} from '../../bitmovin/encoding/filters';
import {
  assertItCallsCorrectUrl,
  assertItReturnsUnderlyingPromise,
  assertPayload,
  mockDelete,
  mockGet,
  mockHttp,
  mockPost,
  testSetup
} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();
describe('encoding', () => {
  beforeEach(testSetup);

  describe('filters', () => {
    const client = filters(testConfiguration, mockHttp);

    describe('list', () => {
      describe('un parameterized list call', () => {
        assertItCallsCorrectUrl('GET', '/v1/encoding/filters', client.list);
        assertItReturnsUnderlyingPromise(mockGet, client.list);
      });

      describe('list call with limit only', () => {
        const limit = 100;
        const expectedGetParameter = 'limit=' + limit;
        assertItCallsCorrectUrl('GET', '/v1/encoding/filters\\?' + expectedGetParameter, () => client.list(limit));
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(limit));
      });

      describe('list call with offset only', () => {
        const offset = 0;
        const expectedGetParameter = 'offset=' + offset;
        assertItCallsCorrectUrl('GET', '/v1/encoding/filters\\?' + expectedGetParameter, () =>
          client.list(undefined, offset)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(undefined, offset));
      });

      describe('list call with sort only', () => {
        const sort = 'createdAt:DESC';
        const expectedGetParameter = 'sort=' + sort;
        assertItCallsCorrectUrl('GET', '/v1/encoding/filters\\?' + expectedGetParameter, () =>
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
        assertItCallsCorrectUrl('GET', '/v1/encoding/filters\\?' + expectedGetParameter, () =>
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
        assertItCallsCorrectUrl('GET', '/v1/encoding/filters\\?' + expectedGetParameter, () =>
          client.list(limit, offset, sort, filter)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(limit, offset, sort, filter));
      });
    });

    const testFilterType = type => {
      describe(type, () => {
        describe('list', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/filters/${type}`, client[type].list);
          assertItReturnsUnderlyingPromise(mockGet, client[type].list);
        });

        describe('add', () => {
          assertItCallsCorrectUrl('POST', `/v1/encoding/filters/${type}`, client[type].create);
          assertItReturnsUnderlyingPromise(mockPost, client[type].create);
        });

        describe('filter', () => {
          describe('details', () => {
            assertItCallsCorrectUrl('GET', `/v1/encoding/filters/${type}/filter-id`, client[type]('filter-id').details);
            assertItReturnsUnderlyingPromise(mockGet, client[type]('filter-id').details);
          });

          describe('customData', () => {
            assertItCallsCorrectUrl(
              'GET',
              `/v1/encoding/filters/${type}/filter-id/customData`,
              client[type]('filter-id').customData
            );
            assertItReturnsUnderlyingPromise(mockGet, client[type]('filter-id').customData);
          });

          describe('delete', () => {
            assertItCallsCorrectUrl(
              'DELETE',
              `/v1/encoding/filters/${type}/filter-id`,
              client[type]('filter-id').delete
            );
            assertItReturnsUnderlyingPromise(mockDelete, client[type]('filter-id').delete);
          });
        });
      });
    };
    testFilterType('crop');
    testFilterType('watermark');
    testFilterType('deinterlace');
    testFilterType('rotate');
  });

  describe('streams', () => {
    const client = streams(testConfiguration, 'encoding-id', mockHttp);

    describe('stream', () => {
      describe('filters', () => {
        describe('list', () => {
          assertItCallsCorrectUrl(
            'GET',
            '/v1/encoding/encodings/encoding-id/streams/stream-id/filters',
            client('stream-id').filters.list
          );
          assertItReturnsUnderlyingPromise(mockGet, client('stream-id').filters.list);
        });
        describe('add', () => {
          assertItCallsCorrectUrl('POST', '/v1/encoding/encodings/encoding-id/streams/stream-id/filters', () =>
            client('stream-id').filters.add({})
          );
          assertItReturnsUnderlyingPromise(mockPost, () => client('stream-id').filters.add({}));
          assertPayload(mockPost, () => client('stream-id').filters.add({foo: 'bar'}), {foo: 'bar'});
        });
        describe('deleteAll', () => {
          assertItCallsCorrectUrl(
            'DELETE',
            '/v1/encoding/encodings/encoding-id/streams/stream-id/filters',
            client('stream-id').filters.deleteAll
          );
          assertItReturnsUnderlyingPromise(mockDelete, client('stream-id').filters.deleteAll);
        });
        describe('filter', () => {
          describe('delete', () => {
            assertItCallsCorrectUrl(
              'DELETE',
              '/v1/encoding/encodings/encoding-id/streams/stream-id/filters/filter-id',
              client('stream-id').filters('filter-id').delete
            );
            assertItReturnsUnderlyingPromise(mockDelete, client('stream-id').filters('filter-id').delete);
          });
        });
      });
    });
  });
});
