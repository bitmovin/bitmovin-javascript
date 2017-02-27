import urljoin from 'url-join';
import {get, utils} from '../http';

import domains from './domains';

const licenses = (configuration) => {
  const fn = (licenseId) => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'analytics/licenses', licenseId);
        return get(configuration, url);
      },
      domains: domains(configuration, licenseId)
    };
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'analytics/licenses');

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

module.exports = licenses;
