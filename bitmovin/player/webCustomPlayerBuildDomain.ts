import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

export const webCustomPlayerBuildDomain = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;

  const resourceDetails = domainId => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web/domains', domainId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web/domains', domainId);
        return delete_(configuration, url);
      }
    };
  };

  const add = customPlayerBuildDomain => {
    const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web/domains');
    return post(configuration, url, customPlayerBuildDomain);
  };

  const list = utils.buildListCallFunction(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'player/custom-builds/web/domains')
  );

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default configuration => {
  return webCustomPlayerBuildDomain(configuration, http);
};
