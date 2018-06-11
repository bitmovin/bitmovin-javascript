import urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

export const inputs = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const typeFn = typeUrl => {
    const resourceDetails = inputId => {
      return {
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId);
          return get(configuration, url);
        },
        customData: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId, 'customData');
          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId);
          return delete_(configuration, url);
        }
      };
    };

    const create = input => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl);
      return post(configuration, url, input);
    };

    const list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl);

      const getParams = utils.buildGetParamString({
        limit,
        offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    const resource = Object.assign(resourceDetails, {create, list});
    return resource;
  };

  const rtmpTypeFn = typeUrl => {
    const rtmpFn = inputId => {
      return {
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId);
          return get(configuration, url);
        }
      };
    };

    rtmpFn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl);

      const getParams = utils.buildGetParamString({
        limit,
        offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    return rtmpFn;
  };

  return {
    aspera: typeFn('aspera'),
    azure: typeFn('azure'),
    ftp: typeFn('ftp'),
    gcs: typeFn('gcs'),
    http: typeFn('http'),
    https: typeFn('https'),
    rtmp: rtmpTypeFn('rtmp'),
    s3: typeFn('s3'),
    genericS3: typeFn('generic-s3'),
    sftp: typeFn('sftp'),
    local: typeFn('local'),

    list: (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs');

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
    },

    getType: inputId => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', inputId, 'type');
      return get(configuration, url);
    }
  };
};

export default configuration => {
  return inputs(configuration, http);
};
