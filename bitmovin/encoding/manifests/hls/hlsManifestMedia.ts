import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';

export const hlsManifestMedia = (configuration, manifestId, http) => {
  const {get, post, delete_} = http;
  const typeFn = typeUrl => {
    const fn = mediaId => {
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

    fn.add = media => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'media', typeUrl);

      return post(configuration, url, media);
    };

    fn.list = (limit, offset) => {
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

    return fn;
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
