import urljoin from 'url-join';
import http, { utils } from '../http';
import Promise from 'bluebird';


export const hlsManifestStreams = (configuration, manifestId, http) => {
  const { get, post, delete_ } = http;
  let fn = (streamId) => {
    return {
      details: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams', streamId);
        return get(configuration, url);
      },
      delete : () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams', streamId);
        return delete_(configuration, url);
      }
    };
  };

  fn.add = (stream) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams');
    return post(configuration, url, stream);
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams');

    let getParams = utils.buildGetParamString({
      limit : limit,
      offset: offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  return fn;
};

export default (configuration, manifestId) => { return hlsManifestStreams(configuration, manifestId, http); }
