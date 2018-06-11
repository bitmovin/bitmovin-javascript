import urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {BitmovinConfiguration, HttpClient} from '../../utils/types';

import drms from './drms';

export const muxings = (configuration: BitmovinConfiguration, encodingId: string, http: HttpClient): Muxings => {
  const {get, post, delete_} = http;
  let typeFn = typeUrl => {
    let fn = muxingId => {
      return {
        details: () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl, muxingId);
          return get(configuration, url);
        },
        customData: () => {
          let url = urljoin(
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
          let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl, muxingId);

          return delete_(configuration, url);
        },
        drms: drms(configuration, encodingId, typeUrl, muxingId)
      };
    };

    fn.add = muxing => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl);
      return post(configuration, url, muxing);
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl);

      let getParams = utils.buildGetParamString({
        limit: limit,
        offset: offset
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

      let getParams = utils.buildGetParamString({
        limit: limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    }
  };
};

export interface Muxings {

}

export default (configuration: BitmovinConfiguration, encodingId: string): Muxings => {
  return muxings(configuration, encodingId, http);
};
