import urljoin from 'url-join';

import http, {utils} from '../../utils/http';

import dashManifests from './dash';
import hlsManifests from './hls';
import smoothManifests from './smooth';

export const manifests = (configuration, http) => {
  const {get} = http;
  return {
    list: (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests');

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
    },
    dash: dashManifests(configuration),
    hls: hlsManifests(configuration),
    smooth: smoothManifests(configuration)
  };
};

export default configuration => {
  return manifests(configuration, http);
};
