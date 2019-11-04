import * as urljoin from 'url-join';

import http from '../utils/http';
import {HttpClient} from '../utils/types';

export const impressions = (configuration, httpClient: HttpClient) => {
  const {post} = httpClient;
  const impressionsBaseUrl = urljoin(configuration.apiBaseUrl, 'analytics', 'impressions');

  const details = (impressionId: string, licenseKey: string) => {
    const url = urljoin(impressionsBaseUrl, impressionId);
    return post(configuration, url, {licenseKey});
  };
  const list = (
    licenseKey: string,
    startTime: number,
    endTime: number,
    filters?: Array<{name: string; operator: string; value: any}>
  ) => {
    const url = impressionsBaseUrl;
    const payload = {
      licenseKey,
      start: startTime,
      end: endTime,
      filters
    };
    return post(configuration, url, payload);
  };

  const resource = Object.assign(list, {details});
  return resource;
};

export default configuration => {
  return impressions(configuration, http);
};
