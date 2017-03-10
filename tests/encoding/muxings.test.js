import { muxings } from '../../bitmovin/encoding/muxings';

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

import {getConfiguration} from '../utils';

let testConfiguration = getConfiguration();
describe('encoding', () => {
  describe('muxings', () => {
    beforeEach(testSetup);
    const mux = muxings(testConfiguration, 'encoding-id', mockHttp);

    const testMuxing = (type) => {
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
            assertItCallsCorrectUrl('GET', `/v1/encoding/encodings/encoding-id/muxings/${type}/muxing-id`, client('muxing-id').details);
            assertItReturnsUnderlyingPromise(mockGet, client('muxing-id').details);
          });
          describe('customData', () => {
            assertItCallsCorrectUrl('GET', `/v1/encoding/encodings/encoding-id/muxings/${type}/muxing-id/customData`, client('muxing-id').customData);
            assertItReturnsUnderlyingPromise(mockGet, client('muxing-id').details);
          });
          describe('delete', () => {
            assertItCallsCorrectUrl('DELETE', `/v1/encoding/encodings/encoding-id/muxings/${type}/muxing-id`, client('muxing-id').delete);
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

  describe('Muxings list all', () => {
    beforeEach(testSetup);
    const client = muxings(testConfiguration, 'encoding-id', mockHttp);
    describe('list', () => {
      assertItCallsUrlAndReturnsPromise('GET', `/v1/encoding/encodings/encoding-id/muxings`, client.list);
    });
  })
});
