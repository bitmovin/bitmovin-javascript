import {getConfiguration} from '../utils';
import {drms} from '../../bitmovin/encoding/encodings/drms';
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
  assertItReturnsCorrectResponse
} from '../assertions';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('muxings', () => {
    beforeEach(testSetup);

    const testMuxingTypeDrm = muxingType => {
      const drm = drms(testConfiguration, 'encoding-id', muxingType, 'muxing-id', mockHttp);
      describe(muxingType, () => {
        describe('drms', () => {
          describe('list', () => {
            assertItCallsCorrectUrl(
              'GET',
              `/v1/encoding/encodings/encoding-id/muxings/${muxingType}/muxing-id`,
              drm.list
            );
            assertItReturnsUnderlyingPromise(mockGet, drm.list);
          });
          const testDrm = type => {
            describe(type, () => {
              const client = drm[type];
              type = type.toLowerCase();
              describe('list', () => {
                assertItCallsCorrectUrl(
                  'GET',
                  `/v1/encoding/encodings/encoding-id/muxings/${muxingType}/muxing-id/drm/${type}`,
                  client.list
                );
                assertItReturnsUnderlyingPromise(mockGet, client.list);
              });
              describe('add', () => {
                assertItCallsCorrectUrl(
                  'POST',
                  `/v1/encoding/encodings/encoding-id/muxings/${muxingType}/muxing-id/drm/${type}`,
                  client.add
                );
                assertItReturnsUnderlyingPromise(mockPost, client.add);
              });
              describe('drm', () => {
                describe('details', () => {
                  assertItCallsCorrectUrl(
                    'GET',
                    `/v1/encoding/encodings/encoding-id/muxings/${muxingType}/muxing-id/drm/${type}/drm-id`,
                    client('drm-id').details
                  );
                  assertItReturnsUnderlyingPromise(mockGet, client('drm-id').details);
                });
                describe('customData', () => {
                  assertItCallsCorrectUrl(
                    'GET',
                    `/v1/encoding/encodings/encoding-id/muxings/${muxingType}/muxing-id/drm/${type}/drm-id/customData`,
                    client('drm-id').customData
                  );
                  assertItReturnsUnderlyingPromise(mockGet, client('drm-id').customData);
                });
                describe('delete', () => {
                  assertItCallsCorrectUrl(
                    'DELETE',
                    `/v1/encoding/encodings/encoding-id/muxings/${muxingType}/muxing-id/drm/${type}/drm-id`,
                    client('drm-id').delete
                  );
                  assertItReturnsUnderlyingPromise(mockDelete, client('drm-id').delete);
                });
              });
            });
          };
          testDrm('aes');
          testDrm('cenc');
          testDrm('clearKey');
          testDrm('fairPlay');
          testDrm('marlin');
          testDrm('playReady');
          testDrm('primeTime');
          testDrm('widevine');
        });
      });
    };

    testMuxingTypeDrm('fmp4');
    testMuxingTypeDrm('mp4');
    testMuxingTypeDrm('ts');
  });
});
