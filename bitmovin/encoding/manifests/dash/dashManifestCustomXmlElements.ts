import * as urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {HttpClient, InternalConfiguration} from '../../../utils/types';

export const customXmlElements = (
  configuration: InternalConfiguration,
  manifestId,
  periodId,
  httpClient: HttpClient
) => {
  const {get, post, delete_} = httpClient;
  const resourceDetails = customXmlElementId => {
    return {
      details: () => {
        const url = urljoin(
          configuration.apiBaseUrl,
          'encoding/manifests/dash',
          manifestId,
          'periods',
          periodId,
          'custom-xml-elements',
          customXmlElementId
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
          'custom-xml-elements',
          customXmlElementId
        );
        return delete_(configuration, url);
      }
    };
  };

  const add = customXmlElement => {
    const url = urljoin(
      configuration.apiBaseUrl,
      'encoding/manifests/dash',
      manifestId,
      'periods',
      periodId,
      'custom-xml-elements'
    );
    return post(configuration, url, customXmlElement);
  };

  const list = (limit, offset) => {
    let url = urljoin(
      configuration.apiBaseUrl,
      'encoding/manifests/dash',
      manifestId,
      'periods',
      periodId,
      'custom-xml-elements'
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

export default (configuration, manifestId, periodId) => {
  return customXmlElements(configuration, manifestId, periodId, http);
};
