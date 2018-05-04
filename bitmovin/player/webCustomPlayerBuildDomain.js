import urljoin from 'url-join';
import { utils } from '../utils/http';

export const webCustomPlayerBuildDomain = (configuration, http) => {
  const { get, post, delete_ } = http;

  const fn = (domainId) => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web/domains', domainId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web/domains', domainId);
        return delete_(configuration, url);
      }
    };
  };

  fn.add = (customPlayerBuildDomain) => {
    const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web/domains');
    return post(configuration, url, customPlayerBuildDomain);
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web/domains');

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

export default (configuration, http) => {
  return webCustomPlayerBuildDomain(configuration, http);
};
