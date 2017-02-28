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

import { dashManifests } from '../../bitmovin/encoding/dashManifests';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests.dash', () => {
    beforeEach(testSetup);
    const client = dashManifests(testConfiguration, mockHttp);

    describe('list', () => {
      assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/dash', client.list);
    });
    describe('create', () => {
      assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/dash', client.create);
    });
    describe('manifest', () => {
      const manifest = client('manifest-id');
      describe('details', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/dash/manifest-id', manifest.details);
      });
      describe('delete', () => {
        assertItCallsUrlAndReturnsPromise('DELETE', '/v1/encoding/manifests/dash/manifest-id', manifest.delete);
      });
      describe('start', () => {
        assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/dash/manifest-id/start', manifest.start);
      });
      describe('stop', () => {
        assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/dash/manifest-id/stop', manifest.stop);
      });
      describe('status', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/dash/manifest-id/status', manifest.status);
      });
    });
  });
});
