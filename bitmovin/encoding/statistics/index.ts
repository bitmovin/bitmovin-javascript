import * as urljoin from 'url-join';

import BitmovinError from '../../utils/BitmovinError';
import {isValidApiRequestDateString} from '../../utils/DateUtils';
import http, {utils} from '../../utils/http';
import {HttpClient} from '../../utils/types';

import liveStatistics from './liveStatistics';

export const statistics = (configuration, httpClient: HttpClient) => {
  const {get} = httpClient;

  const addOptionsToUrl = (url, options) => {
    let newUrl = url;
    const {limit, offset} = options;

    if (options !== {} && options.from && options.to) {
      if (!isValidApiRequestDateString(options.from) || !isValidApiRequestDateString(options.to)) {
        return Promise.reject(new BitmovinError('Wrong date format! Correct format is yyyy-MM-dd', {}));
      }
      newUrl = urljoin(newUrl, options.from, options.to);
    }

    const getParams = utils.buildGetParamString({
      limit,
      offset
    });

    if (getParams.length > 0) {
      newUrl = urljoin(newUrl, getParams);
    }

    return newUrl;
  };

  const daily = (options = {}) => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics/daily');
    const urlWithOptions = addOptionsToUrl(url, options);
    return get(configuration, urlWithOptions);
  };

  const typeFn = type => {
    return {
      daily: (options = {}) => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings/', type, '/daily');
        const urlWithOptions = addOptionsToUrl(url, options);
        return get(configuration, urlWithOptions);
      },

      list: (options = {}) => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings/', type);
        const urlWithOptions = addOptionsToUrl(url, options);
        return get(configuration, urlWithOptions);
      }
    };
  };

  return {
    /*
     * Gets the overall encoding statistics
     *
     * Options is a hash with optional parameters:
     * limit: Number - maximum results
     * offset: Number - skip n results
     *
     * If from and to is set only statistics between these two dates are returned
     * from: Date
     * to: Date
    */
    overall: (from?: string, to?: string) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/statistics');
      if (from && to) {
        url = urljoin(url, from, to);
      }
      return get(configuration, url);
    },

    vod: typeFn('vod'),
    live: typeFn('live'),
    daily,

    encodings: encodingId => {
      return {
        statistics: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings', encodingId);
          return get(configuration, url);
        },
        liveStatistics: liveStatistics(configuration, encodingId)
      };
    }
  };
};

export default configuration => {
  return statistics(configuration, http);
};
