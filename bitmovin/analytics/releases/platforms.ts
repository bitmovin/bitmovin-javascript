import * as urljoin from 'url-join';

import {Channel} from '../../player/channels';
import http, {utils} from '../../utils/http';
import {ApiResource, Details, HttpClient, List} from '../../utils/types';

export enum Platform {
  TvOs = 'tvos',
  AndroidExo = 'android-exo',
  AndroidBitmovin = 'android-bitmovin',
  IOs = 'ios',
  Web = 'web'
}

export interface AnalyticsVersion {
  version: string;
  podName: string;
  gitUrl: string;
  gitTag: string;
}

export interface Platforms {
  (platformName: Platform): {
    channels: {
      (channelName: Channel): {
        versions: {
          (versionNumber: string): {
            latest: Details<AnalyticsVersion>;
            list: List<AnalyticsVersion>;
          };
          list: List<AnalyticsVersion>;
        };
      };
      list: List<Channel>;
    };
  };
  list: List<Platform>;
}

export const platforms = (configuration, httpClient: HttpClient): Platforms => {
  const {get} = httpClient;
  const platformResourceDetails = (platformName: Platform) => {
    const channelResourceDetails = (channelName: Channel) => {
      const versionResourceDetails = (versionNumber: string) => ({
        latest: () => {
          const url = urljoin(
            configuration.apiBaseUrl,
            'analytics/releases',
            platformName,
            channelName,
            versionNumber,
            'latest'
          );
          return get<ApiResource<AnalyticsVersion>>(configuration, url);
        },
        list: utils.buildListCallFunction<AnalyticsVersion>(
          httpClient,
          configuration,
          urljoin(configuration.apiBaseUrl, 'analytics/releases', platformName, channelName, versionNumber)
        )
      });

      const versionList = utils.buildListCallFunction<AnalyticsVersion>(
        httpClient,
        configuration,
        urljoin(configuration.apiBaseUrl, 'analytics/releases', platformName, channelName)
      );

      const versionResource = Object.assign(versionResourceDetails, {list: versionList});

      return {versions: versionResource};
    };

    const channelList = utils.buildListCallFunction<Channel>(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'analytics/releases', platformName)
    );

    const channelResource = Object.assign(channelResourceDetails, {list: channelList});

    return {channels: channelResource};
  };

  const platformList = utils.buildListCallFunction<Platform>(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'analytics/releases/platforms')
  );

  const resource = Object.assign(platformResourceDetails, {list: platformList});

  return resource;
};

export default configuration => {
  return platforms(configuration, http);
};
