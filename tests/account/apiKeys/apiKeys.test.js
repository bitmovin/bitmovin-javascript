import apiKeys from '../../../bitmovin/account/apiKeys/apiKeys';
import {
  mockGet,
  mockPut,
  mockHttp,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup
} from '../../assertions';
import {getConfiguration} from '../../utils';

let testConfiguration = getConfiguration();

describe('apiKeys', () => {
  beforeEach(testSetup);

  describe('should list all api keys', () =>  {
    const client = apiKeys(testConfiguration, mockHttp);
    assertItCallsCorrectUrl('GET', '/v1/account/api-keys', client.list);
    assertItReturnsUnderlyingPromise(mockGet, client);
  });

  describe('should create an api key', () =>  {
    const client = apiKeys(testConfiguration, mockHttp);
    assertItCallsCorrectUrl('POST', '/v1/account/api-keys', client.create);
    assertItReturnsUnderlyingPromise(mockGet, client);
  });

  describe('should get the api key', () =>  {
    const client = apiKeys(testConfiguration, mockHttp);
    assertItCallsCorrectUrl('GET', '/v1/account/api-keys/aaaaaaaaaa', () => client('aaaaaaaaaa'));
    assertItReturnsUnderlyingPromise(mockGet, client);
  });

  describe('should delete the api key', () =>  {
    const client = apiKeys(testConfiguration, mockHttp);
    assertItCallsCorrectUrl('DELETE', '/v1/account/api-keys/aaaaaaaaaa', () => client.delete('aaaaaaaaaa'));
    assertItReturnsUnderlyingPromise(mockGet, client);
  });
});
