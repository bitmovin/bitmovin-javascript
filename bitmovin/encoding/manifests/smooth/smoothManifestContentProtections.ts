import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';

export const contentProtection = (configuration, manifestId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const baseUrl = urljoin(configuration.apiBaseUrl, 'encoding/manifests/smooth', manifestId, 'contentprotection');

  const resourceDetails = contentProtectionId => {
    return {
      details: () => {
        const url = urljoin(baseUrl, contentProtectionId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(baseUrl, contentProtectionId);
        return delete_(configuration, url);
      }
    };
  };

  const add = protection => {
    return post(configuration, baseUrl, protection);
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

export default (configuration, manifestId) => {
  return contentProtection(configuration, manifestId, http);
};
