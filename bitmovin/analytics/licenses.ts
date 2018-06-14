import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

import domains from './domains';

export const licenses = (configuration, httpClient: HttpClient) => {
  const {get, put} = httpClient;
  const resourceDetails = licenseId => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'analytics/licenses', licenseId);
        return get(configuration, url);
      },
      update: license => {
        const url = urljoin(configuration.apiBaseUrl, 'analytics/licenses', licenseId);
        return put(configuration, url, license);
      },
      domains: domains(configuration, licenseId)
    };
  };

  const list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'analytics/licenses');

    const getParams = utils.buildGetParamString({
      limit,
      offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {list});
  return resource;
};

export default configuration => {
  return licenses(configuration, http);
};
