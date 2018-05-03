import urljoin from 'url-join';
import http, {utils} from '../utils/http';

export const codecConfigurations = (configuration, http) => {
  const {get, post, delete_} = http;
  let typeFn = typeUrl => {
    let fn = codecConfigId => {
      return {
        details: () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl, codecConfigId);
          return get(configuration, url);
        },
        customData: () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl, codecConfigId, 'customData');

          return get(configuration, url);
        },
        delete: () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl, codecConfigId);
          return delete_(configuration, url);
        }
      };
    };

    fn.create = codecConfig => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl);

      return post(configuration, url, codecConfig);
    };

    fn.list = (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl);

      let getParams = utils.buildGetParamString({
        limit: limit,
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

  return {
    h264: typeFn('video/h264'),
    h265: typeFn('video/h265'),
    aac: typeFn('audio/aac'),
    vp9: typeFn('video/vp9'),
    ac3: typeFn('audio/ac3'),
    eac3: typeFn('audio/eac3'),
    vorbis: typeFn('audio/vorbis'),
    opus: typeFn('audio/opus'),
    mp2: typeFn('audio/mp2'),
    mp3: typeFn('audio/mp3'),
    vp8: typeFn('video/vp8'),
    mjpeg: typeFn('video/mjpeg'),

    list: (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations');

      const filterParams = utils.buildFilterParamString(filter);
      let getParams = utils.buildGetParamString({
        ...filterParams,
        limit: limit,
        offset: offset,
        sort: sort
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    },

    getType: configurationId => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', configurationId, 'type');

      return get(configuration, url);
    }
  };
};

export default configuration => {
  return codecConfigurations(configuration, http);
};
