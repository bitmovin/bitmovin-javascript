import urljoin from 'url-join';
import http from '../../utils/http';

export const permissions = (configuration, organizationId, groupId, http) => {
  const { get, post, delete_ } = http;
  const permissionsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'organizations', organizationId, 'groups', groupId, 'permissions');

  let fn = (groupId) => {
    return {
      details: () => {
        let url = urljoin(permissionsBaseUrl, groupId);
        return get(configuration, url);
      },
      delete: () => {
        let url = urljoin(permissionsBaseUrl, groupId);
        return delete_(configuration, url);
      }
    };
  };

  fn.add = (permission) => {
    const url = urljoin(permissionsBaseUrl);
    return post(configuration, url, permission);
  };

  fn.list = () => {
    const url = urljoin(permissionsBaseUrl);
    return get(configuration, url);
  };

  return fn;
};

export default (configuration, organizationId, groupId) => {
  return permissions(configuration, organizationId, groupId, http);
};
