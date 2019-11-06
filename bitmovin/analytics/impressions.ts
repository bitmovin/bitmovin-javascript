import * as urljoin from 'url-join';

import http from '../utils/http';
import {HttpClient} from '../utils/types';

export interface ImpressionDetailsQuery {
  licenseKey: string;
  start: number;
  end: number;
  filters?: Array<{name: string; operator: string; value: any}>;
}

export const impressions = (configuration, httpClient: HttpClient) => {
  const {post} = httpClient;
  const impressionsBaseUrl = urljoin(configuration.apiBaseUrl, 'analytics', 'impressions');

  const details = (impressionId: string, licenseKey: string) => {
    const url = urljoin(impressionsBaseUrl, impressionId);
    return post(configuration, url, {licenseKey});
  };
  const list = (query: ImpressionDetailsQuery) => {
    const url = impressionsBaseUrl;
    return post(configuration, url, query);
  };

  const resource = Object.assign(list, {details});
  return resource;
};

export default configuration => {
  return impressions(configuration, http);
};
