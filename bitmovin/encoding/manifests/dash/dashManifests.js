import urljoin from 'url-join';
import http, { utils } from '../../../utils/http';
import periods from './dashManifestPeriods';

export const dashManifests = (configuration, http) => {
  const { get, post, delete_ } = http;
  let fn = (manifestId) => {
    return {
      details: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId);
        return get(configuration, url);
      },
      delete : () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId);
        return delete_(configuration, url);
      },
      start  : () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'start');
        return post(configuration, url);
      },
      stop   : () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'stop');
        return post(configuration, url);
      },
      status : () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'status');
        return get(configuration, url);
      },
      periods: periods(configuration, manifestId)
    };
  };

  fn.create = (manifest) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash');
    return post(configuration, url, manifest);
  };

  fn.list = (limit, offset, encodingId) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash');

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
  return dashManifests(configuration, http);
};
