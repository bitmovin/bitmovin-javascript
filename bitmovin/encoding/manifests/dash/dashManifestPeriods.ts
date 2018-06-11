import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';

import adaptationSets from './dashManifestAdaptationSets';

export const dashManifestPeriods = (configuration, manifestId, http) => {
  const {get, post, delete_} = http;
  const fn = periodId => {
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

  fn.add = period => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods');
    return post(configuration, url, period);
  };

  fn.list = (limit, offset) => {
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

  return fn;
};

export default (configuration, manifestId) => {
  return dashManifestPeriods(configuration, manifestId, http);
};
