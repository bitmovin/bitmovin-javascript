import * as urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {
  ApiResource,
  Create,
  CustomData,
  Delete,
  Details,
  HttpClient,
  InternalConfiguration,
  List
} from '../../../utils/types';

import {filters} from './filters';
import {sprites} from './sprites';
import {thumbnails} from './thumbnails';

export const streams = (configuration: InternalConfiguration, encodingId: string, httpClient: HttpClient): Streams => {
  const {get, post, delete_} = httpClient;

  const resourceDetails = (streamId): StreamDetail => {
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
      filters: filters(configuration, encodingId, streamId, httpClient),
      thumbnails: thumbnails(configuration, encodingId, streamId, httpClient),
      sprites: sprites(configuration, encodingId, streamId, httpClient)
    };
  };

  const add = stream => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams');

    return post<ApiResource<Stream>, any>(configuration, url, stream);
  };

  const list = utils.buildListCallFunction<Stream>(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams')
  );

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

interface Stream {}
interface StreamInput {}

interface StreamDetail {
  details: Details<Stream>;
  inputDetails: Details<StreamInput>;
  delete: Delete<{}>;
  customData: CustomData;
  filters: any;
  thumbnails: any;
  sprites: any;
}

export interface Streams {
  (id: string): StreamDetail;
  list: List<Stream>;
  add: Create<Stream>;
}

export default (configuration: InternalConfiguration, encodingId: string): Streams => {
  return streams(configuration, encodingId, http);
};
