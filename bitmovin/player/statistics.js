import urljoin from 'url-join';
import http, {utils} from '../http';
import BitmovinError from '../BitmovinError';

export const statistics = (configuration, http) => {
  const { get } = http;

  return {
    impressions: (licenseKey, start, end, offset, limit) => {
      if (!licenseKey || !start || !end) {
        return Promise.reject(new BitmovinError('Not all required params given.'))
      }

      const playerStatisticsBaseUrl = urljoin(configuration.apiBaseUrl, '/player/statistics/impressions');

      const getParams = utils.buildGetParamString({
        licenseKey,
        start,
        end,
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
