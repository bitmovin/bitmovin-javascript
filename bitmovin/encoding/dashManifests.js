import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import periods from './dashManifestPeriods';
import Promise from 'bluebird';

const dashManifests = (configuration) => {
  let fn = (manifestId) => {
    return {
      details: () => {
        console.info('Getting Details for DASH Manifest with ID ' + manifestId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId);

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
        console.info('Deleting DASH Manifest with ID ' + manifestId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId);

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
        console.info('Starting DASH Manifest with ID ' + manifestId + ' ...');

        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'start');

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
        console.info('Stopping DASH Manifest with ID ' + manifestId + ' ...');

        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'stop');

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
        console.info('Retrieving status of DASH Manifest with ID ' + manifestId + ' ...');

        const url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'status');

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
      periods: periods(configuration, manifestId)
    };
  };

  fn.create = (manifest) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash');

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
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash');

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

module.exports = dashManifests;
