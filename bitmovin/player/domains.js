import urljoin from 'url-join';
import http, { utils } from '../http';

export const domains = (configuration, licenseId, http) => {
  const { get, post, delete_ } = http;

  const fn = (domainId) => {
    return {
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'domains', domainId);
        return delete_(configuration, url);
      }
    };
  };

  fn.add = (domain) => {
    const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'domains');
    return post(configuration, url, domain);
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'domains');

    let getParams = utils.buildGetParamString({
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

export default (configuration, licenseId) => {
  return domains(configuration, licenseId, http);
};
// Module.exports = domains;
