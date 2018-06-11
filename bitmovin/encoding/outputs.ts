import urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

export const outputs = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const typeFn = typeUrl => {
    const resourceDetails = outputId => {
      return {
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId);
          return get(configuration, url);
        },
        customData: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId, 'customData');

          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId);
          return delete_(configuration, url);
        }
      };
    };

    const create = output => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl);
      return post(configuration, url, output);
    };

    const list = (limit, offset, sort) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl);

      const getParams = utils.buildGetParamString({
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

  const bitmovinTypeFn = typeUrl => {
    const bitmovinFn = outputId => {
      return {
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId);

          return get(configuration, url);
        }
      };
    };

    bitmovinFn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl);

      const getParams = utils.buildGetParamString({
        limit,
        offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    return bitmovinFn;
  };

  return {
    s3: typeFn('s3'),
    gcs: typeFn('gcs'),
    azure: typeFn('azure'),
    ftp: typeFn('ftp'),
    sftp: typeFn('sftp'),
    genericS3: typeFn('generic-s3'),
    bitmovin: {
      aws: bitmovinTypeFn('bitmovin/aws'),
      gcp: bitmovinTypeFn('bitmovin/gcp')
    },
    local: typeFn('local'),

    list: (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs');

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

    getType: outputId => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', outputId, 'type');

      return get(configuration, url);
    }
  };
};

export default configuration => {
  return outputs(configuration, http);
};
