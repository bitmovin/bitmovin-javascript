import urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

export const channels = (configuration, httpClient: HttpClient) => {
  const {get} = httpClient;
  const resourceDetails = channelName => {
    const versions = {
      list: (limit, offset) => {
        let url = urljoin(configuration.apiBaseUrl, 'player/channels', channelName, 'versions');

        const getParams = utils.buildGetParamString({
          limit,
          offset
        });
        if (getParams.length > 0) {
          url = urljoin(url, getParams);
        }

        return get(configuration, url);
      },
      latest: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/channels', channelName, 'versions', 'latest');
        return get(configuration, url);
      }
    };

    return {
      versions
    };
  };

  const list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'player/channels');

    const getParams = utils.buildGetParamString({
      limit,
      offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {list});
  return resource;
};

export default configuration => {
  return channels(configuration, http);
};
