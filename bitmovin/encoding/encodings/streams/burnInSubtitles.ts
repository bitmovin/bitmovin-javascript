import * as urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {HttpClient} from '../../../utils/types';

export const burnInSubtitles = (configuration, encodingId, streamId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const typeFn = typeUrl => {
    const resourceDetails = burnInSubtitleId => {
      return {
        details: () => {
          const url = urljoin(
            configuration.apiBaseUrl,
            'encoding/encodings',
            encodingId,
            'streams',
            streamId,
            'burn-in-subtitles',
            typeUrl,
            burnInSubtitleId
          );
          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(
            configuration.apiBaseUrl,
            'encoding/encodings',
            encodingId,
            'streams',
            streamId,
            'burn-in-subtitles',
            typeUrl,
            burnInSubtitleId
          );
          return delete_(configuration, url);
        }
      };
    };

    const add = burnInSubtitle => {
      const url = urljoin(
        configuration.apiBaseUrl,
        'encoding/encodings',
        encodingId,
        'streams',
        streamId,
        'burn-in-subtitles',
        typeUrl
      );
      return post(configuration, url, burnInSubtitle);
    };

    const list = utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(
        configuration.apiBaseUrl,
        'encoding/encodings',
        encodingId,
        'streams',
        streamId,
        'burn-in-subtitles',
        typeUrl
      )
    );

    const resource = Object.assign(resourceDetails, {add, list});
    return resource;
  };

  return {
    srt: typeFn('srt')
  };
};

export default (configuration, encodingId, streamId) => {
  return burnInSubtitles(configuration, encodingId, streamId, http);
};
