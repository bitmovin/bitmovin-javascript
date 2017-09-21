import urljoin from 'url-join';
import http, {utils} from '../http';
import BitmovinError from '../BitmovinError';

export const statistics = (configuration, http) => {
  const { get } = http;

  return {
    impressions: (licenseKeyId, start, end, interval, offset, limit) => {
      if (!licenseKeyId || !start || !end) {
        return Promise.reject(new BitmovinError('Not all required params given.'))
      }

      const playerStatisticsBaseUrl = urljoin(configuration.apiBaseUrl, '/analytics/statistics/impressions');

      const getParams = utils.buildGetParamString({
        licenseKeyId,
        start,
        end,
        interval,
        offset,
        limit
      });

      const url = urljoin(playerStatisticsBaseUrl, getParams);
      return get(configuration, url);
    }
  };
};

export default (configuration) => {
  return statistics(configuration, http);
};