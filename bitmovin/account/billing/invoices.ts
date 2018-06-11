import urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {HttpClient} from '../../utils/types';

export const invoices = (configuration, httpClient: HttpClient) => {
  const invoicesBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'billing', 'invoices');
  const {get} = httpClient;

  return {
    encoding: {
      list: (limit, offset) => {
        let url = urljoin(invoicesBaseUrl, 'encoding');
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
        let url = urljoin(invoicesBaseUrl, 'player');
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
        let url = urljoin(invoicesBaseUrl, 'analytics');
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
  return invoices(configuration, http);
};
