import urljoin from 'url-join';

import encodings from './encoding/encodings';
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

import logger from './Logger';
import utils from './Utils';

const checkAuthorizationInConfiguration = function(configuration) {
  if (utils.isNoEmptyString(configuration.apiKey)) {
    return;
  }

  if (utils.isNoEmptyString(configuration.eMail) && utils.isNoEmptyString(configuration.password)) {
    return;
  }

  logger.log('Neither apiKey nor email and password provided in configuration.');
};

export default class Bitmovin {

  constructor(configuration = {}) {

    checkAuthorizationInConfiguration(configuration);

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

    configuration.apiBaseUrl = urljoin(configuration.protocol + '://' + configuration.host, configuration.basePath);

    configuration.httpHeaders = {
      'Content-Type'        : 'application/json',
      'X-Api-Key'           : configuration.apiKey,
      'X-Tenant-Org-Id'     : configuration.tenantOrgId,
      'X-Api-Client'        : configuration.xApiClient,
      'X-Api-Client-Version': '1.2.1'
    };

    this.configuration = configuration;

    this.encoding = {
      encodings          : encodings(this.configuration),
      codecConfigurations: codecConfigurations(this.configuration),
      inputs             : inputs(this.configuration),
      outputs            : outputs(this.configuration),
      manifests          : manifests(this.configuration),
      filters            : filters(this.configuration),
      statistics         : statistics(this.configuration),
      infrastructure     : infrastructure(this.configuration)
    };

    this.player = {
      channels: playerChannels(this.configuration),
      licenses: playerLicenses(this.configuration),
      statistics: playerStatistics(this.configuration)
    };

    this.analytics = {
      licenses: analyticsLicenses(this.configuration),
      queries: analyticsQueries(this.configuration),
      impressions: analyticsImpressions(this.configuration),
      statistics: analyticsStatistics(this.configuration)
    };

    this.account = account(this.configuration);
  }
}
