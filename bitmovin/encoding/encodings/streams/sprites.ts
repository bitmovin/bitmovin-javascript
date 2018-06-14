import * as urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {HttpClient} from '../../../utils/types';

export const sprites = (configuration, encodingId, streamId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const resourceDetails = spriteId => {
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

  const add = sprite => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites');
    return post(configuration, url, sprite);
  };

  const list = utils.buildListCallFunction(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites')
  );

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default (configuration, encodingId, streamId) => {
  return sprites(configuration, encodingId, streamId, http);
};
