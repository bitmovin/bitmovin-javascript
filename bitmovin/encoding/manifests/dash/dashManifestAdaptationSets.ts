import urljoin from 'url-join';

import http, {utils} from '../../../utils/http';

import contentProtections from './dashManifestContentProtections';
import representations from './dashManifestRepresentations';
import {HttpClient, InternalConfiguration} from '../../../utils/types';

export const adaptationSets = (configuration: InternalConfiguration, manifestId, periodId, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;
  const typeFn = typeUrl => {
    const resourceDetails = adaptationSetId => {
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

    const create = period => {
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

    const list = utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(
        configuration.apiBaseUrl,
        'encoding/manifests/dash',
        manifestId,
        'periods',
        periodId,
        'adaptationsets',
        typeUrl
      )
    );

    const resource = Object.assign(resourceDetails, {create, list});
    return resource;
  };

  const fn = adaptationSetId => {
    return {
      representations: representations(configuration, manifestId, periodId, adaptationSetId),
      contentProtections: contentProtections(configuration, manifestId, periodId, adaptationSetId, null)
    };
  };

  const audio = typeFn('audio');
  const video = typeFn('video');
  const subtitle = typeFn('subtitle');
  const custom = typeFn('custom');

  return Object.assign(fn, {audio, video, subtitle, custom});
};

export default (configuration, manifestId, periodId) => {
  return adaptationSets(configuration, manifestId, periodId, http);
};
