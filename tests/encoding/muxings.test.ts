import {muxings} from '../../bitmovin/encoding/encodings/muxings';
import {
  assertItCallsCorrectUrl,
  assertItCallsUrlAndReturnsPromise,
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
  describe('muxings', () => {
    beforeEach(testSetup);
    const mux = muxings(testConfiguration, 'encoding-id', mockHttp);

    const testMuxing = type => {
      const client = mux[type];
      describe(type, () => {
        describe('list', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/encodings/encoding-id/muxings/${type}`, client.list);
          assertItReturnsUnderlyingPromise(mockGet, client.list);
        });
        describe('add', () => {
          assertItCallsCorrectUrl('POST', `/v1/encoding/encodings/encoding-id/muxings/${type}`, client.add);
          assertItReturnsUnderlyingPromise(mockPost, client.add);
        });

        describe('muxing', () => {
          describe('details', () => {
            assertItCallsCorrectUrl(
              'GET',
              `/v1/encoding/encodings/encoding-id/muxings/${type}/muxing-id`,
              client('muxing-id').details
            );
            assertItReturnsUnderlyingPromise(mockGet, client('muxing-id').details);
          });
          describe('customData', () => {
            assertItCallsCorrectUrl(
              'GET',
              `/v1/encoding/encodings/encoding-id/muxings/${type}/muxing-id/customData`,
              client('muxing-id').customData
            );
            assertItReturnsUnderlyingPromise(mockGet, client('muxing-id').details);
          });
          describe('delete', () => {
            assertItCallsCorrectUrl(
              'DELETE',
              `/v1/encoding/encodings/encoding-id/muxings/${type}/muxing-id`,
              client('muxing-id').delete
            );
            assertItReturnsUnderlyingPromise(mockDelete, client('muxing-id').delete);
          });
        });
      });
    };

    testMuxing('fmp4');
    testMuxing('mp4');
    testMuxing('ts');
    testMuxing('webm');
  });

  describe('broadcastTs', () => {
    beforeEach(testSetup);
    const type = 'broadcast-ts';
    const client = muxings(testConfiguration, 'encoding-id', mockHttp);

    describe('list', () => {
      assertItCallsCorrectUrl('GET', `/v1/encoding/encodings/encoding-id/muxings/${type}`, client.broadcastTs.list);
      assertItReturnsUnderlyingPromise(mockGet, client.broadcastTs.list);
    });

    describe('add', () => {
      assertItCallsCorrectUrl('POST', `/v1/encoding/encodings/encoding-id/muxings/${type}`, client.broadcastTs.add);
      assertItReturnsUnderlyingPromise(mockPost, client.broadcastTs.add);
    });

    describe('muxing', () => {
      describe('details', () => {
        assertItCallsCorrectUrl(
          'GET',
          `/v1/encoding/encodings/encoding-id/muxings/${type}/muxing-id`,
          client.broadcastTs('muxing-id').details
        );
        assertItReturnsUnderlyingPromise(mockGet, client.broadcastTs('muxing-id').details);
      });
      describe('customData', () => {
        assertItCallsCorrectUrl(
          'GET',
          `/v1/encoding/encodings/encoding-id/muxings/${type}/muxing-id/customData`,
          client.broadcastTs('muxing-id').customData
        );
        assertItReturnsUnderlyingPromise(mockGet, client.broadcastTs('muxing-id').details);
      });
      describe('delete', () => {
        assertItCallsCorrectUrl(
          'DELETE',
          `/v1/encoding/encodings/encoding-id/muxings/${type}/muxing-id`,
          client.broadcastTs('muxing-id').delete
        );
        assertItReturnsUnderlyingPromise(mockDelete, client.broadcastTs('muxing-id').delete);
      });
    });
  });

  describe('Muxings list all', () => {
    beforeEach(testSetup);
    const client = muxings(testConfiguration, 'encoding-id', mockHttp);
    describe('list', () => {
      assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/encodings/encoding-id/muxings', client.list);
    });
  });
});
