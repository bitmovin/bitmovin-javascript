import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {HttpClient} from '../../../utils/types';

import media from './hlsManifestMedia';
import streams from './hlsManifestStreams';

export const hlsManifests = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const resourceDetails = manifestId => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId);
        return delete_(configuration, url);
      },
      start: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'start');
        return post(configuration, url);
      },
      stop: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'stop');
        return post(configuration, url);
      },
      status: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'status');
        return get(configuration, url);
      },
      media: media(configuration, manifestId),
      streams: streams(configuration, manifestId)
    };
  };

  const create = manifest => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls');
    return post(configuration, url, manifest);
  };

  const list = (limit, offset, encodingId) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls');

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
  return hlsManifests(configuration, http);
};
