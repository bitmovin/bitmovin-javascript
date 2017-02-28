import { codecConfigurations } from '../../bitmovin/encoding/codecConfigurations';
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

import {getConfiguration} from '../utils';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('codecConfigurations', () => {
    beforeEach(testSetup);

    const client = codecConfigurations(testConfiguration, mockHttp);

    describe('listAll', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/configurations', client.listAll);
      assertItReturnsUnderlyingPromise(mockGet, client.listAll);
    });
    describe('getType', () => {
      assertItCallsCorrectUrl('GET', `/v1/encoding/configurations/encoding-id/type`, () => client.getType('encoding-id'));
      assertItReturnsUnderlyingPromise(mockGet, () => client.getType('encoding-id'));
    });


    const testConfigType = (path, type) => {
      describe(type, () => {
        const typeClient = client[path];
        describe('list', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/configurations`, typeClient.list);
          assertItReturnsUnderlyingPromise(mockGet, typeClient.list);
        });
        describe('create', () => {
          assertItCallsCorrectUrl('POST', `/v1/encoding/configurations`, typeClient.create);
          assertItReturnsUnderlyingPromise(mockPost, typeClient.create);
        });

        describe('item', () => {
          describe('details', () => {
            assertItCallsCorrectUrl('GET', `/v1/encoding/configurations/${type}/config-id`, typeClient('config-id').details);
            assertItReturnsUnderlyingPromise(mockGet, typeClient('config-id').details);
          });
          describe('customData', () => {
            assertItCallsCorrectUrl('GET', `/v1/encoding/configurations/${type}/config-id/customData`, typeClient('config-id').customData);
            assertItReturnsUnderlyingPromise(mockGet, typeClient('config-id').customData);
          });
          describe('delete', () => {
            assertItCallsCorrectUrl('DELETE', `/v1/encoding/configurations/${type}/config-id`, typeClient('config-id').delete);
            assertItReturnsUnderlyingPromise(mockDelete, typeClient('config-id').delete);
          });
        });
      });
    };
    testConfigType('h264', 'video/h264');
    testConfigType('h265', 'video/h265');
    testConfigType('aac', 'audio/aac');

  });
});
