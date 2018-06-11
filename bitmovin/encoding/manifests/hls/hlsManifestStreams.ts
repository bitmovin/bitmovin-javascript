import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';

export const hlsManifestStreams = (configuration, manifestId, http) => {
  const {get, post, delete_} = http;
  const fn = streamId => {
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

  fn.add = stream => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams');
    return post(configuration, url, stream);
  };

  fn.list = (limit, offset) => {
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

  return fn;
};

export default (configuration, manifestId) => {
  return hlsManifestStreams(configuration, manifestId, http);
};
