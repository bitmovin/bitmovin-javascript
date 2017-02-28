import {getConfiguration} from '../utils';
import { thumbnails } from '../../bitmovin/encoding/thumbnails';

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

describe('encoding', () => {
  describe('streams', () => {
    beforeEach(testSetup);
    const client = thumbnails(testConfiguration, 'encoding-id', 'stream-id', mockHttp);
    describe('stream', () => {
      describe('thumbnails', () => {
        describe('list', () => {
          assertItCallsCorrectUrl('GET', '/v1/encoding/encodings/encoding-id/streams/stream-id/thumbnails', client.list);
          assertItReturnsUnderlyingPromise(mockGet, client.list);
        });

        describe('add', () => {
          assertItCallsCorrectUrl('POST', '/v1/encoding/encodings/encoding-id/streams/stream-id/thumbnails', client.add);
          assertItReturnsUnderlyingPromise(mockPost, client.add);
        });


        describe('thumbnail', () => {
          describe('details', () => {
            assertItCallsCorrectUrl('GET', '/v1/encoding/encodings/encoding-id/streams/stream-id/thumbnails/thumbnail-id', client('thumbnail-id').details);
            assertItReturnsUnderlyingPromise(mockGet, client('thumbnail-id').details);
          });
          describe('customData', () => {
            assertItCallsCorrectUrl('GET', '/v1/encoding/encodings/encoding-id/streams/stream-id/thumbnails/thumbnail-id/customData', client('thumbnail-id').customData);
            assertItReturnsUnderlyingPromise(mockGet, client('thumbnail-id').customData);
          });
          describe('delete', () => {
            assertItCallsCorrectUrl('DELETE', '/v1/encoding/encodings/encoding-id/streams/stream-id/thumbnails/thumbnail-id', client('thumbnail-id').delete);
            assertItReturnsUnderlyingPromise(mockDelete, client('thumbnail-id').delete);
          });
        })
      });
    });
  });
});
