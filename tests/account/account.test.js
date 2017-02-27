import { getConfiguration } from '../utils';

import { account } from '../../bitmovin/account/account';
import logger from '../../bitmovin/Logger';

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

const  mockGet = jest.fn().mockReturnValue(Promise.resolve({}));
const  mockPost = jest.fn().mockReturnValue(Promise.resolve({}));
const  mockHttp = { get: mockGet, post: mockPost };

describe('account', () => {
  beforeEach(() => {
    mockGet.mockClear();
    mockPost.mockClear();
  });
  const authorizedAccountClient = account(testConfigurationWithHeaders, mockHttp);
  const unauthorizedAccountClient = account(testConfigurationWithoutHeaders, mockHttp);

  const methodToMock = (method) => {
    if (method.toLowerCase() === 'get')
      return mockGet;
    return mockPost;
  }

  const assertPayload = (mock, call, expectedPayload) => {
    it ('should send appropriate payload', () => {
      return call().then(() => {
        expect(mock.mock.calls[0][2]).toEqual(expectedPayload);
      });
    });
  }

  const assertItReturnsUnderlyingPromise = (mock, call) => {
    it ('should return post promise', () => {
      mock.mockReturnValue(Promise.resolve("success"));
      const retVal = call();
      expect(retVal).toEqual(expect.any(Promise));
      return retVal.then((response, rawResponse) => {
        expect(response).toEqual("success");
      });
    });
  };

  const assertItCallsCorrectUrl = (method, expectedUrl, fn) => {
    it (`should call ${method} ${expectedUrl} once`, () => {
      return fn().then(() => {
        expect(methodToMock(method)).toBeCalled();
      });
    });

    it (`should call ${method} with ${expectedUrl}`, () => {
      return fn().then(() => {
        expect(methodToMock(method).mock.calls[0][1]).toEqual(expect.stringMatching(expectedUrl));
      });
    });
  }

  describe('information', () => {
    it ('should call GET /v1/account/information', () => {
      return authorizedAccountClient.information().then(() => {
        const callParams = mockGet.mock.calls[0];
        expect(callParams[0]).toEqual(testConfigurationWithHeaders);
        expect(callParams[1]).toEqual(expect.stringMatching('\/v1\/account\/information$'));
      });
    });
    assertItReturnsUnderlyingPromise(mockGet, () => authorizedAccountClient.information());
  });

  describe('login', () => {
    const email = "test@email.com";
    const password = "mypassword";

    assertItReturnsUnderlyingPromise(mockPost, () => unauthorizedAccountClient.login(email, password));

    it ('should call POST /v1/account/login', () => {
      return unauthorizedAccountClient.login(email, password).then(() => {
        const callParams = mockPost.mock.calls[0];
        expect(callParams[1]).toEqual(expect.stringMatching('\/v1\/account\/login$'));
      });
    });

    it ('should send appropriate login request payload', () => {
      return unauthorizedAccountClient.login(email, password).then(() => {
        const callParams = mockPost.mock.calls[0];
        expect(callParams[2]).toEqual({
          eMail: email,
          password: password
        });
      });
    });

  });

  describe('changePassword', () => {
    const email = "test@email.com";
    const currentPassword = "oldpwd";
    const newPassword = "newpwd";

    assertItCallsCorrectUrl('POST', '/v1/account/password/change', () => authorizedAccountClient.changePassword(email, currentPassword, newPassword));
    assertItReturnsUnderlyingPromise(mockPost, () => authorizedAccountClient.changePassword(email, currentPassword, newPassword));
    assertPayload(mockPost, () => authorizedAccountClient.changePassword(email, currentPassword, newPassword), {
      eMail: email,
      currentPassword,
      newPassword
    });
  });
});
