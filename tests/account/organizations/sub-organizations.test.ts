import * as urljoin from 'url-join';

import {subOrganizations} from '../../../bitmovin/account/organizations/sub-organizations';
import {
  assertItCallsCorrectUrl,
  assertItReturnsUnderlyingPromise,
  mockGet,
  mockHttp,
  testSetup
} from '../../assertions';

import {getConfiguration} from '../../utils';
const testConfiguration = getConfiguration();

describe('account', () => {
  beforeEach(testSetup);
  describe('organizations', () => {
    describe('sub-organizations', () => {
      const testOrgId = '123';
      const client = subOrganizations(testConfiguration, testOrgId, mockHttp);

      describe('list', () => {
        assertItCallsCorrectUrl(
          'GET',
          urljoin('/v1/account/organizations', testOrgId, 'sub-organizations'),
          client.list
        );
        assertItReturnsUnderlyingPromise(mockGet, client.list);
      });
    });
  });
});
