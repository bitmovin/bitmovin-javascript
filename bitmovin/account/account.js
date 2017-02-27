import urljoin from 'url-join';
import { get, post } from '../http';
import organizations from './organizations/organizations.js';

const account = (configuration) => {
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
    organizations: organizations(configuration)
  };
};

export default account;
