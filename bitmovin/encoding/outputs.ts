import * as urljoin from 'url-join';

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

    const list = utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl)
    );

    const resource = Object.assign(resourceDetails, {create, list});
    return resource;
  };

  return {
    s3: typeFn('s3'),
    gcs: typeFn('gcs'),
    azure: typeFn('azure'),
    ftp: typeFn('ftp'),
    sftp: typeFn('sftp'),
    genericS3: typeFn('generic-s3'),
    bitmovinTempS3: typeFn('bitmovin-temp-s3'),
    local: typeFn('local'),
    akamaiNetstorage: typeFn('akamai-netstorage'),
    rolebasedS3: typeFn('s3-role-based'),

    list: utils.buildListCallFunction(httpClient, configuration, urljoin(configuration.apiBaseUrl, 'encoding/outputs')),

    getType: outputId => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', outputId, 'type');

      return get(configuration, url);
    }
  };
};

export default configuration => {
  return outputs(configuration, http);
};
