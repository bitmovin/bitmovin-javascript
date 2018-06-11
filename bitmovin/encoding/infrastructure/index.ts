import urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {HttpClient} from '../../utils/types';

import {aws as awsInfra} from './aws';

export const infrastructure = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;

  const typeFn = type => {
    const resourceDetails = id => {
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
        customData: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'customData');
          return get(configuration, url);
        }
      };
    };

    const create = infrastructure => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type);
      return post(configuration, url, infrastructure);
    };

    const list = (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type);
      const filterParams = utils.buildFilterParamString(filter);
      const getParams = utils.buildGetParamString({
        ...filterParams,
        limit,
        offset,
        sort
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    const resource = Object.assign(resourceDetails, {create, list});
    return resource;
  };

  const kubernetes = typeFn('kubernetes');

  const aws = awsInfra(configuration, http);

  return {
    kubernetes,
    aws
  };
};

export default configuration => {
  return infrastructure(configuration, http);
};
