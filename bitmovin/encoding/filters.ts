import urljoin from 'url-join';

import http, {utils} from '../utils/http';

export const filters = (configuration, http) => {
  const {get, post, delete_} = http;

  const typeFn = typeUrl => {
    const fn = filterId => {
      return {
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl, filterId);

          return get(configuration, url);
        },
        customData: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl, filterId, 'customData');

          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl, filterId);

          return delete_(configuration, url);
        }
      };
    };

    fn.create = filter => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl);

      return post(configuration, url, filter);
    };

    fn.list = (limit, offset, sort) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl);

      const getParams = utils.buildGetParamString({
        limit,
        offset,
        sort
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    return fn;
  };

  return {
    crop: typeFn('crop'),
    deinterlace: typeFn('deinterlace'),
    rotate: typeFn('rotate'),
    watermark: typeFn('watermark'),

    list: (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/filters');

      const filterParams = utils.buildFilterParamString(filter);
      const getParams = utils.buildGetParamString({
        ...filterParams,
        limit,
        offset,
        sort
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    }
  };
};

export default configuration => {
  return filters(configuration, http);
};
