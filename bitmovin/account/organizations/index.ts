import urljoin from 'url-join';

import http from '../../utils/http';

import groups from './groups';

export const organizations = (configuration, http) => {
  const {get, post, delete_, put} = http;
  const organizationsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'organizations');

  const fn = organizationId => {
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

  fn.add = organization => {
    const url = urljoin(organizationsBaseUrl);
    return post(configuration, url, organization);
  };

  fn.list = () => {
    const url = urljoin(organizationsBaseUrl);
    return get(configuration, url);
  };

  return fn;
};

export default configuration => {
  return organizations(configuration, http);
};
