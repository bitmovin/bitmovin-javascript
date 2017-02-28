import urljoin from 'url-join';
import http, { utils } from '../http';

import dashManifests from './dashManifests';
import hlsManifests from './hlsManifests';
import smoothManifests from './smoothManifests';


export const manifests = (configuration, http) => {
  const { get, post, delete_ } = http;
  return {
    listAll: (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests');

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return get(configuration, url);
    },
    dash   : dashManifests(configuration),
    hls    : hlsManifests(configuration),
    smooth : smoothManifests(configuration)
  };
};

export default (configuration) => { return manifests(configuration, http); };
