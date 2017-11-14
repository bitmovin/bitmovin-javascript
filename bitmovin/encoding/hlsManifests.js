import urljoin from 'url-join';
import http, { utils } from '../http';
import Promise from 'bluebird';

import media from './hlsManifestMedia';
import streams from './hlsManifestStreams';

export const hlsManifests = (configuration, http) => {
  const { get, post, delete_ } = http;
  let fn = (manifestId) => {
    return {
      details: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId);
        return get(configuration, url);
      },
      delete : () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId);
        return delete_(configuration, url);
      },
      start  : () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'start');
        return post(configuration, url);
      },
      stop   : () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'stop');
        return post(configuration, url);
      },
      status : () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'status');
        return get(configuration, url);
      },
      media: media(configuration, manifestId),
      streams: streams(configuration, manifestId)
    };
  };

  fn.create = (manifest) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls');
    return post(configuration, url, manifest);
  };

  fn.list = (limit, offset, encodingId) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls');

    let getParams = utils.buildGetParamString({
      limit     : limit,
      offset    : offset,
      encodingId: encodingId
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  return fn;
};

export default (configuration) => {
  return hlsManifests(configuration, http);
};
