import {customXmlElements} from '../../bitmovin/encoding/manifests/dash/dashManifestCustomXmlElements';
import {assertItCallsUrlAndReturnsPromise, mockHttp, testSetup} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests.dash', () => {
    describe('periods', () => {
      beforeEach(testSetup);
      const client = customXmlElements(testConfiguration, 'manifest-id', 'period-id', mockHttp);

      describe('list', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests/dash/manifest-id/periods/period-id/custom-xml-elements', client.list);
      });
      describe('add', () => {
        assertItCallsUrlAndReturnsPromise('POST', '/v1/encoding/manifests/dash/manifest-id/periods/period-id/custom-xml-elements', client.add);
      });
      describe('customXmlElement', () => {
        const customXmlElement = client('custom-xml-element-id');
        describe('details', () => {
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/manifests/dash/manifest-id/periods/period-id/custom-xml-elements/custom-xml-element-id',
            customXmlElement.details
          );
        });
        describe('delete', () => {
          assertItCallsUrlAndReturnsPromise(
            'DELETE',
            '/v1/encoding/manifests/dash/manifest-id/periods/period-id/custom-xml-elements/custom-xml-element-id',
            customXmlElement.delete
          );
        });
      });
    });
  });
});
