import urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {HttpClient} from '../../utils/types';

export const aws = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;

  const typeFn = type => {
    const resourceDetails = id => {
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

      regions.list = utils.buildListCallFunction(
        httpClient,
        configuration,
        urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'regions')
      );

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

    const create = infrastructure => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type);
      return post(configuration, url, infrastructure);
    };

    const list = utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type)
    );

    const resource = Object.assign(resourceDetails, {create, list});
    return resource;
  };

  return typeFn('aws');
};

export default configuration => {
  return aws(configuration, http);
};
