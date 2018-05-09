import urljoin from 'url-join';
import http, {utils} from '../utils/http';
import queryBuilder from './query_builder';

export const queries = (configuration, http) => {
  const {get, post} = http;
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
