import urljoin from 'url-join';
import http from '../../http';

export const organizations = (configuration, http) => {
  const { get, post, delete_ } = http;
  const organizationsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'organizations');

  let fn = (organizationId) => {
    return {
      details: () => {
        let url = urljoin(organizationsBaseUrl, organizationId);
        return get(configuration, url);
      },
      delete: () => {
        let url = urljoin(organizationsBaseUrl, organizationId);
        return delete_(configuration, url);
      }
    };
  };

  fn.add = (organization) => {
    const url = urljoin(organizationsBaseUrl);
    return post(configuration, url, organization);
  };

  fn.list = () => {
    const url = urljoin(organizationsBaseUrl);
    return get(configuration, url);
  };

  return fn;
};

export default (configuration) => { return organizations(configuration, http); };
