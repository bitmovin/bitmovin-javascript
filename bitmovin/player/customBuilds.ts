import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {BitmovinDetails, Create, Delete, Details, HttpClient, List} from '../utils/types';

import {DomainDetails} from './licenses';
import {webCustomPlayerBuildDomain} from './webCustomPlayerBuildDomain';

interface CustomPlayerBuildDomain {
  id: string;
  domain: string;
}

// TODO: there is no type CustomPlayerBuild in the api spec, find out what it contains (the values right now are taken from the portal)
export type CustomPlayerBuild = BitmovinDetails & {
  id: string;
  createdAt: string;
  description: string;
  domains: CustomPlayerBuildDomain[];
  modifiedAt: string;
  name: string;
  playerVersion: string;
  status: string;
  selected?: boolean;
};
export type CustomPlayerBuildDetails = CustomPlayerBuild & {};

export enum CustomPlayerBuildStatusEnum {
  CREATED = 'CREATED',
  FINISHED = 'FINISHED',
  RUNNING = 'RUNNING',
  ERROR = 'ERROR'
}

export interface CustomPlayerBuildStatus {
  status: CustomPlayerBuildStatusEnum;
  progress: number;
  eta: number;
  messages: Array<{text: string; links: any[]}>;
  subtasks: any[];
}

interface CustomPlayerBuildDownload {
  downloadLink: string;
  expiresAt: string;
  createdAt: string;
  modifiedAt: string;
}

export interface CustomBuildsWeb {
  (customBuildId: string): {
    details: Details<CustomPlayerBuildDetails>;
    start: () => Promise<string>;
    status: () => Promise<CustomPlayerBuildStatus>;
    download: () => Promise<CustomPlayerBuildDownload>;
    delete: Delete<string>; // TODO: not specified in api spec
  };

  add: Create<CustomPlayerBuildDetails>;
  list: List<CustomPlayerBuildDetails>;
  domains: any;
}

export interface CustomBuilds {
  web: CustomBuildsWeb;
}

export const customBuilds = (configuration, httpClient: HttpClient): CustomBuilds => {
  const {get, post, delete_} = httpClient;

  const web = (): CustomBuildsWeb => {
    const resourceDetails = customBuildId => {
      return {
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web', customBuildId);
          return get<CustomPlayerBuildDetails>(configuration, url);
        },
        start: () => {
          const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web', customBuildId, 'start');
          return post<string, any>(configuration, url, {});
        },
        status: () => {
          const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web', customBuildId, 'status');
          return get<CustomPlayerBuildStatus>(configuration, url);
        },
        download: () => {
          const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web', customBuildId, 'download');
          return get<CustomPlayerBuildDownload>(configuration, url);
        },
        delete: () => {
          const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web', customBuildId);
          return delete_<string>(configuration, url);
        }
      };
    };

    const add = customBuild => {
      const url = urljoin(configuration.apiBaseUrl, 'player/custom-builds/web');
      return post<CustomPlayerBuildDetails, string>(configuration, url, customBuild);
    };

    const list = utils.buildListCallFunction<CustomPlayerBuildDetails>(
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
