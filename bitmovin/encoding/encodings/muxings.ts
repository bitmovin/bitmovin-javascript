import urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {BitmovinConfiguration, HttpClient} from '../../utils/types';

import drms from './drms';

export const muxings = (configuration: BitmovinConfiguration, encodingId: string, http: HttpClient): Muxings => {
  const {get, post, delete_} = http;
  const typeFn = typeUrl => {
    const fn = muxingId => {
      return {
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl, muxingId);
          return get(configuration, url);
        },
        customData: () => {
          const url = urljoin(
            configuration.apiBaseUrl,
            'encoding/encodings',
            encodingId,
            'muxings',
            typeUrl,
            muxingId,
            'customData'
          );
          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl, muxingId);

          return delete_(configuration, url);
        },
        drms: drms(configuration, encodingId, typeUrl, muxingId)
      };
    };

    fn.add = muxing => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl);
      return post(configuration, url, muxing);
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl);

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

  return {
    fmp4: typeFn('fmp4'),
    ts: typeFn('ts'),
    mp4: typeFn('mp4'),
    webm: typeFn('webm'),

    list: (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings');

      const getParams = utils.buildGetParamString({
        limit,
        offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    }
  };
};

export interface Muxings {}

export default (configuration: BitmovinConfiguration, encodingId: string): Muxings => {
  return muxings(configuration, encodingId, http);
};
