import {mockHttp, testSetup, assertItCallsUrlAndReturnsPromise} from '../assertions';
import {getConfiguration} from '../utils';
import {contentProtections} from '../../bitmovin/encoding/manifests/dash/dashManifestContentProtections';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests.dash', () => {
    describe('periods', () => {
      describe('adaptationSets', () => {
        describe('representations', () => {
          const testType = (type, url = type) => {
            describe(type, () => {
              beforeEach(testSetup);
              const info = {
                type: url,
                id: 'representation-id'
              };
              const client = contentProtections(
                testConfiguration,
                'manifest-id',
                'period-id',
                'adaptationset-id',
                info,
                mockHttp
              );

              describe('list', () => {
                assertItCallsUrlAndReturnsPromise(
                  'GET',
                  `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/adaptationset-id/representations/${url}/representation-id/contentprotection`,
                  client.list
                );
              });
              describe('add', () => {
                assertItCallsUrlAndReturnsPromise(
                  'POST',
                  `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/adaptationset-id/representations/${url}/representation-id/contentprotection`,
                  client.add
                );
              });
              describe('representation', () => {
                const protectionClient = client('protection-id');
                describe('details', () => {
                  assertItCallsUrlAndReturnsPromise(
                    'GET',
                    `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/adaptationset-id/representations/${url}/representation-id/contentprotection/protection-id`,
                    protectionClient.details
                  );
                });
                describe('delete', () => {
                  assertItCallsUrlAndReturnsPromise(
                    'DELETE',
                    `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/adaptationset-id/representations/${url}/representation-id/contentprotection/protection-id`,
                    protectionClient.delete
                  );
                });
              });
            });
          };
          testType('fmp4');
        });
      });
    });
  });
});
