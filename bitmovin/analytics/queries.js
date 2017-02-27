import urljoin from 'url-join';
import {post} from '../http';

const queries = (configuration) => {

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

  return fn;
};

module.exports = queries;
