import urljoin from 'url-join';
import http, { utils} from '../http';

export const statistics = (configuration, http) => {
  const { get } = http;

  const fn = (url) => {
    return {
      list: (limit, offset) => {
        const getParams = utils.buildGetParamString({
          limit : limit,
          offset: offset
        });
        if (getParams.length > 0) {
          url = urljoin(url, getParams);
        }

        return get(configuration, url)
      },
      specific: (startDate, endDate, limit, offset) => {

        let url = urljoin(url, startDate, endDate);

        const getParams = utils.buildGetParamString({
          limit : limit,
          offset: offset
        });
        if (getParams.length > 0) {
          url = urljoin(url, getParams);
        }

        return get(configuration, url)
      }
    }
  };

  return {
    overall : () => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics');
      return get(configuration, url);
    },
    vod: fn(urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings/vod')),
    live: fn(urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings/live')),
    encodings: (encodingId) => {
      return {
        liveStatistics: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings', encodingId, 'live-statistics');
          return get(configuration, url);
        }
      }
    },
  }
};

export default (configuration) => { return statistics(configuration, http); };
