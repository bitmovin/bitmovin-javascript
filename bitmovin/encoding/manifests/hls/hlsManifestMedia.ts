import * as urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {HttpClient} from '../../../utils/types';

export const hlsManifestMedia = (configuration, manifestId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const typeFn = typeUrl => {
    const resourceDetails = mediaId => {
      return {
        details: () => {
          const url = urljoin(
            configuration.apiBaseUrl,
            'encoding/manifests/hls',
            manifestId,
            'media',
            typeUrl,
            mediaId
          );

          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(
            configuration.apiBaseUrl,
            'encoding/manifests/hls',
            manifestId,
            'media',
            typeUrl,
            mediaId
          );

          return delete_(configuration, url);
        }
      };
    };

    const add = media => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'media', typeUrl);

      return post(configuration, url, media);
    };

    const list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'media', typeUrl);

      const getParams = utils.buildGetParamString({
        limit,
        offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    const resource = Object.assign(resourceDetails, {add, list});
    return resource;
  };

  return {
    video: typeFn('video'),
    audio: typeFn('audio'),
    subtitles: typeFn('subtitles'),
    closedCaptions: typeFn('closed-captions'),
    vtt: typeFn('vtt')
  };
};

export default (configuration, manifestId) => {
  return hlsManifestMedia(configuration, manifestId, http);
};
