import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

import {webCustomPlayerBuildDomain} from './webCustomPlayerBuildDomain';

export const customBuilds = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;

  const web = () => {
    const resourceDetails = customBuildId => {
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

    const add = customBuild => {
      const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web');
      return post(configuration, url, customBuild);
    };

    const list = utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'player/custom-builds/web')
    );

    const domains = webCustomPlayerBuildDomain(configuration, httpClient);

    const resource = Object.assign(resourceDetails, {add, domains, list});
    return resource;
  };

  return {
    web: web()
  };
};

export default configuration => {
  return customBuilds(configuration, http);
};
