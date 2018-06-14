import * as urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {HttpClient} from '../../../utils/types';

import adaptationSets from './dashManifestAdaptationSets';

export const dashManifestPeriods = (configuration, manifestId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const resourceDetails = periodId => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId);
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId);
        return delete_(configuration, url);
      },
      adaptationSets: adaptationSets(configuration, manifestId, periodId)
    };
  };

  const add = period => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods');
    return post(configuration, url, period);
  };

  const list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods');

    const getParams = utils.buildGetParamString({
      limit,
      offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default (configuration, manifestId) => {
  return dashManifestPeriods(configuration, manifestId, http);
};
