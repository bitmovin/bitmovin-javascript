import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {Create, Delete, HttpClient, List} from '../utils/types';

import {Domain, DomainDetails} from './licenses';

export interface Domains {
  (domainId: string): {
    delete: Delete<any>;
  };

  add: Create<Domain>;
  list: List<DomainDetails>;
}

export const domains = (configuration, licenseId, httpClient: HttpClient) => {
  const {post, delete_} = httpClient;

  const resourceDetails = domainId => {
    return {
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'domains', domainId);
        return delete_<any>(configuration, url);
      }
    };
  };

  const add = domain => {
    const url = urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'domains');
    return post<DomainDetails, Domain>(configuration, url, domain);
  };

  const list = utils.buildListCallFunction<DomainDetails>(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'domains')
  );

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

export default (configuration, licenseId): Domains => {
  return domains(configuration, licenseId, http);
};
