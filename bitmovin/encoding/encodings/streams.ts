// @flow

import urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {BitmovinConfiguration, Create, Delete, Details, HttpClient, List} from '../../utils/types';

import sprites from './sprites';
import thumbnails from './thumbnails';

export const streams = (configuration: BitmovinConfiguration, encodingId: string, http: HttpClient): Streams => {
  const {get, post, delete_} = http;

  const filterFn = streamId => {
    const fn = filterId => {
      return {
        delete: () => {
          const url = urljoin(
            configuration.apiBaseUrl,
            'encoding/encodings',
            encodingId,
            'streams',
            streamId,
            'filters',
            filterId
          );

          return delete_(configuration, url);
        }
      };
    };

    fn.add = filter => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');
      return post(configuration, url, filter);
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');

      const getParams = utils.buildGetParamString({
        limit,
        offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    fn.deleteAll = () => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');
      return delete_(configuration, url);
    };

    return fn;
  };

  const fn = streamId => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId);

        return get(configuration, url);
      },
      customData: () => {
        const url = urljoin(
          configuration.apiBaseUrl,
          'encoding/encodings',
          encodingId,
          'streams',
          streamId,
          'customData'
        );
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId);
        return delete_(configuration, url);
      },
      inputDetails: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'input');
        return get(configuration, url);
      },
      filters: filterFn(streamId),
      thumbnails: thumbnails(configuration, encodingId, streamId),
      sprites: sprites(configuration, encodingId, streamId)
    };
  };

  fn.add = stream => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams');

    return post(configuration, url, stream);
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams');

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

interface Stream {}
interface StreamInput {}

interface StreamDetail {
  details: Details<Stream>;
  inputDetails: Details<StreamInput>;
  delete: Delete<{}>;
  filters: object;
  thumbnails: object;
  sprites: object;
}

export interface Streams {
  (id: string): StreamDetail;
  list: List<Stream>;
  add: Create<Stream>;
}

export default (configuration: BitmovinConfiguration, encodingId: string): Streams => {
  return streams(configuration, encodingId, http);
};
