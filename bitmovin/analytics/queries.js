import urljoin from 'url-join';
import http, { utils } from '../http';
import { queryBuilder } from './query_builder';

export const queries = (configuration, http) => {
  const { get, post } = http;
  const baseUrl = urljoin(configuration.apiBaseUrl, 'analytics/queries');

  const fn = (queryId) => {
    return {};
  };

  fn.count = (query) => {
    const url = urljoin(baseUrl, 'count');
    return post(configuration, url, query);
  };

  fn.sum = (query) => {
    const url = urljoin(baseUrl, 'sum');
    return post(configuration, url, query);
  };

  fn.avg = (query) => {
    const url = urljoin(baseUrl, 'avg');
    return post(configuration, url, query);
  };

  fn.min = (query) => {
    const url = urljoin(baseUrl, 'min');
    return post(configuration, url, query);
  };

  fn.max = (query) => {
    const url = urljoin(baseUrl, 'max');
    return post(configuration, url, query);
  };
  fn.median = (query) => {
    const url = urljoin(baseUrl, 'median');
    return post(configuration, url, query);
  };
  fn.percentile = (query) => {
    const url = urljoin(baseUrl, 'percentile');
    return post(configuration, url, query);
  };
  fn.stddev = (query) => {
    const url = urljoin(baseUrl, 'stddev');
    return post(configuration, url, query);
  };
  fn.variance = (query) => {
    const url = urljoin(baseUrl, 'variance');
    return post(configuration, url, query);
  };

  fn.builder = queryBuilder(fn);

  return fn;
};

export default (configuration) => {
  return queries(configuration, http);
};
