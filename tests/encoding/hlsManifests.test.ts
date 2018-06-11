import {getConfiguration} from '../utils';
import {hlsManifests} from '../../bitmovin/encoding/manifests/hls';
import {mockHttp, testSetup, assertItCallsUrlAndReturnsPromise} from '../assertions';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests.hls', () => {
    beforeEach(testSetup);
    const client = hlsManifests(testConfiguration, mockHttp);

    describe('list', () => {
      assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/hls', client.list);
    });
    describe('create', () => {
      assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/hls', client.create);
    });
    describe('manifest', () => {
      const manifest = client('manifest-id');
      describe('details', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/hls/manifest-id', manifest.details);
      });
      describe('delete', () => {
        assertItCallsUrlAndReturnsPromise('DELETE', '/v1/encoding/manifests/hls/manifest-id', manifest.delete);
      });
      describe('start', () => {
        assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/hls/manifest-id/start', manifest.start);
      });
      describe('stop', () => {
        assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/hls/manifest-id/stop', manifest.stop);
      });
      describe('status', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/hls/manifest-id/status', manifest.status);
      });
    });
  });
});
