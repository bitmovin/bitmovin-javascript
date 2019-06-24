import * as urljoin from 'url-join';

import http from '../../utils/http';
import {HttpClient} from '../../utils/types';

export const subOrganizations = (configuration, organizationId, httpClient: HttpClient) => {
  const {get} = httpClient;
  const subOrganizationBaseUrl = urljoin(
    configuration.apiBaseUrl,
    'account',
    'organizations',
    organizationId,
    'sub-organizations'
  );

  const list = () => {
    const url = urljoin(subOrganizationBaseUrl);
    return get(configuration, url);
  };

  const resource = Object.assign({list});
  return resource;
};

export default (configuration, organizationId) => {
  return subOrganizations(configuration, organizationId, http);
};
