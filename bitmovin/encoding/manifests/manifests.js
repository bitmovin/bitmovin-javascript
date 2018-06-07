import urljoin from 'url-join';

import http, {utils} from '../../utils/http';

import dashManifests from './dash/dashManifests';
import hlsManifests from './hls/hlsManifests';
import smoothManifests from './smooth/smoothManifests';

export const manifests = (configuration, http) => {
  const {get} = http;
  return {
    list: (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests');

      const filterParams = utils.buildFilterParamString(filter);
      let getParams = utils.buildGetParamString({
        ...filterParams,
        limit: limit,
        offset: offset,
        sort: sort
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
