import urljoin from 'url-join';

import http from '../../utils/http';
import {HttpClient} from '../../utils/types';

import permissions from './permissions';
import tenants from './tenants';

export const groups = (configuration, organizationId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const groupsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'organizations', organizationId, 'groups');

  const resourceDetails = groupId => {
    return {
      details: () => {
        const url = urljoin(groupsBaseUrl, groupId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(groupsBaseUrl, groupId);
        return delete_(configuration, url);
      },
      permissions: permissions(configuration, organizationId, groupId),
      tenants: tenants(configuration, organizationId, groupId)
    };
  };

  const add = group => {
    const url = urljoin(groupsBaseUrl);
    return post(configuration, url, group);
  };

  const list = () => {
    const url = urljoin(groupsBaseUrl);
    return get(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default (configuration, organizationId) => {
  return groups(configuration, organizationId, http);
};
