import {getConfiguration} from '../utils';

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

import { hlsManifestStreams } from '../../bitmovin/encoding/manifests/hls/hlsManifestStreams';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests.hls', () => {
    describe('streams', () => {
      beforeEach(testSetup);
      const client = hlsManifestStreams(testConfiguration, 'manifest-id', mockHttp);

      describe('list', () => {
        assertItCallsUrlAndReturnsPromise('GET', `/v1/encoding/manifests/hls/manifest-id/streams`, client.list);
      });
      describe('add', () => {
        assertItCallsUrlAndReturnsPromise('POST', `/v1/encoding/manifests/hls/manifest-id/streams`, client.add);
      });
      describe('stream', () => {
        const stream = client('stream-id');
        describe('details', () => {
          assertItCallsUrlAndReturnsPromise('GET', `/v1/encoding/manifests/hls/manifest-id/streams/stream-id`, stream.details);
        });
        describe('delete', () => {
          assertItCallsUrlAndReturnsPromise('DELETE', `/v1/encoding/manifests/hls/manifest-id/streams/stream-id`, stream.delete);
        });
      });
    });
  });
});
