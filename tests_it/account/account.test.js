import assert from 'assert';

import { getConfiguration } from '../utils';

import account from '../../bitmovin/account/account';
import logger from '../../bitmovin/utils/Logger';

logger.setLogging(true);

const testConfigurationWithHeaders = getConfiguration();
const testConfigurationWithoutHeaders = {
  httpHeaders: {
    'Content-Type'        : 'application/json',
    'X-Api-Client'        : 'bitmovin-javascript',
    'X-Api-Client-Version': '0.0.1'
  },
  apiBaseUrl: testConfigurationWithHeaders.apiBaseUrl,
  eMail: testConfigurationWithHeaders.eMail,
  password: testConfigurationWithHeaders.password
};

describe('Account', () => {
  const authorizedAccountClient = account(testConfigurationWithHeaders);
  const unauthorizedAccountClient = account(testConfigurationWithoutHeaders);

  const isPropertySet = function(property) {
    return property !== null && property !== undefined;
  };

  const isPropertySetAndNotEmptyString = function(property) {
    return isPropertySet(property) && property !== '';
  };

  it('should return current account information', (done) => {
    authorizedAccountClient.information().then((response) => {
      assert(isPropertySetAndNotEmptyString(response.id));
      assert(isPropertySetAndNotEmptyString(response.email));

      assert(isPropertySet(response.apiKeys));
      assert(response.apiKeys.length > 0);

      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return the api key', (done) => {
    unauthorizedAccountClient.login(testConfigurationWithHeaders.eMail, testConfigurationWithHeaders.password).then((response) => {
      assert.equal(testConfigurationWithoutHeaders.eMail, response.email);

      assert(isPropertySet(response.apiKeys));
      assert(response.apiKeys.length > 0);

      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should return the user email on success', (done) => {
    authorizedAccountClient.changePassword(testConfigurationWithHeaders.eMail, testConfigurationWithHeaders.password, testConfigurationWithHeaders.password).then((response) => {
      assert(response.eMail === testConfigurationWithHeaders.eMail);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  it('should throw an error because of an invalid current password', (done) => {
    authorizedAccountClient.changePassword(testConfigurationWithHeaders.eMail, "invalidPassword-128308", testConfigurationWithHeaders.password).then((response) => {
      done(new Error("should throw an Exception"));
    }).catch((error) => {
      done();
    });
  });
});