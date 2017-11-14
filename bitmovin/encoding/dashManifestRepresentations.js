import urljoin from 'url-join';
import http, { utils } from '../http';
import Promise from 'bluebird';

import contentProtections from './dashManifestContentProtections';

export const representations = (configuration, manifestId, periodId, adaptationSetId, http) => {
  const { get, post, delete_ } = http;
  let typeFn = (typeUrl) => {
    let fn = (representationId) => {
      return {
        details           : () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId, 'adaptationsets', adaptationSetId, 'representations', typeUrl, representationId);
          return get(configuration, url);
        },
        delete            : () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId, 'adaptationsets', adaptationSetId, 'representations', typeUrl, representationId);
          return delete_(configuration, url);
        },
        contentProtections: contentProtections(configuration, manifestId, periodId, adaptationSetId, {
          type: typeUrl,
          id  : representationId
        })
      };
    };

    fn.add = (representation) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId, 'adaptationsets', adaptationSetId, 'representations', typeUrl);
      return post(configuration, url, representation);
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods',
        periodId, 'adaptationsets', adaptationSetId, 'representations', typeUrl);

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

  return {
    fmp4   : typeFn('fmp4'),
    drmFmp4: typeFn('fmp4/drm'),
    sidecar: typeFn('sidecar')
  };
};

export default (configuration, manifestId, periodId, adaptationSetId) => {
  return representations(configuration, manifestId, periodId, adaptationSetId, http);
};
