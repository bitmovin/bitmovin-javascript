import {getConfiguration} from '../utils';
import { inputs } from '../../bitmovin/encoding/inputs';

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
  describe('inputs', () => {
    beforeEach(testSetup);

    const client = inputs(testConfiguration, mockHttp);

    const testInputType = (type) => {
      describe(type, () => {
        describe('list', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/inputs/${type}`, client[type].list);
          assertItReturnsUnderlyingPromise(mockGet, client[type].list);
        });
        describe('create', () => {
          assertItCallsCorrectUrl('POST', `/v1/encoding/inputs/${type}`, () => client[type].create({}));
          assertItReturnsUnderlyingPromise(mockPost, client[type].list);
        });
        describe('item', () => {
          describe('details', () => {
            assertItCallsCorrectUrl('GET', `/v1/encoding/inputs/${type}/input-id`, client[type]('input-id').details);
            assertItReturnsUnderlyingPromise(mockPost, client[type]('input-id').details);
          });
          describe('customData', () => {
            assertItCallsCorrectUrl('GET', `/v1/encoding/inputs/${type}/input-id/customData`, client[type]('input-id').customData);
            assertItReturnsUnderlyingPromise(mockPost, client[type]('input-id').customData);
          });
          describe('delete', () => {
            assertItCallsCorrectUrl('DELETE', `/v1/encoding/inputs/${type}/input-id`, client[type]('input-id').delete);
            assertItReturnsUnderlyingPromise(mockDelete, client[type]('input-id').delete);
          });
        });
      });
    }

    testInputType('aspera');
    testInputType('azure');
    testInputType('ftp');
    testInputType('gcs');
    testInputType('http');
    testInputType('https');
    testInputType('s3');
    testInputType('sftp');

    describe('rtmp', () => {
      describe('list', () => {
        assertItCallsCorrectUrl('GET', `/v1/encoding/inputs/rtmp`, client.rtmp.list);
        assertItReturnsUnderlyingPromise(mockGet, client.rtmp.list);
      });
      describe('details', () => {
        assertItCallsCorrectUrl('GET', `/v1/encoding/inputs/rtmp/input-id`, client.rtmp('input-id').details);
        assertItReturnsUnderlyingPromise(mockGet, client.rtmp('input-id').details);
      });
    });
    describe('genericS3', () => {
      const urlPart = 'generic-s3';
      const type = 'genericS3';
      describe('list', () => {
        assertItCallsCorrectUrl('GET', `/v1/encoding/inputs/generic-s3`, client.genericS3.list);
        assertItReturnsUnderlyingPromise(mockGet, client.genericS3.list);
      });
      describe('item', () => {
        describe('details', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/inputs/${urlPart}/input-id`, client[type]('input-id').details);
          assertItReturnsUnderlyingPromise(mockGet, () => client[type]('input-id').details());
        });
        describe('customData', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/inputs/${urlPart}/input-id/customData`, client[type]('input-id').customData);
          assertItReturnsUnderlyingPromise(mockGet, client[type]('input-id').customData);
        });
        describe('delete', () => {
          assertItCallsCorrectUrl('DELETE', `/v1/encoding/inputs/${urlPart}/input-id`, client[type]('input-id').delete);
          assertItReturnsUnderlyingPromise(mockDelete, client[type]('input-id').delete);
        });
      });
    });

    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/inputs', client.list);
      assertItReturnsUnderlyingPromise(mockGet, client.list);
    });
    describe('getType', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/inputs/input-id/type', () => client.getType('input-id'));
      assertItReturnsUnderlyingPromise(mockGet, () => client.getType('input-id'));
    });
  });
});
