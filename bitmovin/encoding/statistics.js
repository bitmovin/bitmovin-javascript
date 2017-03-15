import urljoin from 'url-join';
import {utils} from '../http';

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
    encodings: (encodingId) => {
      return {
        liveStatistics: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings', encodingId, 'live-statistics');
          return get(configuration, url);
        },
        vod: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings/vod');
          return fn(url);
        },
        live: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings/live');
          return fn(url);
        }
      }
    }
  }
};

export default (configuration) => { return statistics(configuration, http); };
