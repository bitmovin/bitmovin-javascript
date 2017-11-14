import urljoin from 'url-join';
import http, { utils } from '../http';
import adaptationSets from './dashManifestAdaptationSets';
import Promise from 'bluebird';

export const dashManifestPeriods = (configuration, manifestId, http) => {
  const { get, post, delete_ } = http;
  let fn = (periodId) => {
    return {
      details       : () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId);
        return get(configuration, url);
      },
      delete        : () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId);
        return delete_(configuration, url);
      },
      adaptationSets: adaptationSets(configuration, manifestId, periodId)
    };
  };

  fn.add = (period) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods');
    return post(configuration, url, period);
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods');

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

export default (configuration, manifestId) => {
  return dashManifestPeriods(configuration, manifestId, http);
};
