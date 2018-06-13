import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {ApiResource, Details, HttpClient, List} from '../utils/types';

export enum Channel {
  Developer = 'developer', Beta = 'beta', Staging = 'staging', Stable = 'stable'
}

export interface PlayerVersion {
  version: string,
  playerUrl: string
}

export interface Channels {
  (channelName: string): {
    versions: {
      list: List<PlayerVersion>,
      latest: Details<PlayerVersion>
    }
  }
}

export const channels = (configuration, httpClient: HttpClient): Channels => {
  const {get} = httpClient;
  const resourceDetails = (channelName: string) => {
    const versions = {
      list: utils.buildListCallFunction<PlayerVersion>(
        httpClient,
        configuration,
        urljoin(configuration.apiBaseUrl, 'player/channels', channelName, 'versions')
      ),
      latest: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/channels', channelName, 'versions', 'latest');
        return get<ApiResource<PlayerVersion>>(configuration, url);
      }
    };

    return {
      versions
    };
  };

  const list = utils.buildListCallFunction<Channel>(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'player/channels')
  );

  const resource = Object.assign(resourceDetails, {list});
  return resource;
};

export default configuration => {
  return channels(configuration, http);
};
