import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {ApiResource, BitmovinDetails, Details, HttpClient, List} from '../utils/types';

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

export interface Licenses {
  (licenseId: string): {
    details: Details<PlayerLicense>;
    update: (license: UpdatePlayerLicense) => Promise<ApiResource<PlayerLicense>>;
    domains: Domains;
    thirdPartyLicensing: ThirdPartyLicensing;
  };

  list: List<PlayerLicense>;
}

export const licenses = (configuration, httpClient: HttpClient): Licenses => {
  const {get, put} = httpClient;
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

  const list = utils.buildListCallFunction<PlayerLicense>(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'player/licenses')
  );

  const resource = Object.assign(resourceDetails, {list});
  return resource;
};

export default configuration => {
  return licenses(configuration, http);
};
