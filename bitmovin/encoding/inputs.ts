import * as urljoin from 'url-join';

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

    const list = utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl)
    );

    const resource = Object.assign(resourceDetails, {create, list});
    return resource;
  };

  const rtmpTypeFn = typeUrl => {
    const rtmpDetails = inputId => {
      return {
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId);
          return get(configuration, url);
        }
      };
    };

    const list = utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl)
    );

    const rtmp = Object.assign(rtmpDetails, {
      list
    });

    return rtmp;
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

    list: utils.buildListCallFunction(httpClient, configuration, urljoin(configuration.apiBaseUrl, 'encoding/inputs')),

    getType: inputId => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', inputId, 'type');
      return get(configuration, url);
    }
  };
};

export default configuration => {
  return inputs(configuration, http);
};
