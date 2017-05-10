import urljoin from 'url-join';
import http, {utils} from '../http';

export const outputs = (configuration, http) => {
  const { get, post, delete_ } = http;
  let typeFn = (typeUrl) => {
    let fn = (outputId) => {
      return {
        details   : () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId);
          return get(configuration, url);
        },
        customData: () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId, 'customData');

          return get(configuration, url);
        },
        delete    : () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId);
          return delete_(configuration, url);
        }
      };
    };

    fn.create = (output) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl);
      return post(configuration, url, output);
    };

    fn.list = (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl);

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
    };

    return fn;
  };

  let bitmovinTypeFn = (typeUrl) => {
    let bitmovinFn = (outputId) => {
      return {
        details: () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId);

          return get(configuration, url);
        }
      };
    };

    bitmovinFn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    return bitmovinFn;
  };

  return {
    s3       : typeFn('s3'),
    gcs      : typeFn('gcs'),
    azure    : typeFn('azure'),
    ftp      : typeFn('ftp'),
    sftp     : typeFn('sftp'),
    genericS3: typeFn('generic-s3'),
    bitmovin : {
      aws: bitmovinTypeFn('bitmovin/aws'),
      gcp: bitmovinTypeFn('bitmovin/gcp')
    },

    list: (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs');

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    },

    getType: (outputId) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', outputId, 'type');

      return get(configuration, url);
    }
  };
};

export default (configuration) => { return outputs(configuration, http); };
