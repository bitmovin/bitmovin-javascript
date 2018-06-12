import urljoin from 'url-join';

import http from '../utils/http';
import {HttpClient} from '../utils/types';

export const impressions = (configuration, httpClient: HttpClient) => {
  const {post} = httpClient;
  const impressionBaseUrl = urljoin(configuration.apiBaseUrl, 'analytics', 'impressions');

  const fn = (impressionId, licenseKey) => {
    const url = urljoin(impressionBaseUrl, impressionId);
    return post(configuration, url, {licenseKey});
  };

  return fn;
};

export default configuration => {
  return impressions(configuration, http);
};
