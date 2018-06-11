import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {
  ApiResource,
  Create,
  Delete,
  Details,
  HttpClient,
  InternalConfiguration,
  List,
  Pagination
} from '../../../utils/types';

import filters from './filters';
import sprites from './sprites';
import thumbnails from './thumbnails';

export const streams = (configuration: InternalConfiguration, encodingId: string, httpClient: HttpClient): Streams => {
  const {get, post, delete_} = httpClient;

  const details = (streamId): StreamDetail => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId);

        return get(configuration, url);
      },
      customData: () => {
        const url = urljoin(
          configuration.apiBaseUrl,
          'encoding/encodings',
          encodingId,
          'streams',
          streamId,
          'customData'
        );
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId);
        return delete_(configuration, url);
      },
      inputDetails: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'input');
        return get(configuration, url);
      },
      filters: filters(configuration, encodingId, streamId),
      thumbnails: thumbnails(configuration, encodingId, streamId),
      sprites: sprites(configuration, encodingId, streamId)
    };
  };

  const add = stream => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams');

    return post<ApiResource<Stream>, object>(configuration, url, stream);
  };

  const list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams');

    const getParams = utils.buildGetParamString({
      limit,
      offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get<Pagination<Stream>>(configuration, url);
  };

  const resourceDetails = Object.assign(details, {
    add,
    list
  });

  const resource = Object.assign(resourceDetails, {add, create, list});
  return resource;
};

interface Stream {}
interface StreamInput {}

interface StreamDetail {
  details: Details<Stream>;
  inputDetails: Details<StreamInput>;
  delete: Delete<{}>;
  filters: object;
  thumbnails: object;
  sprites: object;
}

export interface Streams {
  (id: string): StreamDetail;
  list: List<Stream>;
  add: Create<Stream>;
}

export default (configuration: InternalConfiguration, encodingId: string): Streams => {
  return streams(configuration, encodingId, http);
};
