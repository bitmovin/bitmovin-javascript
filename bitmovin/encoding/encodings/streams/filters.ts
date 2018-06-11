import http, {utils} from '../../../utils/http';
import {HttpClient, InternalConfiguration} from '../../../utils/types';

export const filters = (
  configuration: InternalConfiguration,
  encodingId: string,
  streamId: string,
  httpClient: HttpClient
) => {
  const {get, post, delete_} = httpClient;

  const resourceDetails = filterId => {
    return {
      delete: () => {
        const url = urljoin(
          configuration.apiBaseUrl,
          'encoding/encodings',
          encodingId,
          'streams',
          streamId,
          'filters',
          filterId
        );

        return delete_(configuration, url);
      }
    };
  };

  const add = filter => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');
    return post(configuration, url, filter);
  };

  const list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');

    const getParams = utils.buildGetParamString({
      limit,
      offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  const deleteAll = () => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');
    return delete_(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {add, list, deleteAll});
  return resource;
};

export default (configuration, encodingId, streamId) => {
  return filters(configuration, encodingId, streamId, http);
};
