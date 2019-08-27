import * as urljoin from 'url-join';

import http from '../../utils/http';
import {HttpClient} from '../../utils/types';

export const settings = (configuration, httpClient: HttpClient) => {
  const {get, put} = httpClient;

  const resourceDetails = orgId => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'analytics/organizations', orgId, 'settings');
        return get(configuration, url);
      },
      update: (data: {isIndustryOptOut: boolean; industry: string; subIndustry: string}) => {
        const url = urljoin(configuration.apiBaseUrl, 'analytics/organizations', orgId, 'settings');
        return put(configuration, url, data);
      }
    };
  };

  const resource = Object.assign(resourceDetails);
  return resource;
};

export default configuration => {
  return settings(configuration, http);
};
