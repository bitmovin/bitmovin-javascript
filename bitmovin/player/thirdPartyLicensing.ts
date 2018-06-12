import urljoin from 'url-join';

import http from '../utils/http';
import {HttpClient} from '../utils/types';

export const thirdPartyLicensing = (configuration, licenseId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;

  return {
    delete: () => {
      const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'third-party-licensing');
      return delete_(configuration, url);
    },
    get: () => {
      const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'third-party-licensing');
      return get(configuration, url);
    },
    add: thirdPartyLicensing => {
      const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'third-party-licensing');
      return post(configuration, url, thirdPartyLicensing);
    }
  };
};

export default (configuration, licenseId) => {
  return thirdPartyLicensing(configuration, licenseId, http);
};
