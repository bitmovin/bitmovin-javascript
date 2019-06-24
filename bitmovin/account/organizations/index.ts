import * as urljoin from 'url-join';

import http from '../../utils/http';
import {HttpClient} from '../../utils/types';

import groups from './groups';

export const organizations = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_, put} = httpClient;
  const organizationsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'organizations');

  const resourceDetails = organizationId => {
    return {
      details: () => {
        const url = urljoin(organizationsBaseUrl, organizationId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(organizationsBaseUrl, organizationId);
        return delete_(configuration, url);
      },
      update: organization => {
        const url = urljoin(organizationsBaseUrl, organizationId);
        return put(configuration, url, organization);
      },
      groups: groups(configuration, organizationId)
    };
  };

  const add = organization => {
    const url = urljoin(organizationsBaseUrl);
    return post(configuration, url, organization);
  };

  const list = () => {
    const url = urljoin(organizationsBaseUrl);
    return get(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default configuration => {
  return organizations(configuration, http);
};
