import urljoin from 'url-join';
import Promise from 'bluebird';

import http, {utils} from '../../utils/http';

import streams from './streams';
import muxings from './muxings';

export const encodings = (configuration, http) => {
  const {get, post, delete_} = http;
  let fn = encodingId => {
    return {
      details: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId);
        return get(configuration, url);
      },
      liveDetails: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'live');
        return get(configuration, url);
      },
      customData: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'customData');
        return get(configuration, url);
      },
      delete: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId);
        return delete_(configuration, url);
      },
      start: startConfiguration => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'start');
        return post(configuration, url, startConfiguration);
      },
      stop: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'stop');
        return post(configuration, url);
      },
      startLive: startLiveConfiguration => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'live', 'start');
        return post(configuration, url, startLiveConfiguration);
      },
      stopLive: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'live', 'stop');
        return post(configuration, url);
      },
      status: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'status');
        return get(configuration, url);
      },
      streams: streams(configuration, encodingId),
      muxings: muxings(configuration, encodingId)
    };
  };

  fn.create = encoding => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings');
    return post(configuration, url, encoding);
  };

  fn.list = (limit, offset, sort, filter) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings');

    const filterParams = utils.buildFilterParamString(filter);
    let getParams = utils.buildGetParamString({
      ...filterParams,
      limit: limit,
      offset: offset,
      sort: sort
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  return fn;
};

export default configuration => {
  return encodings(configuration, http);
};
