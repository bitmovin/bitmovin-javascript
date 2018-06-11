import urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

export const codecConfigurations = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const typeFn = typeUrl => {
    const resourceDetails = codecConfigId => {
      return {
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl, codecConfigId);
          return get(configuration, url);
        },
        customData: () => {
          const url = urljoin(
            configuration.apiBaseUrl,
            'encoding/configurations',
            typeUrl,
            codecConfigId,
            'customData'
          );

          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl, codecConfigId);
          return delete_(configuration, url);
        }
      };
    };

    const create = codecConfig => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl);

      return post(configuration, url, codecConfig);
    };

    const list = (limit, offset, sort) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl);

      const getParams = utils.buildGetParamString({
        limit,
        offset,
        sort
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    const resource = Object.assign(resourceDetails, {create, list});
    return resource;
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
      const getParams = utils.buildGetParamString({
        ...filterParams,
        limit,
        offset,
        sort
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    },

    getType: configurationId => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', configurationId, 'type');

      return get(configuration, url);
    }
  };
};

export default configuration => {
  return codecConfigurations(configuration, http);
};
