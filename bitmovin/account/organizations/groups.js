import urljoin from 'url-join';
import http from '../../utils/http';
import permissions from './permissions';
import tenants from './tenants';

export const groups = (configuration, organizationId, http) => {
  const { get, post, delete_ } = http;
  const groupsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'organizations', organizationId, 'groups');

  let fn = (groupId) => {
    return {
      details: () => {
        let url = urljoin(groupsBaseUrl, groupId);
        return get(configuration, url);
      },
      delete: () => {
        let url = urljoin(groupsBaseUrl, groupId);
        return delete_(configuration, url);
      },
      permissions: permissions(configuration, organizationId, groupId),
      tenants: tenants(configuration, organizationId, groupId)
    };
  };

  fn.add = (group) => {
    const url = urljoin(groupsBaseUrl);
    return post(configuration, url, group);
  };

  fn.list = () => {
    const url = urljoin(groupsBaseUrl);
    return get(configuration, url);
  };

  return fn;
};

export default (configuration, organizationId) => {
  return groups(configuration, organizationId, http);
};
