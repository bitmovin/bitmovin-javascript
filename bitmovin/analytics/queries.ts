import urljoin from 'url-join';

import http from '../utils/http';
import {HttpClient} from '../utils/types';

import queryBuilder from './query_builder';

export const queries = (configuration, httpClient: HttpClient) => {
  const {post} = httpClient;
  const baseUrl = urljoin(configuration.apiBaseUrl, 'analytics/queries');

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

export default configuration => {
  return queries(configuration, http);
};
