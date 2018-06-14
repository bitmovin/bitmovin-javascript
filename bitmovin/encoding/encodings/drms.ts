import * as urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {HttpClient} from '../../utils/types';

export const drms = (configuration, encodingId, muxingTypeUrl, muxingId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const typeFn = typeUrl => {
    const resourceDetails = drmId => {
      return {
        details: () => {
          const url = urljoin(
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
          const url = urljoin(
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
          const url = urljoin(
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

    const add = drm => {
      const url = urljoin(
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

    const list = utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(
        configuration.apiBaseUrl,
        'encoding/encodings',
        encodingId,
        'muxings',
        muxingTypeUrl,
        muxingId,
        'drm',
        typeUrl
      )
    );

    const resource = Object.assign(resourceDetails, {add, list});
    return resource;
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

    list: utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', muxingTypeUrl, muxingId, 'drm')
    )
  };
};

export default (configuration, encodingId, muxingTypeUrl, muxingId) => {
  return drms(configuration, encodingId, muxingTypeUrl, muxingId, http);
};
