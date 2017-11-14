import urljoin from 'url-join';
import http, { utils} from '../http';
import Promise from 'bluebird';

export const channels = (configuration, http) => {
  const { get } = http;
  const fn = (channelName) => {
    const versions = {
      list  : (limit, offset) => {
        let url = urljoin(configuration.apiBaseUrl, 'player/channels', channelName, 'versions');

        let getParams = utils.buildGetParamString({
          limit : limit,
          offset: offset
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
      versions: versions
    };
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'player/channels');

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

export default (configuration) => {
  return channels(configuration, http);
};
