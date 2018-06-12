import {codecConfigurations} from '../../bitmovin/encoding/codecConfigurations';
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
  describe('codecConfigurations', () => {
    beforeEach(testSetup);

    const client = codecConfigurations(testConfiguration, mockHttp);

    describe('list', () => {
      describe('un parameterized list call', () => {
        assertItCallsCorrectUrl('GET', '/v1/encoding/configurations', client.list);
        assertItReturnsUnderlyingPromise(mockGet, client.list);
      });

      describe('list call with limit only', () => {
        const limit = 100;
        const expectedGetParameter = 'limit=' + limit;
        assertItCallsCorrectUrl('GET', '/v1/encoding/configurations\\?' + expectedGetParameter, () =>
          client.list(limit)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(limit));
      });

      describe('list call with offset only', () => {
        const offset = 0;
        const expectedGetParameter = 'offset=' + offset;
        assertItCallsCorrectUrl('GET', '/v1/encoding/configurations\\?' + expectedGetParameter, () =>
          client.list(undefined, offset)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(undefined, offset));
      });

      describe('list call with sort only', () => {
        const sort = 'createdAt:DESC';
        const expectedGetParameter = 'sort=' + sort;
        assertItCallsCorrectUrl('GET', '/v1/encoding/configurations\\?' + expectedGetParameter, () =>
          client.list(undefined, undefined, sort)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(undefined, undefined, sort));
      });

      describe('list call with multiple double filter only', () => {
        const filter = {
          type: ['VOD', 'LIVE'],
          status: ['RUNNING', 'QUEUED']
        };

        const expectedGetParameter = 'type=VOD,LIVE&status=RUNNING,QUEUED';
        assertItCallsCorrectUrl('GET', '/v1/encoding/configurations\\?' + expectedGetParameter, () =>
          client.list(undefined, undefined, undefined, filter)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(undefined, undefined, undefined, filter));
      });

      describe('fully parameterized list call with multiple double filter', () => {
        const limit = 100;
        const offset = 0;
        const sort = 'createdAt:ASC';
        const filter = {
          type: ['VOD', 'LIVE'],
          status: ['RUNNING', 'QUEUED']
        };

        const expectedGetParameter =
          'type=VOD,LIVE&status=RUNNING,QUEUED&limit=' + limit + '&offset=' + offset + '&sort=' + sort;
        assertItCallsCorrectUrl('GET', '/v1/encoding/configurations\\?' + expectedGetParameter, () =>
          client.list(limit, offset, sort, filter)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client.list(limit, offset, sort, filter));
      });
    });

    describe('getType', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/configurations/encoding-id/type', () =>
        client.getType('encoding-id')
      );
      assertItReturnsUnderlyingPromise(mockGet, () => client.getType('encoding-id'));
    });

    const testConfigType = (path, type) => {
      describe(type, () => {
        const typeClient = client[path];
        describe('list', () => {
          assertItCallsCorrectUrl('GET', '/v1/encoding/configurations', typeClient.list);
          assertItReturnsUnderlyingPromise(mockGet, typeClient.list);
        });
        describe('create', () => {
          assertItCallsCorrectUrl('POST', '/v1/encoding/configurations', typeClient.create);
          assertItReturnsUnderlyingPromise(mockPost, typeClient.create);
        });

        describe('item', () => {
          describe('details', () => {
            assertItCallsCorrectUrl(
              'GET',
              `/v1/encoding/configurations/${type}/config-id`,
              typeClient('config-id').details
            );
            assertItReturnsUnderlyingPromise(mockGet, typeClient('config-id').details);
          });
          describe('customData', () => {
            assertItCallsCorrectUrl(
              'GET',
              `/v1/encoding/configurations/${type}/config-id/customData`,
              typeClient('config-id').customData
            );
            assertItReturnsUnderlyingPromise(mockGet, typeClient('config-id').customData);
          });
          describe('delete', () => {
            assertItCallsCorrectUrl(
              'DELETE',
              `/v1/encoding/configurations/${type}/config-id`,
              typeClient('config-id').delete
            );
            assertItReturnsUnderlyingPromise(mockDelete, typeClient('config-id').delete);
          });
        });
      });
    };
    testConfigType('h264', 'video/h264');
    testConfigType('h265', 'video/h265');
    testConfigType('aac', 'audio/aac');
    testConfigType('vp9', 'video/vp9');
    testConfigType('ac3', 'audio/ac3');
    testConfigType('eac3', 'audio/eac3');
    testConfigType('vorbis', 'audio/vorbis');
    testConfigType('opus', 'audio/opus');
    testConfigType('mp2', 'audio/mp2');
    testConfigType('mp3', 'audio/mp3');
    testConfigType('vp8', 'video/vp8');
    testConfigType('mjpeg', 'video/mjpeg');
  });
});
