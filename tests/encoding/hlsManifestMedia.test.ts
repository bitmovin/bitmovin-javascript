import {hlsManifestMedia} from '../../bitmovin/encoding/manifests/hls/hlsManifestMedia';
import {assertItCallsUrlAndReturnsPromise, mockHttp, testSetup} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests.hls', () => {
    describe('media', () => {
      beforeEach(testSetup);
      const testType = (type, url = type) => {
        describe(type, () => {
          const client = hlsManifestMedia(testConfiguration, 'manifest-id', mockHttp)[type];
          describe('list', () => {
            assertItCallsUrlAndReturnsPromise(
              'GET',
              `/v1/encoding/manifests/hls/manifest-id/media/${url}`,
              client.list
            );
          });
          describe('add', () => {
            assertItCallsUrlAndReturnsPromise(
              'POST',
              `/v1/encoding/manifests/hls/manifest-id/media/${url}`,
              client.add
            );
          });
          describe('item', () => {
            describe('details', () => {
              assertItCallsUrlAndReturnsPromise(
                'GET',
                `/v1/encoding/manifests/hls/manifest-id/media/${url}/media-id`,
                client('media-id').details
              );
            });
            describe('delete', () => {
              assertItCallsUrlAndReturnsPromise(
                'DELETE',
                `/v1/encoding/manifests/hls/manifest-id/media/${url}/media-id`,
                client('media-id').delete
              );
            });
          });
        });
      };
      testType('video');
      testType('audio');
      testType('subtitles');
      testType('closedCaptions', 'closed-captions');
    });
  });
});
