import urljoin from 'url-join';

import http, {utils} from '../utils/http';

export const channels = (configuration, http) => {
  const {get} = http;
  const fn = channelName => {
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

  fn.list = (limit, offset) => {
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

  return fn;
};

export default configuration => {
  return channels(configuration, http);
};
