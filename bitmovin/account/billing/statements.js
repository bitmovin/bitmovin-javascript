import urljoin from 'url-join';
import http, { utils } from '../../http';

export const statements = (configuration, http) => {
  const statementsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'billing', 'statements');
  const {get} = http;

  return {
    encoding: {
      list: (limit, offset) => {
        let url = urljoin(statementsBaseUrl, 'encoding');
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
        let url = urljoin(statementsBaseUrl, 'player');
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
        let url = urljoin(statementsBaseUrl, 'analytics');
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
  }
};

export default (configuration) => { return statements(configuration, http); };

