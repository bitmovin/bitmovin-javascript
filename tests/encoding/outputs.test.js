import {getConfiguration} from '../utils';
import { outputs } from '../../bitmovin/encoding/outputs';

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
  describe('outputs', () => {
    beforeEach(testSetup);
    const client = outputs(testConfiguration, mockHttp);

    
    const testBitmovinOutput = (type) => {
      describe('bitmovin/' + type, () => {
        describe('list', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/outputs/bitmovin/${type}`, client.bitmovin[type].list);
          assertItReturnsUnderlyingPromise(mockGet, client.bitmovin[type].list);
        });
        describe('item', () => {
          describe('details', () => {
            assertItCallsCorrectUrl('GET', `/v1/encoding/outputs/bitmovin/${type}/output-id`, client.bitmovin[type]('output-id').details);
            assertItReturnsUnderlyingPromise(mockPost, client.bitmovin[type]('output-id').details);
          });
        });
      });
    }

    const testOutputType = (type) => {
      describe(type, () => {
        describe('list', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/outputs/${type}`, client[type].list);
          assertItReturnsUnderlyingPromise(mockGet, client[type].list);
        });
        describe('create', () => {
          assertItCallsCorrectUrl('POST', `/v1/encoding/outputs/${type}`, () => client[type].create({}));
          assertItReturnsUnderlyingPromise(mockPost, client[type].list);
        });
        describe('item', () => {
          describe('details', () => {
            assertItCallsCorrectUrl('GET', `/v1/encoding/outputs/${type}/output-id`, client[type]('output-id').details);
            assertItReturnsUnderlyingPromise(mockPost, client[type]('output-id').details);
          });
          describe('customData', () => {
            assertItCallsCorrectUrl('GET', `/v1/encoding/outputs/${type}/output-id/customData`, client[type]('output-id').customData);
            assertItReturnsUnderlyingPromise(mockPost, client[type]('output-id').customData);
          });
          describe('delete', () => {
            assertItCallsCorrectUrl('DELETE', `/v1/encoding/outputs/${type}/output-id`, client[type]('output-id').delete);
            assertItReturnsUnderlyingPromise(mockDelete, client[type]('output-id').delete);
          });
        });
      });
    }

    testOutputType('azure');
    testOutputType('ftp');
    testOutputType('gcs');
    testOutputType('s3');
    testOutputType('sftp');
    testBitmovinOutput('aws');
    testBitmovinOutput('gcp');
    //TODO: Is aspera really missing from outputs?
    //testOutputType('aspera');

    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/outputs', client.list);
      assertItReturnsUnderlyingPromise(mockGet, client.list);
    });
    describe('getType', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/outputs/output-id/type', () => client.getType('output-id'));
      assertItReturnsUnderlyingPromise(mockGet, () => client.getType('output-id'));
    });
  });
});
