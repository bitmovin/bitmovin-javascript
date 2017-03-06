import { getConfiguration } from '../utils';
import { streams } from '../../bitmovin/encoding/streams';
import { filters } from '../../bitmovin/encoding/filters';

import {
  mockGet,
  mockPost,
  mockDelete,
  mockHttp,
  assertPayload,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup,
} from '../assertions';

const testConfiguration = getConfiguration();
describe('encoding', () => {
  beforeEach(testSetup);

  describe('filters', () => {
    const client = filters(testConfiguration, mockHttp);

    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/filters', client.list);
      assertItReturnsUnderlyingPromise(mockGet, client.list);
    });

    const testFilterType = (type) => {
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
            assertItCallsCorrectUrl('GET', `/v1/encoding/filters/${type}/filter-id/customData`, client[type]('filter-id').customData);
            assertItReturnsUnderlyingPromise(mockGet, client[type]('filter-id').customData);
          });

          describe('delete', () => {
            assertItCallsCorrectUrl('DELETE', `/v1/encoding/filters/${type}/filter-id`, client[type]('filter-id').delete);
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
          // Should we really call this list
          assertItCallsCorrectUrl('GET', '/v1/encoding/encodings/encoding-id/streams/stream-id/filters', client('stream-id').filters.list);
          assertItReturnsUnderlyingPromise(mockGet, client('stream-id').filters.list);
        });
        describe('add', () => {
          assertItCallsCorrectUrl('POST', '/v1/encoding/encodings/encoding-id/streams/stream-id/filters', () => client('stream-id').filters.add({}));
          assertItReturnsUnderlyingPromise(mockPost, () => client('stream-id').filters.add({}));
          assertPayload(mockPost, () => client('stream-id').filters.add({ foo: 'bar' }), { foo: 'bar' });
        });
        describe('deleteAll', () => {
          assertItCallsCorrectUrl('DELETE', '/v1/encoding/encodings/encoding-id/streams/stream-id/filters', client('stream-id').filters.deleteAll);
          assertItReturnsUnderlyingPromise(mockDelete, client('stream-id').filters.deleteAll);
        });
        describe('filter', () => {
          describe('delete', () => {
            assertItCallsCorrectUrl('DELETE', '/v1/encoding/encodings/encoding-id/streams/stream-id/filters/filter-id', client('stream-id').filters('filter-id').delete);
            assertItReturnsUnderlyingPromise(mockDelete, client('stream-id').filters('filter-id').delete);
          });
        });
      });
    });
  });
});
