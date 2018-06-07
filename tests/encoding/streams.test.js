import {getConfiguration} from '../utils';
import {streams} from '../../bitmovin/encoding/encodings/streams';
import {
  mockGet,
  mockPost,
  mockDelete,
  mockHttp,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup
} from '../assertions';

let testConfiguration = getConfiguration();
describe('encoding', () => {
  describe('streams', () => {
    beforeEach(testSetup);
    const client = streams(testConfiguration, 'encoding-id', mockHttp);

    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/encodings/encoding-id/streams', client.list);
      assertItReturnsUnderlyingPromise(mockGet, client.list);
    });
    describe('add', () => {
      assertItCallsCorrectUrl('POST', '/v1/encoding/encodings/encoding-id/streams', () => client.add({}));
      assertItReturnsUnderlyingPromise(mockPost, () => client.add({}));
    });

    describe('stream', () => {
      describe('details', () => {
        assertItCallsCorrectUrl(
          'GET',
          '/v1/encoding/encodings/encoding-id/streams/stream-id',
          client('stream-id').details
        );
        assertItReturnsUnderlyingPromise(mockGet, client('stream-id').details);
      });
      describe('customData', () => {
        assertItCallsCorrectUrl(
          'GET',
          '/v1/encoding/encodings/encoding-id/streams/stream-id/customData',
          client('stream-id').customData
        );
        assertItReturnsUnderlyingPromise(mockGet, client('stream-id').details);
      });
      describe('delete', () => {
        assertItCallsCorrectUrl(
          'DELETE',
          '/v1/encoding/encodings/encoding-id/streams/stream-id',
          client('stream-id').delete
        );
        assertItReturnsUnderlyingPromise(mockDelete, client('stream-id').delete);
      });
      describe('inputDetails', () => {
        assertItCallsCorrectUrl(
          'GET',
          '/v1/encoding/encodings/encoding-id/streams/stream-id/input',
          client('stream-id').inputDetails
        );
        assertItReturnsUnderlyingPromise(mockGet, client('stream-id').inputDetails);
      });
    });
  });
});
