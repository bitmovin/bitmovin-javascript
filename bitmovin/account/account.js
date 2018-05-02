import urljoin from 'url-join';
import http from '../utils/http';
import organizations from './organizations/organizations.js';
import billing from './billing/billing';
import apiKeys from './apiKeys/apiKeys';

export const account = (configuration, http) => {
  const {get, post} = http;
  const accountBaseUrl = urljoin(configuration.apiBaseUrl, 'account');

  const information = () => {
    const url = urljoin(accountBaseUrl, '/information');

    return get(configuration, url);
  };

  const login = (eMail, password) => {
    const url = urljoin(accountBaseUrl, '/login');
    const loginRequestPayload = {
      eMail,
      password
    };

    return post(configuration, url, loginRequestPayload);
  };

  const changePassword = (eMail, currentPassword, newPassword) => {
    const url = urljoin(accountBaseUrl, '/password/change');
    const changePasswordPayload = {
      eMail: eMail,
      currentPassword: currentPassword,
      newPassword: newPassword
    };
    return post(configuration, url, changePasswordPayload);
  };

  return {
    information,
    login,
    changePassword,
    billing: billing(configuration),
    organizations: organizations(configuration),
    apiKeys: apiKeys(configuration, http)
  };
};

export default configuration => {
  return account(configuration, http);
};
