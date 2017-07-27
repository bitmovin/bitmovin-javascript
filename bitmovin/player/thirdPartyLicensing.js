import urljoin from 'url-join';
import http, { utils } from '../http';

export const thirdPartyLicensing = (configuration, licenseId, http) => {
  const { get, post, delete_ } = http;

  const fn = () => {
    return {
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'third-party-licensing');
        return delete_(configuration, url);
      },
      get: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'third-party-licensing');
        return get(configuration, url);
      }
    };
  };

  fn.add = (thirdPartyLicensing) => {
    const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'third-party-licensing');
    return post(configuration, url, thirdPartyLicensing);
  };

  return fn;
};

export default (configuration, licenseId) => { return thirdPartyLicensing(configuration, licenseId, http); };