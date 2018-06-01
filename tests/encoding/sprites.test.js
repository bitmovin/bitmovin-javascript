import {getConfiguration} from '../utils';
import {sprites} from '../../bitmovin/encoding/encodings/sprites';
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
    const client = sprites(testConfiguration, 'encoding-id', 'stream-id', mockHttp);
    describe('stream', () => {
      describe('sprites', () => {
        describe('list', () => {
          assertItCallsCorrectUrl('GET', '/v1/encoding/encodings/encoding-id/streams/stream-id/sprites', client.list);
          assertItReturnsUnderlyingPromise(mockGet, client.list);
        });

        describe('add', () => {
          assertItCallsCorrectUrl('POST', '/v1/encoding/encodings/encoding-id/streams/stream-id/sprites', client.add);
          assertItReturnsUnderlyingPromise(mockPost, client.add);
        });

        describe('sprite', () => {
          describe('details', () => {
            assertItCallsCorrectUrl(
              'GET',
              '/v1/encoding/encodings/encoding-id/streams/stream-id/sprites/sprite-id',
              client('sprite-id').details
            );
            assertItReturnsUnderlyingPromise(mockGet, client('sprite-id').details);
          });
          describe('customData', () => {
            assertItCallsCorrectUrl(
              'GET',
              '/v1/encoding/encodings/encoding-id/streams/stream-id/sprites/sprite-id/customData',
              client('sprite-id').customData
            );
            assertItReturnsUnderlyingPromise(mockGet, client('sprite-id').customData);
          });
          describe('delete', () => {
            assertItCallsCorrectUrl(
              'DELETE',
              '/v1/encoding/encodings/encoding-id/streams/stream-id/sprites/sprite-id',
              client('sprite-id').delete
            );
            assertItReturnsUnderlyingPromise(mockDelete, client('sprite-id').delete);
          });
        });
      });
    });
  });
});
