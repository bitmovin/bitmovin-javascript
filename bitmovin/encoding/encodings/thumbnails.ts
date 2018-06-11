import urljoin from 'url-join';

import http, {utils} from '../../utils/http';

export const thumbnails = (configuration, encodingId, streamId, http) => {
  const {get, post, delete_} = http;
  const fn = thumbnailId => {
    return {
      details: () => {
        const url = urljoin(
          configuration.apiBaseUrl,
          'encoding/encodings',
          encodingId,
          'streams',
          streamId,
          'thumbnails',
          thumbnailId
        );
        return get(configuration, url);
      },
      customData: () => {
        const url = urljoin(
          configuration.apiBaseUrl,
          'encoding/encodings',
          encodingId,
          'streams',
          streamId,
          'thumbnails',
          thumbnailId,
          'customData'
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
          'thumbnails',
          thumbnailId
        );
        return delete_(configuration, url);
      }
    };
  };

  fn.add = thumbnail => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'thumbnails');
    return post(configuration, url, thumbnail);
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'thumbnails');

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

export default (configuration, encodingId, streamId) => {
  return thumbnails(configuration, encodingId, streamId, http);
};
