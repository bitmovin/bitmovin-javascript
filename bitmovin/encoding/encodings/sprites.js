import urljoin from 'url-join';
import http, { utils } from '../../utils/http';

export const sprites = (configuration, encodingId, streamId, http) => {
  const { get, post, delete_ } = http;
  let fn = (spriteId) => {
    return {
      details   : () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites',
          spriteId);

        return get(configuration, url);
      },
      customData: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites',
          spriteId, 'customData');

        return get(configuration, url);
      },
      delete    : () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites',
          spriteId);

        return delete_(configuration, url);
      }
    };
  };

  fn.add = (sprite) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites');
    return post(configuration, url, sprite);
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites');

    let getParams = utils.buildGetParamString({
      limit : limit,
      offset: offset
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
