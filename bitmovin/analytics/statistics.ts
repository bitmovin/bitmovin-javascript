import urljoin from 'url-join';

import BitmovinError from '../utils/BitmovinError';
import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

export const statistics = (configuration, httpClient: HttpClient) => {
  const {get} = httpClient;

  return {
    impressions: (licenseKeyId, start, end, interval, offset, limit) => {
      if (!start || !end) {
        return Promise.reject(new BitmovinError('Not all required params given.'));
      }

      const analyticsStatisticsBaseUrl = urljoin(configuration.apiBaseUrl, '/analytics/statistics/impressions');

      const getParams = utils.buildGetParamString({
        licenseKeyId,
        start,
        end,
        interval,
        offset,
        limit
      });

      const url = urljoin(analyticsStatisticsBaseUrl, getParams);
      return get(configuration, url);
    },
    INTERVAL: {
      DAILY: 'DAILY'
    }
  };
};

export default configuration => {
  return statistics(configuration, http);
};
