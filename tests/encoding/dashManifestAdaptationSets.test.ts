import {adaptationSets} from '../../bitmovin/encoding/manifests/dash/dashManifestAdaptationSets';
import {assertItCallsUrlAndReturnsPromise, mockHttp, testSetup} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests.dash', () => {
    describe('periods', () => {
      describe('adaptationSets', () => {
        beforeEach(testSetup);
        const client = adaptationSets(testConfiguration, 'manifest-id', 'period-id', mockHttp);

        describe('detail subpath', () => {
          it('should return object containing representations', () => {
            expect(client('foo').representations).toBeDefined();
          });
          it('should return object containing contentProtections', () => {
            expect(client('foo').contentProtections).toBeDefined();
          });
        });

        const testType = (type, url = type) => {
          describe(type, () => {
            const typeClient = client[type];
            describe('create', () => {
              assertItCallsUrlAndReturnsPromise(
                'POST',
                `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/${url}`,
                typeClient.create
              );
            });
            describe('list', () => {
              assertItCallsUrlAndReturnsPromise(
                'GET',
                `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/${url}`,
                typeClient.list
              );
            });

            describe('adaptation-set', () => {
              const setClient = typeClient('adaptationset-id');
              describe('details', () => {
                assertItCallsUrlAndReturnsPromise(
                  'GET',
                  `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/${url}/adaptationset-id`,
                  setClient.details
                );
              });
              describe('delete', () => {
                assertItCallsUrlAndReturnsPromise(
                  'DELETE',
                  `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/${url}/adaptationset-id`,
                  setClient.delete
                );
              });
            });
          });
        };
        testType('audio');
      });
    });
  });
});
