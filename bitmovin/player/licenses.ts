import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {ApiResource, Details, HttpClient, List} from '../utils/types';

import domains, {Domains} from './domains';
import thirdPartyLicensing, {ThirdPartyLicensing} from './thirdPartyLicensing';

export interface Domain {
  url: string;
}

export interface DomainDetails {
  id: string;
  url: string;
}

export interface PlayerLicense {
  id: string;
  name: string;
  licenseKey: string;
  impressions: number;
  maxImpressions: number;
  thirdPartyLicensingEnabled: boolean;
  domains: DomainDetails[];
}

export interface UpdatePlayerLicense {
  name?: string;
  licenseKey?: string;
  impressions?: number;
  maxImpressions?: number;
  thirdPartyLicensingEnabled?: boolean;
}

export interface CreatePlayerLicensePayload {
  name: string;
}

export interface Licenses {
  (licenseId: string): {
    details: Details<PlayerLicense>;
    update: (license: UpdatePlayerLicense) => Promise<ApiResource<PlayerLicense>>;
    domains: Domains;
    thirdPartyLicensing: ThirdPartyLicensing;
  };

  create: (licensePayload: CreatePlayerLicensePayload) => Promise<PlayerLicense>;
  list: List<PlayerLicense>;
}

export const licenses = (configuration, httpClient: HttpClient): Licenses => {
  const {get, post, put} = httpClient;
  const resourceDetails = licenseId => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId);
        return get<PlayerLicense>(configuration, url);
      },
      update: license => {
        const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId);
        return put<PlayerLicense, PlayerLicense>(configuration, url, license);
      },
      domains: domains(configuration, licenseId),
      thirdPartyLicensing: thirdPartyLicensing(configuration, licenseId)
    };
  };

  const create = (licensePayload: CreatePlayerLicensePayload) => {
    const url = urljoin(configuration.apiBaseUrl, 'player/licenses');
    return post<PlayerLicense, CreatePlayerLicensePayload>(configuration, url, licensePayload);
  };

  const list = utils.buildListCallFunction<PlayerLicense>(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'player/licenses')
  );

  const resource = Object.assign(resourceDetails, {create, list});
  return resource;
};

export default configuration => {
  return licenses(configuration, http);
};
