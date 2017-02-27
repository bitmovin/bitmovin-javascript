import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';

const representations = (configuration, manifestId) => {
  const typeFn = (typeUrl) => {
    const baseUrl = urljoin(configuration.apiBaseUrl, 'encoding/manifests/smooth', manifestId, 'representations',
      typeUrl);

    const fn = (representationId) => {
      return {
        details: () => {
          const url = urljoin(baseUrl, representationId);
          return get(configuration, url);
        },
        delete : () => {
          let url = urljoin(baseUrl, representationId);
          return delete_(configuration, url);
        }
      };
    };

    fn.add = (representation) => {
      return post(configuration, baseUrl, representation);
    };

    fn.list = (limit, offset) => {
      let url = baseUrl;

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    };

    return fn;
  };

  return {
    mp4: typeFn('mp4')
  };
};

module.exports = representations;
