import urljoin from 'url-join';

import {groups} from '../../../bitmovin/account/organizations/groups';
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
      const testOrgId = '123';
      const client = groups(testConfiguration, testOrgId, mockHttp);

      describe('list', () => {
        assertItCallsCorrectUrl('GET', urljoin('/v1/account/organizations', testOrgId, 'groups'), client.list);
        assertItReturnsUnderlyingPromise(mockGet, client.list);
      });

      describe('add', () => {
        assertItCallsCorrectUrl('POST', urljoin('/v1/account/organizations', testOrgId, 'groups'), client.add);
        assertItReturnsUnderlyingPromise(mockPost, client.add);
      });

      describe('group', () => {
        const testGroupId = '123';

        describe('details', () => {
          assertItCallsCorrectUrl(
            'GET',
            urljoin('/v1/account/organizations', testOrgId, 'groups', testGroupId),
            client(testGroupId).details
          );
          assertItReturnsUnderlyingPromise(mockGet, client(testOrgId).details);
        });
        describe('delete', () => {
          assertItCallsCorrectUrl(
            'DELETE',
            urljoin('/v1/account/organizations', testOrgId, 'groups', testGroupId),
            client(testGroupId).delete
          );
          assertItReturnsUnderlyingPromise(mockDelete, client(testOrgId).delete);
        });
      });
    });
  });
});
