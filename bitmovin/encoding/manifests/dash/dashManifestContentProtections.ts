import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';

export const contentProtections = (
  configuration,
  manifestId,
  periodId,
  adaptationSetId,
  representationInfo,
  httpClient: HttpClient
) => {
  const {get, post, delete_} = httpClient;

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

  const resourceDetails = contentProtectionId => {
    return {
      details: () => {
        const url = urljoin(baseUrl, contentProtectionId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(baseUrl, contentProtectionId);
        return delete_(configuration, url);
      }
    };
  };

  const add = contentProtection => {
    const url = baseUrl;
    return post(configuration, url, contentProtection);
  };

  const list = (limit, offset) => {
    let url = baseUrl;

    const getParams = utils.buildGetParamString({
      limit,
      offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {add, create, list});
  return resource;
};

export default (configuration, manifestId, periodId, adaptationSetId, representationInfo) => {
  return contentProtections(configuration, manifestId, periodId, adaptationSetId, representationInfo, http);
};
