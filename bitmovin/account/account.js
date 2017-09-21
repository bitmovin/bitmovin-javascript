import urljoin from 'url-join';
import http from '../http';
import organizations from './organizations/organizations.js';
import billing from './billing/billing';

export const account = (configuration, http) => {
  const { get, post } = http;
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
    organizations: organizations(configuration)
  };
};

export default (configuration) => { return account(configuration, http); };
