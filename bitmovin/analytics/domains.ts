import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

export const domains = (configuration, licenseId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;

  const resourceDetails = domainId => {
    return {
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'analytics/licenses', licenseId, 'domains', domainId);
        return delete_(configuration, url);
      }
    };
  };

  const add = (domain: string) => {
    const url = urljoin(configuration.apiBaseUrl, 'analytics/licenses', licenseId, 'domains');
    return post(configuration, url, domain);
  };

  const list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'analytics/licenses', licenseId, 'domains');

    const getParams = utils.buildGetParamString({
      limit,
      offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default (configuration, licenseId) => {
  return domains(configuration, licenseId, http);
};
