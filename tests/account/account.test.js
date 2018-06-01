import { getConfiguration } from '../utils';
import { account } from '../../bitmovin/account/account';
import logger from '../../bitmovin/utils/Logger';
import {
  mockGet,
  mockPost,
  mockDelete,
  mockHttp,
  methodToMock,
  assertPayload,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup
} from '../assertions';

const testConfigurationWithHeaders = getConfiguration();

describe('account', () => {
  beforeEach(() => {
    testSetup();
  });
  const client = account(testConfigurationWithHeaders, mockHttp);


  describe('information', () => {
    assertItCallsCorrectUrl('GET', '/v1/account/information', client.information);
    assertItReturnsUnderlyingPromise(mockGet, client.information);
  });

  describe('login', () => {
    const email = 'test@email.com';
    const password = 'mypassword';

    assertItReturnsUnderlyingPromise(mockPost, () => client.login(email, password));

    it ('should call POST /v1/account/login', () => {
      return client.login(email, password).then(() => {
        const callParams = mockPost.mock.calls[0];
        expect(callParams[1]).toEqual(expect.stringMatching('\/v1\/account\/login$'));
      });
    });

    it ('should send appropriate login request payload', () => {
      return client.login(email, password).then(() => {
        const callParams = mockPost.mock.calls[0];
        expect(callParams[2]).toEqual({
          eMail: email,
          password: password
        });
      });
    });

  });

  describe('changePassword', () => {
    const email = 'test@email.com';
    const currentPassword = 'oldpwd';
    const newPassword = 'newpwd';

    assertItCallsCorrectUrl('POST', '/v1/account/password/change', () => client.changePassword(email, currentPassword, newPassword));
    assertItReturnsUnderlyingPromise(mockPost, () => client.changePassword(email, currentPassword, newPassword));
    assertPayload(mockPost, () => client.changePassword(email, currentPassword, newPassword), {
      eMail: email,
      currentPassword,
      newPassword
    });
  });
});
