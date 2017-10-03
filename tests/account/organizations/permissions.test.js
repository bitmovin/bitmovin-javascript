import urljoin from 'url-join';
import { permissions } from '../../../bitmovin/account/organizations/permissions';

import {
  mockGet,
  mockPost,
  mockDelete,
  mockHttp,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup,
} from '../../assertions';

import {getConfiguration} from '../../utils';

let testConfiguration = getConfiguration();

describe('account', () => {
  beforeEach(testSetup);
  describe('organizations', () => {
    describe('groups', () => {
      describe('permissions', () => {
        const testOrgId = '123';
        const testGroupId = '123';

        const client = permissions(testConfiguration, testOrgId, testGroupId, mockHttp);

        describe('list', () => {
          assertItCallsCorrectUrl('GET', urljoin('/v1/account/organizations', testOrgId, 'groups', testGroupId, 'permissions'), client.list);
          assertItReturnsUnderlyingPromise(mockGet, client.list);
        });

        describe('add', () => {
          assertItCallsCorrectUrl('POST', urljoin('/v1/account/organizations', testOrgId, 'groups', testGroupId, 'permissions'), client.add);
          assertItReturnsUnderlyingPromise(mockPost, client.add);
        });

        describe('permission', () => {
          const testPermissionId = '123';

          describe('details', () => {
            assertItCallsCorrectUrl('GET', urljoin('/v1/account/organizations', testOrgId, 'groups', testGroupId, 'permissions', testPermissionId),
              client(testGroupId).details);
            assertItReturnsUnderlyingPromise(mockGet, client(testOrgId).details);
          });
          describe('delete', () => {
            assertItCallsCorrectUrl('DELETE', urljoin('/v1/account/organizations', testOrgId, 'groups', testGroupId, 'permissions', testPermissionId),
              client(testGroupId).delete);
            assertItReturnsUnderlyingPromise(mockDelete, client(testOrgId).delete);
          });
        });
      });
    });
  });
});

