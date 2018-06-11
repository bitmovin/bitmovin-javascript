import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';

export const representations = (configuration, manifestId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const typeFn = typeUrl => {
    const baseUrl = urljoin(
      configuration.apiBaseUrl,
      'encoding/manifests/smooth',
      manifestId,
      'representations',
      typeUrl
    );

    const resourceDetails = representationId => {
      return {
        details: () => {
          const url = urljoin(baseUrl, representationId);
          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(baseUrl, representationId);
          return delete_(configuration, url);
        }
      };
    };

    const add = representation => {
      return post(configuration, baseUrl, representation);
    };

    const list = (limit, offset) => {
      let url = baseUrl;

      const getParams = utils.buildGetParamString({
        limit,
        offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    const resource = Object.assign(resourceDetails, {add, create, list});
    return resource;
  };

  return {
    mp4: typeFn('mp4')
  };
};

export default (configuration, manifestId) => {
  return representations(configuration, manifestId, http);
};
