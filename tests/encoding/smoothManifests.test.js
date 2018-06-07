import {getConfiguration} from '../utils';
import {mockHttp, testSetup, assertItCallsUrlAndReturnsPromise} from '../assertions';
import {smoothManifests} from '../../bitmovin/encoding/manifests/smooth/smoothManifests';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests.smooth', () => {
    beforeEach(testSetup);
    const client = smoothManifests(testConfiguration, mockHttp);

    describe('list', () => {
      assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/smooth', client.list);
    });
    describe('create', () => {
      assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/smooth', client.create);
    });
    describe('manifest', () => {
      const manifest = client('manifest-id');
      describe('details', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/smooth/manifest-id', manifest.details);
      });
      describe('delete', () => {
        assertItCallsUrlAndReturnsPromise('DELETE', '/v1/encoding/manifests/smooth/manifest-id', manifest.delete);
      });
      describe('start', () => {
        assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/smooth/manifest-id/start', manifest.start);
      });
      describe('stop', () => {
        assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/smooth/manifest-id/stop', manifest.stop);
      });
      describe('status', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/smooth/manifest-id/status', manifest.status);
      });
    });
  });
});
