import * as urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {HttpClient} from '../../utils/types';

export const statements = (configuration, httpClient: HttpClient) => {
  const statementsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'billing', 'statements');
  const {get} = httpClient;

  return {
    encoding: {
      list: (limit, offset) => {
        let url = urljoin(statementsBaseUrl, 'encoding');
        const getParams = utils.buildGetParamString({
          limit,
          offset
        });
        if (getParams.length > 0) {
          url = urljoin(url, getParams);
        }
        return get(configuration, url);
      }
    },
    player: {
      list: (limit, offset) => {
        let url = urljoin(statementsBaseUrl, 'player');
        const getParams = utils.buildGetParamString({
          limit,
          offset
        });
        if (getParams.length > 0) {
          url = urljoin(url, getParams);
        }
        return get(configuration, url);
      }
    },
    analytics: {
      list: (limit, offset) => {
        let url = urljoin(statementsBaseUrl, 'analytics');
        const getParams = utils.buildGetParamString({
          limit,
          offset
        });
        if (getParams.length > 0) {
          url = urljoin(url, getParams);
        }
        return get(configuration, url);
      }
    }
  };
};

export default configuration => {
  return statements(configuration, http);
};
