import * as urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {HttpClient} from '../../../utils/types';

export const thumbnails = (configuration, encodingId, streamId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;

  const details = thumbnailId => {
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

  const add = thumbnail => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'thumbnails');
    return post(configuration, url, thumbnail);
  };

  const list = utils.buildListCallFunction(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'thumbnails')
  );

  const resourceDetails = Object.assign(details, {
    add,
    list
  });

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default (configuration, encodingId, streamId) => {
  return thumbnails(configuration, encodingId, streamId, http);
};
