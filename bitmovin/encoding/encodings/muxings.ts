import * as urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {HttpClient, InternalConfiguration, List} from '../../utils/types';

import drms from './drms';

export const muxings = (configuration: InternalConfiguration, encodingId: string, httpClient: HttpClient): Muxings => {
  const {get, post, delete_} = httpClient;

  const typeFn = typeUrl => {
    const resourceDetails = muxingId => {
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

    const add = muxing => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl);
      return post(configuration, url, muxing);
    };

    const list = utils.buildListCallFunction<Muxing>(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl)
    );

    const resource = Object.assign(resourceDetails, {
      add,
      list
    });

    return resource;
  };

  return {
    fmp4: typeFn('fmp4'),
    ts: typeFn('ts'),
    mp4: typeFn('mp4'),
    webm: typeFn('webm'),

    list: utils.buildListCallFunction<Muxing>(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings')
    )
  };
};

interface Muxing {}

export interface Muxings {
  list: List<Muxing>;
  fmp4: object;
  ts: object;
  mp4: object;
  webm: object;
}

export default (configuration: InternalConfiguration, encodingId: string): Muxings => {
  return muxings(configuration, encodingId, http);
};
