// @flow

import urljoin from 'url-join';

import encodings, {type Encodings} from './encoding/encodings';
import codecConfigurations from './encoding/codecConfigurations';
import inputs from './encoding/inputs';
import outputs from './encoding/outputs';
import manifests from './encoding/manifests';
import filters from './encoding/filters';
import statistics from './encoding/statistics';
import infrastructure from './encoding/infrastructure';
import account from './account/account';
import playerChannels from './player/channels';
import playerLicenses from './player/licenses';
import playerStatistics from './player/statistics';
import analyticsLicenses from './analytics/licenses';
import analyticsQueries from './analytics/queries';
import analyticsImpressions from './analytics/impressions';
import analyticsStatistics from './analytics/statistics';
import customBuilds from './player/customBuilds';
import logger from './utils/Logger';
import utils from './utils/Utils';
import type {BitmovinConfiguration} from './utils/types';
import notifications from './notifications/notifications';
import type {Notifications} from './notifications/notifications';

const checkAuthorizationInConfiguration = function(configuration) {
  if (utils.isNoEmptyString(configuration.apiKey)) {
    return;
  }

  if (utils.isNoEmptyString(configuration.eMail) && utils.isNoEmptyString(configuration.password)) {
    return;
  }

  logger.log('Neither apiKey nor email and password provided in configuration.');
};

const setupConfiguration = function(configuration) {
  if (configuration.debug && configuration.debug === true) {
    logger.enableLogging();
  }

  if (configuration.protocol === undefined) {
    configuration.protocol = 'https';
  }

  if (configuration.host === undefined) {
    configuration.host = 'api.bitmovin.com';
  }

  if (configuration.basePath === undefined) {
    configuration.basePath = '/v1';
  }

  if (configuration.requestTimeout === undefined) {
    configuration.requestTimeout = 30000;
  }

  if (configuration.xApiClient === undefined) {
    configuration.xApiClient = 'bitmovin-javascript';
  }

  if (configuration.additionalHeaders === undefined) {
    configuration.additionalHeaders = {};
  }

  configuration.apiBaseUrl = urljoin(configuration.protocol + '://' + configuration.host, configuration.basePath);

  configuration.httpHeaders = {
    'Content-Type': 'application/json',
    'X-Api-Key': configuration.apiKey,
    'X-Tenant-Org-Id': configuration.tenantOrgId,
    'X-Api-Client': configuration.xApiClient,
    'X-Api-Client-Version': `${__VERSION__}`,
    ...configuration.additionalHeaders
  };
};

type Encoding = {
  encodings: Encodings,
  codecConfigurations: Object,
  inputs: Object,
  outputs: Object,
  manifests: Object,
  filters: Object,
  statistics: Object,
  infrastructure: Object
};

type Player = {
  channels: Object,
  licenses: Object,
  statistics: Object,
  customBuilds: Object
};

type Analytics = {
  licenses: Object,
  statistics: Object,
  impressions: Object,
  queries: Object
};

type Account = Object;

export type BitmovinAPI = {
  encoding: Encoding,
  player: Player,
  analytics: Analytics,
  account: Account,
  notifications: Notifications
}

export const Bitmovin = (configuration: BitmovinConfiguration): BitmovinAPI => {
  checkAuthorizationInConfiguration(configuration);

  setupConfiguration(configuration);

  const bitmovin: BitmovinAPI = {
    configuration: configuration,
    encoding: {
      encodings: encodings(configuration),
      codecConfigurations: codecConfigurations(configuration),
      inputs: inputs(configuration),
      outputs: outputs(configuration),
      manifests: manifests(configuration),
      filters: filters(configuration),
      statistics: statistics(configuration),
      infrastructure: infrastructure(configuration)
    },
    player: {
      channels: playerChannels(configuration),
      licenses: playerLicenses(configuration),
      statistics: playerStatistics(configuration),
      customBuilds: customBuilds(configuration)
    },
    analytics: {
      licenses: analyticsLicenses(configuration),
      queries: analyticsQueries(configuration),
      impressions: analyticsImpressions(configuration),
      statistics: analyticsStatistics(configuration)
    },
    account: account(configuration),
    notifications: notifications(configuration)
  };

  return bitmovin;
};

