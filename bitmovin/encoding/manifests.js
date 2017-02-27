import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';

import dashManifests from './dashManifests';
import hlsManifests from './hlsManifests';
import smoothManifests from './smoothManifests';


const manifests = (configuration) => {
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

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((manifestList, rawResponse) => {
          resolve(manifestList);
        })
        .catch(error => {
          reject(error);
        });
      });
    },
    dash   : dashManifests(configuration),
    hls    : hlsManifests(configuration),
    smooth : smoothManifests(configuration)
  };
};

module.exports = manifests;
