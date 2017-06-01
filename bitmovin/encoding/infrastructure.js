import urljoin from 'url-join';
import http from '../http';

export const infrastructure = (configuration, http) => {
  const { get, post, delete_ } = http;

  const typeFn = (type) => {
    return {
      list: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type);
        return get(configuration, url);
      },
      status: (id) => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'status');
        return get(configuration, url);
      }
      ,
      details: (id) => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id);
        return get(configuration, url);
      },
      delete: (id) => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id);
        return delete_(configuration, url);
      },
      customData: (id) => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'customData');
        return get(configuration, url);
      },
      create: (infrastructure) => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type);
        return post(configuration, url, infrastructure);
      }
    }
  };

  return {
    kubernetes: typeFn('kubernetes')
  }
};

export default (configuration) => { return infrastructure(configuration, http); };
