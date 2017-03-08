import urljoin from 'url-join';
import http from '../http';

export const statistics = (configuration, http) => {
  const { get } = http;
  return {
    overall : () => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics');
      return get(configuration, url);
    },
    encodings: (encodingId) => {
      return {
        liveStatistics: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings', encodingId, 'live-statistics');
          return get(configuration, url);
        }
      }
    }
  }
};

export default (configuration) => { return statistics(configuration, http); };
