import {dashManifestPeriods} from '../../bitmovin/encoding/manifests/dash/dashManifestPeriods';
import {assertItCallsUrlAndReturnsPromise, mockHttp, testSetup} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests.dash', () => {
    describe('periods', () => {
      beforeEach(testSetup);
      const client = dashManifestPeriods(testConfiguration, 'manifest-id', mockHttp);

      describe('list', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/dash/manifest-id/periods', client.list);
      });
      describe('add', () => {
        assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/dash/manifest-id/periods', client.add);
      });
      describe('period', () => {
        const period = client('period-id');
        describe('details', () => {
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/manifests/dash/manifest-id/periods/period-id',
            period.details
          );
        });
        describe('delete', () => {
          assertItCallsUrlAndReturnsPromise(
            'DELETE',
            '/v1/encoding/manifests/dash/manifest-id/periods/period-id',
            period.delete
          );
        });
      });
    });
  });
});
