import * as urljoin from 'url-join';

import {tenants} from '../../../bitmovin/account/organizations/tenants';
import {
  assertItCallsCorrectUrl,
  assertItReturnsUnderlyingPromise,
  mockDelete,
  mockGet,
  mockHttp,
  mockPost,
  testSetup
} from '../../assertions';
import {getConfiguration} from '../../utils';

const testConfiguration = getConfiguration();

describe('account', () => {
  beforeEach(testSetup);
  describe('organizations', () => {
    describe('groups', () => {
      describe('tenants', () => {
        const testOrgId = '123';
        const testGroupId = '123';

        const client = tenants(testConfiguration, testOrgId, testGroupId, mockHttp);

        describe('list', () => {
          assertItCallsCorrectUrl(
            'GET',
            urljoin('/v1/account/organizations', testOrgId, 'groups', testGroupId, 'tenants'),
            client.list
          );
          assertItReturnsUnderlyingPromise(mockGet, client.list);
        });

        describe('add', () => {
          assertItCallsCorrectUrl(
            'POST',
            urljoin('/v1/account/organizations', testOrgId, 'groups', testGroupId, 'tenants'),
            client.add
          );
          assertItReturnsUnderlyingPromise(mockPost, client.add);
        });

        describe('tenant', () => {
          const testTenantId = '123';

          describe('details', () => {
            assertItCallsCorrectUrl(
              'GET',
              urljoin('/v1/account/organizations', testOrgId, 'groups', testGroupId, 'tenants', testTenantId),
              client(testGroupId).details
            );
            assertItReturnsUnderlyingPromise(mockGet, client(testOrgId).details);
          });
          describe('delete', () => {
            assertItCallsCorrectUrl(
              'DELETE',
              urljoin('/v1/account/organizations', testOrgId, 'groups', testGroupId, 'tenants', testTenantId),
              client(testGroupId).delete
            );
            assertItReturnsUnderlyingPromise(mockDelete, client(testOrgId).delete);
          });
        });
      });
    });
  });
});
