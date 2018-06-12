import urljoin from 'url-join';

import account, {Account} from './account';
import analytics, {Analytics} from './analytics';
import encoding, {Encoding} from './encoding';
import player, {Player} from './player';

import logger from './utils/Logger';
import utils from './utils/Utils';
import {BitmovinConfiguration, InternalConfiguration} from './utils/types';

declare const __VERSION__: any;

const checkAuthorizationInConfiguration = configuration => {
  if (utils.isNoEmptyString(configuration.apiKey)) {
    return;
  }

  logger.log('No apiKey provided in configuration.');
};

const setupConfiguration = configuration => {
  const internalConfig: InternalConfiguration = {
    ...configuration
  };

  if (configuration.debug && configuration.debug === true) {
    logger.enableLogging();
  }

  if (internalConfig.protocol === undefined) {
    internalConfig.protocol = 'https';
  }

  if (internalConfig.host === undefined) {
    internalConfig.host = 'api.bitmovin.com';
  }

  if (internalConfig.basePath === undefined) {
    internalConfig.basePath = '/v1';
  }

  if (internalConfig.requestTimeout === undefined) {
    internalConfig.requestTimeout = 30000;
  }

  if (internalConfig.xApiClient === undefined) {
    internalConfig.xApiClient = 'bitmovin-javascript';
  }

  if (internalConfig.additionalHeaders === undefined) {
    internalConfig.additionalHeaders = {};
  }

  internalConfig.apiBaseUrl = urljoin(internalConfig.protocol + '://' + internalConfig.host, internalConfig.basePath);

  internalConfig.httpHeaders = {
    'Content-Type': 'application/json',
    'X-Api-Key': internalConfig.apiKey,
    'X-Tenant-Org-Id': internalConfig.tenantOrgId,
    'X-Api-Client': internalConfig.xApiClient,
    'X-Api-Client-Version': `${__VERSION__}`,
    ...internalConfig.additionalHeaders
  };

  return internalConfig;
};

export interface BitmovinAPI {
  encoding: Encoding;
  player: Player;
  analytics: Analytics;
  account: Account;
}

const Bitmovin = (configuration: BitmovinConfiguration): BitmovinAPI => {
  checkAuthorizationInConfiguration(configuration);

  const internalConfig: InternalConfiguration = setupConfiguration(configuration);

  const bitmovin: BitmovinAPI = {
    encoding: encoding(internalConfig),
    player: player(internalConfig),
    analytics: analytics(internalConfig),
    account: account(internalConfig)
  };

  return bitmovin;
};

export default Bitmovin;
