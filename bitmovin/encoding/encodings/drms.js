import urljoin from 'url-join';
import http, {utils} from '../../utils/http';

export const drms = (configuration, encodingId, muxingTypeUrl, muxingId, http) => {
  const {get, post, delete_} = http;
  let typeFn = typeUrl => {
    let fn = drmId => {
      return {
        details: () => {
          let url = urljoin(
            configuration.apiBaseUrl,
            'encoding/encodings',
            encodingId,
            'muxings',
            muxingTypeUrl,
            muxingId,
            'drm',
            typeUrl,
            drmId
          );
          return get(configuration, url);
        },
        customData: () => {
          let url = urljoin(
            configuration.apiBaseUrl,
            'encoding/encodings',
            encodingId,
            'muxings',
            muxingTypeUrl,
            muxingId,
            'drm',
            typeUrl,
            drmId,
            'customData'
          );
          return get(configuration, url);
        },
        delete: () => {
          let url = urljoin(
            configuration.apiBaseUrl,
            'encoding/encodings',
            encodingId,
            'muxings',
            muxingTypeUrl,
            muxingId,
            'drm',
            typeUrl,
            drmId
          );
          return delete_(configuration, url);
        }
      };
    };

    fn.add = drm => {
      let url = urljoin(
        configuration.apiBaseUrl,
        'encoding/encodings',
        encodingId,
        'muxings',
        muxingTypeUrl,
        muxingId,
        'drm',
        typeUrl
      );
      return post(configuration, url, drm);
    };

    fn.list = (limit, offset) => {
      let url = urljoin(
        configuration.apiBaseUrl,
        'encoding/encodings',
        encodingId,
        'muxings',
        muxingTypeUrl,
        muxingId,
        'drm',
        typeUrl
      );

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
    aes: typeFn('aes'),
    cenc: typeFn('cenc'),
    clearKey: typeFn('clearkey'),
    fairPlay: typeFn('fairplay'),
    marlin: typeFn('marlin'),
    playReady: typeFn('playready'),
    primeTime: typeFn('primetime'),
    widevine: typeFn('widevine'),

    list: (limit, offset) => {
      let url = urljoin(
        configuration.apiBaseUrl,
        'encoding/encodings',
        encodingId,
        'muxings',
        muxingTypeUrl,
        muxingId,
        'drm'
      );

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

export default (configuration, encodingId, muxingTypeUrl, muxingId) => {
  return drms(configuration, encodingId, muxingTypeUrl, muxingId, http);
};
