import urljoin from 'url-join';
import http, {utils} from '../http';
import BitmovinError from "../BitmovinError";
import {isValidApiRequestDateString} from '../DateUtils'

export const statistics = (configuration, http) => {
  const { get } = http;

  const fn = (baseUrl) => {
    return {
      list: (limit, offset) => {
        let url = baseUrl;
        const getParams = utils.buildGetParamString({
          limit : limit,
          offset: offset
        });
        if (getParams.length > 0) {
          url = urljoin(baseUrl, getParams);
        }

        return get(configuration, url)
      },
      listWithinDates: (startDate, endDate, limit, offset) => {

        if(!isValidApiRequestDateString(startDate) || !isValidApiRequestDateString(endDate)){
          console.error("Wrong date format! Correct format is 'yyyy-MM-dd'");
          return Promise.reject(new BitmovinError("Wrong date format! Correct format is 'yyyy-MM-dd'", {}));
        }

        let url = urljoin(baseUrl, startDate, endDate);

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
