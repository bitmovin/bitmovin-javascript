import urljoin from 'url-join';
import http, { utils } from '../../http';

export const invoices = (configuration, http) => {
  const invoicesBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'billing', 'invoices');
  const {get} = http;

  return {
    encoding: {
      list: (limit, offset) => {
        let url = urljoin(invoicesBaseUrl, 'encoding');
        let getParams = utils.buildGetParamString({
          limit : limit,
          offset: offset
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
        let getParams = utils.buildGetParamString({
          limit : limit,
          offset: offset
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
        let getParams = utils.buildGetParamString({
          limit : limit,
          offset: offset
        });
        if (getParams.length > 0) {
          url = urljoin(url, getParams);
        }
        return get(configuration, url);
      }
    }
  };
};

export default (configuration) => {
  return invoices(configuration, http);
};

