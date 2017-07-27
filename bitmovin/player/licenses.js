import urljoin from 'url-join';
import http, { utils } from '../http';

import domains from './domains';
import thirdPartyLicensing from './thirdPartyLicensing';

export const licenses = (configuration, http) => {
  const { get, post } = http;
  const fn = (licenseId) => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId);
        return get(configuration, url);
      },
      domains: domains(configuration, licenseId),
      thirdPartyLicensing: thirdPartyLicensing(configuration, licenseId)
    };
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'player/licenses');

    const getParams = utils.buildGetParamString({
      limit : limit,
      offset: offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  return fn;
};

export default (configuration) => { return licenses(configuration, http); };
