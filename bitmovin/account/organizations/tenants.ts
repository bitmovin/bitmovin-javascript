import urljoin from 'url-join';

import http from '../../utils/http';
import {HttpClient} from '../../utils/types';

export const tenants = (configuration, organizationId, groupId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const tenantsBaseUrl = urljoin(
    configuration.apiBaseUrl,
    'account',
    'organizations',
    organizationId,
    'groups',
    groupId,
    'tenants'
  );

  const resourceDetails = tenantId => {
    return {
      details: () => {
        const url = urljoin(tenantsBaseUrl, tenantId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(tenantsBaseUrl, tenantId);
        return delete_(configuration, url);
      }
    };
  };

  const add = tenant => {
    const url = urljoin(tenantsBaseUrl);
    return post(configuration, url, tenant);
  };

  const list = () => {
    const url = urljoin(tenantsBaseUrl);
    return get(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default (configuration, organizationId, groupId) => {
  return tenants(configuration, organizationId, groupId, http);
};
