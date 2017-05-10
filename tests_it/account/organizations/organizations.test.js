/**
 * Created by ferdinand on 17.02.17.
 */
import assert from 'assert';

import {getConfiguration} from '../../utils';
import account from '../../../bitmovin/account/account'

let testConfiguration = getConfiguration();

describe('[Organizations]', () => {
  let client = account(testConfiguration).organizations;
  it('should return a list of organizations', (done) => {
    client.list().then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items.length !== null) && response.items.length > 0);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return the details of the first organization', (done) => {
    client.list().then((response) => {
      assert((response.totalCount !== null) && response.totalCount !== undefined);
      assert((response.items.length !== null) && response.items.length > 0);
      let organizationId = response.items[0].id;
      client(organizationId).details().then((response) => {
        assert((response.id !== null) && response.id === organizationId);
        assert((response.name !== null) && response.name !== undefined);
        done();
      }).catch((error) => {
        done(new Error(error));
      });
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('Should create and delete an organization', (done) => {
    client.add({name: 'NewOrganisation', description: 'bitmovin-javascript-client-test'}).then((response) => {
      assert((response.id !== null) && response.id !== undefined);
      let organizationId = response.id;
      client(organizationId).delete().then((response) => {
        assert((response.id !== null) && response.id === organizationId);
        done();
      }).catch((error) => {
        done(new Error(error));
      });
    });
  });
});