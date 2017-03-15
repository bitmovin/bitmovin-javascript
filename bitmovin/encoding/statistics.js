import urljoin from 'url-join';
import http, { utils} from '../http';
import BitmovinError from "../BitmovinError";

export const statistics = (configuration, http) => {
  const { get } = http;

  const isValidDate = (dateString) => {

    if(typeof dateString !== "string")
      return false;

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regex) != null;
  };

  const fn = (url) => {
    return {
      list: (limit, offset) => {
        let urlChanged = url;
        const getParams = utils.buildGetParamString({
          limit : limit,
          offset: offset
        });
        if (getParams.length > 0) {
          urlChanged = urljoin(url, getParams);
        }

        return get(configuration, urlChanged)
      },
      specific: (startDate, endDate, limit, offset) => {

        if(!isValidDate(startDate) || !isValidDate(endDate)){
          console.error("Wrong date format! Correct format is 'yyyy-MM-dd'");
          return Promise.reject(new BitmovinError("Wrong date format! Correct format is 'yyyy-MM-dd'", {}));
        }

        let urlChanged = urljoin(url, startDate, endDate);

        const getParams = utils.buildGetParamString({
          limit : limit,
          offset: offset
        });
        if (getParams.length > 0) {
          urlChanged = urljoin(urlChanged, getParams);
        }

        return get(configuration, urlChanged)
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
