import urljoin from 'url-join';

import http, {utils} from '../../utils/http';

export const sprites = (configuration, encodingId, streamId, http) => {
  const {get, post, delete_} = http;
  const fn = spriteId => {
    return {
      details: () => {
        const url = urljoin(
          configuration.apiBaseUrl,
          'encoding/encodings',
          encodingId,
          'streams',
          streamId,
          'sprites',
          spriteId
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
          'sprites',
          spriteId,
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
          'sprites',
          spriteId
        );

        return delete_(configuration, url);
      }
    };
  };

  fn.add = sprite => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites');
    return post(configuration, url, sprite);
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites');

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
  return sprites(configuration, encodingId, streamId, http);
};
