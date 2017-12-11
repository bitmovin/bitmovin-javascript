import urljoin from 'url-join';
import http, { utils} from '../utils/http';

export const inputs = (configuration, http) => {
  const { get, post, delete_ } = http;
  let typeFn = (typeUrl) => {
    let fn = (inputId) => {
      return {
        details   : () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId);
          return get(configuration, url);
        },
        customData: () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId, 'customData');
          return get(configuration, url);
        },
        delete    : () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId);
          return delete_(configuration, url);
        }
      };
    };

    fn.create = (input) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl);
      return post(configuration, url, input);
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl);

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

  let rtmpTypeFn = (typeUrl) => {
    let rtmpFn = (inputId) => {
      return {
        details: () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId);
          return get(configuration, url);
        }
      };
    };

    rtmpFn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    return rtmpFn;
  };

  return {
    aspera   : typeFn('aspera'),
    azure    : typeFn('azure'),
    ftp      : typeFn('ftp'),
    gcs      : typeFn('gcs'),
    http     : typeFn('http'),
    https    : typeFn('https'),
    rtmp     : rtmpTypeFn('rtmp'),
    s3       : typeFn('s3'),
    genericS3: typeFn('generic-s3'),
    sftp     : typeFn('sftp'),
    local    : typeFn('local'),

    list: (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs');

      const filterParams = utils.buildFilterParamString(filter);
      let getParams = utils.buildGetParamString({
        ...filterParams,
        limit : limit,
        offset: offset,
        sort: sort
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    },

    getType: (inputId) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', inputId, 'type');
      return get(configuration, url);
    }
  };
};

export default (configuration) => { return inputs(configuration, http); };
