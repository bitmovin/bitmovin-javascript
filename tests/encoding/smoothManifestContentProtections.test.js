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
import { contentProtection } from '../../bitmovin/encoding/manifests/smooth/smoothManifestContentProtections.js';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests.smooth', () => {
    describe('contentprotection', () => {
      beforeEach(testSetup);
      const client = contentProtection(testConfiguration, 'manifest-id', mockHttp);

      describe('list', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/smooth/manifest-id/contentprotection', client.list);
      });
      describe('add', () => {
        assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/smooth/manifest-id/contentprotection', client.add);
      });
      describe('protection', () => {
        describe('details', () => {
          assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/smooth/manifest-id/contentprotection/protection-id', client('protection-id').details);
        });
        describe('delete', () => {
          assertItCallsUrlAndReturnsPromise('DELETE', '/v1/encoding/manifests/smooth/manifest-id/contentprotection/protection-id', client('protection-id').delete);
        });
      });

    });
  });
});

