import urljoin from 'url-join';
import http, { utils } from '../http';

import thumbnails from './thumbnails';
import sprites from './sprites';

export const streams = (configuration, encodingId, http) => {
  const { get, post, delete_ } = http;
  let filterFn = (streamId) => {
    let fn = (filterId) => {
      return {
        delete: () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters',
            filterId);

          return delete_(configuration, url);
        }
      };
    };

    fn.add = (filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');
      return post(configuration, url, filter);
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    fn.deleteAll = () => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');
      return delete_(configuration, url);
    };

    return fn;
  };

  let fn = (streamId) => {
    return {
      details     : () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId);

        return get(configuration, url);
      },
      customData  : () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'customData');
        return get(configuration, url);
      },
      delete      : () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId);
        return delete_(configuration, url);
      },
      inputDetails: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'input');
        return get(configuration, url);
      },
      filters     : filterFn(streamId),
      thumbnails  : thumbnails(configuration, encodingId, streamId),
      sprites     : sprites(configuration, encodingId, streamId)
    };
  };

  fn.add = (stream) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams');

    return post(configuration, url, stream);
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams');

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

export default (configuration, encodingId) => { return streams(configuration, encodingId, http); };
