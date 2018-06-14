import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

export const domains = (configuration, licenseId, httpClient: HttpClient) => {
  const {post, delete_} = httpClient;

  const resourceDetails = domainId => {
    return {
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'domains', domainId);
        return delete_(configuration, url);
      }
    };
  };

  const add = domain => {
    const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'domains');
    return post(configuration, url, domain);
  };

  const list = utils.buildListCallFunction(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'domains')
  );

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default (configuration, licenseId) => {
  return domains(configuration, licenseId, http);
};
