import urljoin from 'url-join';
import http, { utils } from '../http';

export const impressions = (configuration, http) => {
  const { get } = http;
  const impressionBaseUrl = urljoin(configuration.apiBaseUrl, 'analytics', 'impressions');

  const fn = (impressionId) => {
    return {
      details: () => {
        let url = urljoin(impressionBaseUrl, impressionId);
        return get(configuration, url);
      }
    }
  };

  return fn;
};

export default (configuration) => { return domains(configuration, http); };
