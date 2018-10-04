import * as urljoin from 'url-join';

import http from '../utils/http';
import {HttpClient} from '../utils/types';

import queryBuilder from './queryBuilder';

export const queries = (configuration, httpClient: HttpClient, urlPath: string) => {
  const {post} = httpClient;
  const baseUrl = urljoin(configuration.apiBaseUrl, urlPath);

  const queryMethods = ['count', 'sum', 'avg', 'min', 'max', 'median', 'percentile', 'stddev', 'variance'].reduce(
    (obj, method) => ({...obj, [method]: query => post(configuration, urljoin(baseUrl, method), query)}),
    {}
  );

  const fn = Object.assign(() => ({}), queryMethods);

  Object.defineProperty(fn, 'builder', {
    get() {
      return queryBuilder(queryMethods);
    }
  });

  return fn;
};

export default (configuration, urlPath) => {
  return queries(configuration, http, urlPath);
};
