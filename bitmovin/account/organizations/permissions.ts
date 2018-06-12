import urljoin from 'url-join';

import http from '../../utils/http';
import {HttpClient} from '../../utils/types';

export const permissions = (configuration, organizationId, groupId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const permissionsBaseUrl = urljoin(
    configuration.apiBaseUrl,
    'account',
    'organizations',
    organizationId,
    'groups',
    groupId,
    'permissions'
  );

  const resourceDetails = groupId => {
    return {
      details: () => {
        const url = urljoin(permissionsBaseUrl, groupId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(permissionsBaseUrl, groupId);
        return delete_(configuration, url);
      }
    };
  };

  const add = permission => {
    const url = urljoin(permissionsBaseUrl);
    return post(configuration, url, permission);
  };

  const list = () => {
    const url = urljoin(permissionsBaseUrl);
    return get(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default (configuration, organizationId, groupId) => {
  return permissions(configuration, organizationId, groupId, http);
};
