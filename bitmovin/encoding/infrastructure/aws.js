import urljoin from 'url-join';

import http, {utils} from '../../utils/http';

export const aws = (configuration, http) => {
  const {get, post, delete_} = http;

  const typeFn = type => {
    let fn = id => {
      const regions = regionName => {
        return {
          add: region => {
            const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'regions', regionName);
            return post(configuration, url, region);
          },
          delete: () => {
            const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'regions', regionName);
            return delete_(configuration, url);
          },
          details: () => {
            const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'regions', regionName);
            return get(configuration, url);
          }
        };
      };

      regions.list = (limit, offset) => {
        const baseUrl = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'regions');
        const url = utils.buildUrlParams(baseUrl, {limit, offset});
        return get(configuration, url);
      };

      return {
        status: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'status');
          return get(configuration, url);
        },
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id);
          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id);
          return delete_(configuration, url);
        },
        regions
      };
    };

    fn.create = infrastructure => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type);
      return post(configuration, url, infrastructure);
    };

    fn.list = (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type);
      url = utils.buildUrlParams(url, {limit, offset, sort, filter});
      return get(configuration, url);
    };

    return fn;
  };

  return typeFn('aws');
};

export default configuration => {
  return aws(configuration, http);
};
