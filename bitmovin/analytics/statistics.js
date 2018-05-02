import urljoin from 'url-join';
import http, {utils} from '../utils/http';
import BitmovinError from '../utils/BitmovinError';

export const statistics = (configuration, http) => {
  const {get} = http;

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
