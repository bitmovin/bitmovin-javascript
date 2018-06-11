import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';

import media from './hlsManifestMedia';
import streams from './hlsManifestStreams';

export const hlsManifests = (configuration, http) => {
  const {get, post, delete_} = http;
  const fn = manifestId => {
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

  fn.create = manifest => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls');
    return post(configuration, url, manifest);
  };

  fn.list = (limit, offset, encodingId) => {
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

  return fn;
};

export default configuration => {
  return hlsManifests(configuration, http);
};
