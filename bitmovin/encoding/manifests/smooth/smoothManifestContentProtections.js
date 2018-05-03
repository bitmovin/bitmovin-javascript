import urljoin from 'url-join';
import http, {utils} from '../../../utils/http';

export const contentProtection = (configuration, manifestId, http) => {
  const {get, post, delete_} = http;
  const baseUrl = urljoin(configuration.apiBaseUrl, 'encoding/manifests/smooth', manifestId, 'contentprotection');

  const fn = contentProtectionId => {
    return {
      details: () => {
        const url = urljoin(baseUrl, contentProtectionId);
        return get(configuration, url);
      },
      delete: () => {
        let url = urljoin(baseUrl, contentProtectionId);
        return delete_(configuration, url);
      }
    };
  };

  fn.add = protection => {
    return post(configuration, baseUrl, protection);
  };

  fn.list = (limit, offset) => {
    let url = baseUrl;

    let getParams = utils.buildGetParamString({
      limit: limit,
      offset: offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  return fn;
};

export default (configuration, manifestId) => {
  return contentProtection(configuration, manifestId, http);
};
