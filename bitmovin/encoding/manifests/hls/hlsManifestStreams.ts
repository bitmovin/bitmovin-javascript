import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {HttpClient} from '../../../utils/types';

export const hlsManifestStreams = (configuration, manifestId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const resourceDetails = streamId => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams', streamId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams', streamId);
        return delete_(configuration, url);
      }
    };
  };

  const add = stream => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams');
    return post(configuration, url, stream);
  };

  const list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams');

    const getParams = utils.buildGetParamString({
      limit,
      offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default (configuration, manifestId) => {
  return hlsManifestStreams(configuration, manifestId, http);
};
