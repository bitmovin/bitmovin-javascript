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

import {getConfiguration} from '../utils';
import { encodings } from '../../bitmovin/encoding/encodings';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('encodings', () => {
    beforeEach(testSetup);
    const client = encodings(testConfiguration, mockHttp);

    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/encodings', client.list);
      assertItReturnsUnderlyingPromise(mockGet, client.list);
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
