import * as urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {HttpClient} from '../../../utils/types';

import contentProtections from './dashManifestContentProtections';

export const representations = (configuration, manifestId, periodId, adaptationSetId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const dashManifestsBaseUrl = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash');

  const typeFn = typeUrl => {
    const resourceDetails = representationId => {
      return {
        details: () => {
          const url = urljoin(
            dashManifestsBaseUrl,
            manifestId,
            'periods',
            periodId,
            'adaptationsets',
            adaptationSetId,
            'representations',
            typeUrl,
            representationId
          );
          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(
            dashManifestsBaseUrl,
            manifestId,
            'periods',
            periodId,
            'adaptationsets',
            adaptationSetId,
            'representations',
            typeUrl,
            representationId
          );
          return delete_(configuration, url);
        },
        contentProtections: contentProtections(configuration, manifestId, periodId, adaptationSetId, {
          type: typeUrl,
          id: representationId
        })
      };
    };

    const add = representation => {
      const url = urljoin(
        dashManifestsBaseUrl,
        manifestId,
        'periods',
        periodId,
        'adaptationsets',
        adaptationSetId,
        'representations',
        typeUrl
      );
      return post(configuration, url, representation);
    };

    const list = (limit, offset) => {
      let url = urljoin(
        dashManifestsBaseUrl,
        manifestId,
        'periods',
        periodId,
        'adaptationsets',
        adaptationSetId,
        'representations',
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

    const resource = Object.assign(resourceDetails, {add, list});
    return resource;
  };

  return {
    fmp4: typeFn('fmp4'),
    drmFmp4: typeFn('fmp4/drm'),
    sidecar: typeFn('sidecar'),
    vtt: typeFn('vtt'),
    mp4: typeFn('mp4'),
    drmMp4: typeFn('mp4/drm'),
    webm: typeFn('webm')
  };
};

export default (configuration, manifestId, periodId, adaptationSetId) => {
  return representations(configuration, manifestId, periodId, adaptationSetId, http);
};
