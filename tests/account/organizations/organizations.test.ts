import {organizations} from '../../../bitmovin/account/organizations';
import {
  mockGet,
  mockPost,
  mockDelete,
  mockHttp,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup
} from '../../assertions';
import {getConfiguration} from '../../utils';

let testConfiguration = getConfiguration();

describe('account', () => {
  beforeEach(testSetup);
  describe('organizations', () => {
    const client = organizations(testConfiguration, mockHttp);
    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/account/organizations', client.list);
      assertItReturnsUnderlyingPromise(mockGet, client.list);
    });
    describe('add', () => {
      assertItCallsCorrectUrl('POST', '/v1/account/organizations', client.add);
      assertItReturnsUnderlyingPromise(mockPost, client.add);
    });
    describe('organization', () => {
      describe('details', () => {
        assertItCallsCorrectUrl('GET', '/v1/account/organizations/org-id', client('org-id').details);
        assertItReturnsUnderlyingPromise(mockGet, client('org-id').details);
      });
      describe('delete', () => {
        assertItCallsCorrectUrl('DELETE', '/v1/account/organizations/org-id', client('org-id').delete);
        assertItReturnsUnderlyingPromise(mockDelete, client('org-id').delete);
      });
    });
  });
});
