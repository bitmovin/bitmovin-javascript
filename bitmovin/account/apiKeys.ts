import urljoin from 'url-join';

import {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

const apiKeys = (configuration, httpClient: HttpClient) => {
  const apiKeysBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'api-keys');
  const {get, post, delete_} = httpClient;

  const resourceDetails = apiKeyId => {
    const url = urljoin(apiKeysBaseUrl, apiKeyId);
    return get(configuration, url);
  };

  const list = utils.buildListCallFunction(httpClient, configuration, apiKeysBaseUrl);

  const create = () => {
    const url = apiKeysBaseUrl;
    return post(configuration, url);
  };

  const deleteApiKey = apiKeyId => {
    const url = urljoin(apiKeysBaseUrl, apiKeyId);
    return delete_(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {deleteApiKey, create, list});
  return resource;
};

export default apiKeys;
