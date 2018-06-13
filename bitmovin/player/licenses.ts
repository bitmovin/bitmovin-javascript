import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {ApiResource, BitmovinDetails, Details, HttpClient, List} from '../utils/types';

import domains from './domains';
import thirdPartyLicensing from './thirdPartyLicensing';

export interface DomainDetails {
  id: string,
  url: string
}

export type PlayerLicense = BitmovinDetails & {
  id: string,
  name: string,
  licenseKey: string,
  impressions: number,
  maxImpressions: number,
  thirdPartyLicensingEnabled: boolean,
  domains: Array<DomainDetails>
}

export type  PlayerLicenseListObject = BitmovinDetails & {
  id: string,
  name: string,
  licenseKey: string,
  impressions: number,
  maxImpressions: number,
  thirdPartyLicensingEnabled: boolean
}

export interface Licenses {
  (licenseId: string): {
    details: Details<PlayerLicense>,
    update: (license: PlayerLicense) => Promise<ApiResource<PlayerLicense>>
  },
  list: List<PlayerLicenseListObject>
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

  const list = utils.buildListCallFunction<PlayerLicenseListObject>(
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
