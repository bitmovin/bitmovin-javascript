import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {HttpClient} from '../../../utils/types';

import periods from './dashManifestPeriods';

export const dashManifests = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const resourceDetails = manifestId => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId);
        return delete_(configuration, url);
      },
      start: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'start');
        return post(configuration, url);
      },
      stop: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'stop');
        return post(configuration, url);
      },
      status: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'status');
        return get(configuration, url);
      },
      periods: periods(configuration, manifestId)
    };
  };

  const create = manifest => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash');
    return post(configuration, url, manifest);
  };

  const list = (limit, offset, encodingId) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash');

    const getParams = utils.buildGetParamString({
      limit,
      offset,
      encodingId
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {create, list});
  return resource;
};

export default configuration => {
  return dashManifests(configuration, http);
};
