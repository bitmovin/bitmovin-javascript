import urljoin from 'url-join';
import http, { utils } from '../utils/http';

import customPlayerBuildDomain from './customPlayerBuildDomain';

export const customBuilds = (configuration) => {
  const { get, post, delete_ } = http;

  const fn = (customBuildId) => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds', customBuildId);
        return get(configuration, url);
      },
      start: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds', customBuildId, "start");
        return post(configuration, url, {});
      },
      status: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds', customBuildId, "status");
        return get(configuration, url);
      },
      download: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds', customBuildId, "download");
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds', customBuildId);
        return delete_(configuration, url);
      }
    };
  };

  fn.add = (customBuild) => {
    const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds');
    return post(configuration, url, customBuild);
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'player/custom-builds');

    let getParams = utils.buildGetParamString({
      limit : limit,
      offset: offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  fn.domains = customPlayerBuildDomain(configuration);

  return fn;
};

export default (configuration) => {
  return customBuilds(configuration);
};
