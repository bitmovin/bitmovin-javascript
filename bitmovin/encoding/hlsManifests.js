import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';

import media from './hlsManifestMedia';
import streams from './hlsManifestStreams';

const hlsManifests = (configuration) => {
  let fn = (manifestId) => {
    return {
      details: () => {
        console.info('Getting Details for HLS Manifest with ID ' + manifestId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId);

        return new Promise((resolve, reject) => {
          get(configuration, url)
          .then((details, rawResponse) => {
            resolve(details);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      delete : () => {
        console.info('Deleting HLS Manifest with ID ' + manifestId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId);

        return new Promise((resolve, reject) => {
          delete_(configuration, url)
          .then((response, rawResponse) => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      start  : () => {
        console.info('Starting HLS Manifest with ID ' + manifestId + ' ...');

        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'start');

        return new Promise((resolve, reject) => {
          post(configuration, url)
          .then((response, rawResponse) => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      stop   : () => {
        console.info('Stopping HLS Manifest with ID ' + manifestId + ' ...');

        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'stop');

        return new Promise((resolve, reject) => {
          post(configuration, url)
          .then((response, rawResponse) => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      status : () => {
        console.info('Retrieving status of HLS Manifest with ID ' + manifestId + ' ...');

        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'status');

        return new Promise((resolve, reject) => {
          get(configuration, url)
          .then((response, rawResponse) => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      media: media(configuration, manifestId),
      streams: streams(configuration, manifestId)
    };
  };

  fn.create = (manifest) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls');

    return new Promise((resolve, reject) => {
      post(configuration, url, manifest)
      .then((createdManifest, rawResponse) => {
        resolve(createdManifest);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls');

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
  };

  return fn;
};

module.exports = hlsManifests;
