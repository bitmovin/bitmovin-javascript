import * as urljoin from 'url-join';

import BitmovinError from '../utils/BitmovinError';
import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

export interface Statistics {
  impressions: (
    licenseKeyId: string,
    start?: string,
    end?: string,
    interval?: string,
    offset?: number,
    limit?: number
  ) => Promise<any>; // TODO: properly type return type, couldn't find it in the api spec
  INTERVAL: {
    DAILY: 'DAILY';
  };
}

export const statistics = (configuration, httpClient: HttpClient): Statistics => {
  const {get} = httpClient;

  return {
    impressions: (licenseKeyId, start, end, interval, offset, limit) => {
      if (!start || !end) {
        return Promise.reject(new BitmovinError('Not all required params given.', undefined));
      }

      const playerStatisticsBaseUrl = urljoin(configuration.apiBaseUrl, '/player/statistics/impressions');

      const getParams = utils.buildGetParamString({
        licenseKeyId,
        start,
        end,
        interval,
        offset,
        limit
      });

      const url = urljoin(playerStatisticsBaseUrl, getParams);
      return get<any>(configuration, url);
    },
    INTERVAL: {
      DAILY: 'DAILY'
    }
  };
};

export default configuration => {
  return statistics(configuration, http);
};
