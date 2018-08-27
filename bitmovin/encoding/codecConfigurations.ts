import * as urljoin from 'url-join';

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

    const list = utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl)
    );

    const resource = Object.assign(resourceDetails, {create, list});
    return resource;
  };

  return {
    h264: typeFn('video/h264'),
    h265: typeFn('video/h265'),
    aac: typeFn('audio/aac'),
    av1: typeFn('video/av1'),
    vp9: typeFn('video/vp9'),
    ac3: typeFn('audio/ac3'),
    eac3: typeFn('audio/eac3'),
    vorbis: typeFn('audio/vorbis'),
    opus: typeFn('audio/opus'),
    mp2: typeFn('audio/mp2'),
    mp3: typeFn('audio/mp3'),
    vp8: typeFn('video/vp8'),
    mjpeg: typeFn('video/mjpeg'),

    list: utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/configurations')
    ),

    getType: configurationId => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', configurationId, 'type');

      return get(configuration, url);
    }
  };
};

export default configuration => {
  return codecConfigurations(configuration, http);
};
