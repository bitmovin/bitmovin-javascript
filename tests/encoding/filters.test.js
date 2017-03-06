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
