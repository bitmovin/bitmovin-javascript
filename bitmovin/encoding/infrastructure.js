import urljoin from 'url-join';
import http, {utils} from '../http';

export const infrastructure = (configuration, http) => {
  const { get, post, delete_ } = http;

  const typeFn = (type) => {

    let fn = (id) => {
      return {
        status: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'status');
          return get(configuration, url);
        },
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id);
          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id);
          return delete_(configuration, url);
        },
        customData: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'customData');
          return get(configuration, url);
        }
      }
    };

    fn.create =  (infrastructure) => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type);
      return post(configuration, url, infrastructure);
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    return fn;
  };

  return {
    kubernetes: typeFn('kubernetes')
  }
};

export default (configuration) => { return infrastructure(configuration, http); };
