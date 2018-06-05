import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';

export const contentProtections = (configuration, manifestId, periodId, adaptationSetId, representationInfo, http) => {
  const {get, post, delete_} = http;

  let baseUrl = urljoin(
    configuration.apiBaseUrl,
    'encoding/manifests/dash',
    manifestId,
    'periods',
    periodId,
    'adaptationsets',
    adaptationSetId
  );
  if (representationInfo !== null && representationInfo !== undefined) {
    baseUrl = urljoin(baseUrl, 'representations', representationInfo.type, representationInfo.id);
  }
  baseUrl = urljoin(baseUrl, 'contentprotection');

  let fn = contentProtectionId => {
    return {
      details: () => {
        let url = urljoin(baseUrl, contentProtectionId);
        return get(configuration, url);
      },
      delete: () => {
        let url = urljoin(baseUrl, contentProtectionId);
        return delete_(configuration, url);
      }
    };
  };

  fn.add = contentProtection => {
    let url = baseUrl;
    return post(configuration, url, contentProtection);
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

export default (configuration, manifestId, periodId, adaptationSetId, representationInfo) => {
  return contentProtections(configuration, manifestId, periodId, adaptationSetId, representationInfo, http);
};
