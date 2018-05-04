import urljoin from 'url-join';
import http, {utils} from '../utils/http';

import webCustomPlayerBuildDomain from './webCustomPlayerBuildDomain';

export const customBuilds = (configuration, http) => {
  const {get, post, delete_} = http;

  const web = () => {
    const fn = customBuildId => {
      return {
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web', customBuildId);
          return get(configuration, url);
        },
        start: () => {
          const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web', customBuildId, 'start');
          return post(configuration, url, {});
        },
        status: () => {
          const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web', customBuildId, 'status');
          return get(configuration, url);
        },
        download: () => {
          const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web', customBuildId, 'download');
          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web', customBuildId);
          return delete_(configuration, url);
        }
      };
    };

    fn.add = customBuild => {
      const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web');
      return post(configuration, url, customBuild);
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web');

      let getParams = utils.buildGetParamString({
        limit: limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    fn.domains = webCustomPlayerBuildDomain(configuration, http);
    return fn;
  };

  return {
    web: web()
  };
};

export default configuration => {
  return customBuilds(configuration, http);
};
