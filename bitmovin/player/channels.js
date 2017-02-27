import urljoin from 'url-join';
import {get, utils} from '../http';
import Promise from 'bluebird';

const channels = (configuration) => {
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

    return new Promise((resolve, reject) => {
      get(configuration, url).then((response) => {
        resolve({
          items: response.channels
        });
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return fn;
};

module.exports = channels;
