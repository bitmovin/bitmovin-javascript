import urljoin from 'url-join';

import account from './account/account';
import analyticsImpressions from './analytics/impressions';
import analyticsLicenses from './analytics/licenses';
import analyticsQueries from './analytics/queries';
import analyticsStatistics from './analytics/statistics';
import codecConfigurations from './encoding/codecConfigurations';
import encodings, {Encodings} from './encoding/encodings';
import filters from './encoding/filters';
import infrastructure from './encoding/infrastructure';
import inputs from './encoding/inputs';
import manifests from './encoding/manifests';
import outputs from './encoding/outputs';
import statistics from './encoding/statistics';
import playerChannels from './player/channels';
import customBuilds from './player/customBuilds';
import playerLicenses from './player/licenses';
import playerStatistics from './player/statistics';
import logger from './utils/Logger';
import utils from './utils/Utils';
import {BitmovinConfiguration} from './utils/types';

const checkAuthorizationInConfiguration = (configuration) => {
  if (utils.isNoEmptyString(configuration.apiKey)) {
    return;
  }

  if (utils.isNoEmptyString(configuration.eMail) && utils.isNoEmptyString(configuration.password)) {
    return;
  }

  logger.log('Neither apiKey nor email and password provided in configuration.');
};

const setupConfiguration = (configuration) => {
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

interface Encoding {
  encodings: Encodings;
  codecConfigurations: object;
  inputs: object;
  outputs: object;
  manifests: object;
  filters: object;
  statistics: object;
  infrastructure: object;
}

interface Player {
  channels: object;
  licenses: object;
  statistics: object;
  customBuilds: object;
}

interface Analytics {
  licenses: object;
  statistics: object;
  impressions: object;
  queries: object;
}

interface Account {

}

export interface BitmovinAPI {
  encoding: Encoding;
  player: Player;
  analytics: Analytics;
  account: Account;
}

const Bitmovin = (configuration: BitmovinConfiguration): BitmovinAPI => {
    checkAuthorizationInConfiguration(configuration);

    setupConfiguration(configuration);

    const bitmovin: BitmovinAPI = {
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
      account: account(configuration)
    };

    return bitmovin;
};

export default Bitmovin;
