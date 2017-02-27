import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';

const domains = (configuration, licenseId) => {
  const fn = (domainId) => {
    return {
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'analytics/licenses', licenseId, 'domains', domainId);
        return delete_(configuration, url);
      }
    };
  };

  fn.add = (domain) => {
    const url = urljoin(configuration.apiBaseUrl, 'analytics/licenses', licenseId, 'domains');
    return post(configuration, url, domain);
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'analytics/licenses', licenseId, 'domains');

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

module.exports = domains;
