import urljoin from 'url-join';

import http from '../utils/http';
import {HttpClient, InternalConfiguration} from '../utils/types';

import apiKeys from './apiKeys';
import billing from './billing';
import organizations from './organizations';

export const account = (configuration: InternalConfiguration, httpClient: HttpClient): Account => {
  const {get, post} = httpClient;
  const accountBaseUrl = urljoin(configuration.apiBaseUrl, 'account');

  const information = () => {
    const url = urljoin(accountBaseUrl, '/information');

    return get(configuration, url);
  };

  const login = (eMail: string, password: string) => {
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
      eMail,
      currentPassword,
      newPassword
    };
    return post(configuration, url, changePasswordPayload);
  };

  return {
    information,
    login,
    changePassword,
    billing: billing(configuration),
    organizations: organizations(configuration),
    apiKeys: apiKeys(configuration, httpClient)
  };
};

export interface Account {
  information: () => void;
  login: (eMail: string, password: string) => void;
  changePassword: (eMail: string, currentPassword: string, newPassword: string) => void;
  billing: object;
  organizations: object;
  apiKeys: object;
}

export default (configuration): Account => {
  return account(configuration, http);
};
