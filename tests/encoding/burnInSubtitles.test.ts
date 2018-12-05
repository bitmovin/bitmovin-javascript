import {burnInSubtitles} from '../../bitmovin/encoding/encodings/streams/burnInSubtitles';
import {
  assertItCallsCorrectUrl,
  assertItReturnsUnderlyingPromise,
  mockDelete,
  mockGet,
  mockHttp,
  mockPost,
  testSetup
} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('streams', () => {
    beforeEach(testSetup);
    const burnInSubtitle = burnInSubtitles(testConfiguration, 'encoding-id', 'stream-id', mockHttp);
    describe('stream', () => {
      describe('burnInSubtitles', () => {
        const testBurnInSubtitleType = type => {
          describe(type, () => {
            const client = burnInSubtitle[type];
            type = type.toLowerCase();
            describe('list', () => {
              assertItCallsCorrectUrl(
                'GET',
                `/v1/encoding/encodings/encoding-id/streams/stream-id/burn-in-subtitles/${type}`,
                client.list
              );
              assertItReturnsUnderlyingPromise(mockGet, client.list);
            });
            describe('add', () => {
              assertItCallsCorrectUrl(
                'POST',
                `/v1/encoding/encodings/encoding-id/streams/stream-id/burn-in-subtitles/${type}`,
                client.add
              );
              assertItReturnsUnderlyingPromise(mockPost, client.add);
            });
            describe('burnInSubtitle', () => {
              describe('details', () => {
                assertItCallsCorrectUrl(
                  'GET',
                  `/v1/encoding/encodings/encoding-id/streams/stream-id/burn-in-subtitles/${type}/burn-in-subtitle-id`,
                  client('burn-in-subtitle-id').details
                );
                assertItReturnsUnderlyingPromise(mockGet, client('burn-in-subtitle-id').details);
              });
              describe('delete', () => {
                assertItCallsCorrectUrl(
                  'DELETE',
                  `/v1/encoding/encodings/encoding-id/streams/stream-id/burn-in-subtitles/${type}/burn-in-subtitle-id`,
                  client('burn-in-subtitle-id').delete
                );
                assertItReturnsUnderlyingPromise(mockDelete, client('burn-in-subtitle-id').delete);
              });
            });
          });
        };
        testBurnInSubtitleType('srt');
      });
    });
  });
});
