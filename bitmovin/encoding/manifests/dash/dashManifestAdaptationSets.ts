import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';

import contentProtections from './dashManifestContentProtections';
import representations from './dashManifestRepresentations';

export const adaptationSets = (configuration, manifestId, periodId, http) => {
  const {get, post, delete_} = http;
  const typeFn = typeUrl => {
    const fn = adaptationSetId => {
      return {
        details: () => {
          const url = urljoin(
            configuration.apiBaseUrl,
            'encoding/manifests/dash',
            manifestId,
            'periods',
            periodId,
            'adaptationsets',
            typeUrl,
            adaptationSetId
          );

          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(
            configuration.apiBaseUrl,
            'encoding/manifests/dash',
            manifestId,
            'periods',
            periodId,
            'adaptationsets',
            typeUrl,
            adaptationSetId
          );
          return delete_(configuration, url);
        }
      };
    };

    fn.create = period => {
      const url = urljoin(
        configuration.apiBaseUrl,
        'encoding/manifests/dash',
        manifestId,
        'periods',
        periodId,
        'adaptationsets',
        typeUrl
      );

      return post(configuration, url, period);
    };

    fn.list = (limit, offset) => {
      let url = urljoin(
        configuration.apiBaseUrl,
        'encoding/manifests/dash',
        manifestId,
        'periods',
        periodId,
        'adaptationsets',
        typeUrl
      );

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

  const fn = adaptationSetId => {
    return {
      representations: representations(configuration, manifestId, periodId, adaptationSetId),
      contentProtections: contentProtections(configuration, manifestId, periodId, adaptationSetId, null)
    };
  };

  fn.audio = typeFn('audio');
  fn.video = typeFn('video');
  fn.subtitle = typeFn('subtitle');
  fn.custom = typeFn('custom');

  return fn;
};

export default (configuration, manifestId, periodId) => {
  return adaptationSets(configuration, manifestId, periodId, http);
};
