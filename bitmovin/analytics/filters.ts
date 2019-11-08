import * as urljoin from 'url-join';

import http from '../utils/http';
import {HttpClient} from '../utils/types';

export interface CustomUserIdQuery {
  licenseKey: string;
  start: number;
  end: number;
  query: string;
}

export const filters = (configuration, httpClient: HttpClient) => {
  const {post} = httpClient;
  const filtersBaseUrl = urljoin(configuration.apiBaseUrl, 'analytics', 'filters');

  const customUserId = (query: CustomUserIdQuery) => {
    const url = urljoin(filtersBaseUrl, 'customUserId');
    return post(configuration, url, query);
  };

  const resource = Object.assign({customUserId});
  return resource;
};

export default configuration => {
  return filters(configuration, http);
};
