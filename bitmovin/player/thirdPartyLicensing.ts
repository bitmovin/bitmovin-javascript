import * as urljoin from 'url-join';

import http from '../utils/http';
import {Create, Delete, Details, HttpClient} from '../utils/types';

export interface ThirdPartyLicensing {
  delete: Delete<any>;
  get: Details<any>;
  add: Create<any>;
}

export const thirdPartyLicensing = (configuration, licenseId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;

  return {
    delete: () => {
      const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'third-party-licensing');
      return delete_<any>(configuration, url);
    },
    get: () => {
      const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'third-party-licensing');
      return get<any>(configuration, url);
    },
    add: thirdPartyLicensingPayload => {
      const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'third-party-licensing');
      return post<any, any>(configuration, url, thirdPartyLicensingPayload);
    }
  };
};

export default (configuration, licenseId): ThirdPartyLicensing => {
  return thirdPartyLicensing(configuration, licenseId, http);
};
