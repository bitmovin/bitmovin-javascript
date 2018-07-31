import {representations} from '../../bitmovin/encoding/manifests/dash/dashManifestRepresentations';
import {assertItCallsUrlAndReturnsPromise, mockHttp, testSetup} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests.dash', () => {
    describe('periods', () => {
      describe('adaptationSets', () => {
        describe('representations', () => {
          beforeEach(testSetup);
          const testType = (type, url = type) => {
            const client = representations(testConfiguration, 'manifest-id', 'period-id', 'adaptationset-id', mockHttp)[
              type
            ];

            describe(type, () => {
              describe('list', () => {
                assertItCallsUrlAndReturnsPromise(
                  'GET',
                  `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/adaptationset-id/representations/${url}`,
                  client.list
                );
              });
              describe('add', () => {
                assertItCallsUrlAndReturnsPromise(
                  'POST',
                  `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/adaptationset-id/representations/${url}`,
                  client.add
                );
              });
              describe('representation', () => {
                const repClient = client('representation-id');
                describe('details', () => {
                  assertItCallsUrlAndReturnsPromise(
                    'GET',
                    `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/adaptationset-id/representations/${url}/representation-id`,
                    repClient.details
                  );
                });
                describe('delete', () => {
                  assertItCallsUrlAndReturnsPromise(
                    'DELETE',
                    `/v1/encoding/manifests/dash/manifest-id/periods/period-id/adaptationsets/adaptationset-id/representations/${url}/representation-id`,
                    repClient.delete
                  );
                });
                describe('has contentprotections', () => {
                  expect(repClient.contentProtections).toBeDefined();
                });
              });
            });
          };

          testType('fmp4');
          testType('drmFmp4', 'fmp4/drm');
          testType('sidecar');
          testType('mp4');
          testType('drmMp4', 'mp4/drm');
          testType('webm');
        });
      });
    });
  });
});
