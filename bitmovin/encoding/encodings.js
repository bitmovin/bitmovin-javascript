import urljoin from 'url-join';
import streams from './streams';
import muxings from './muxings';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';

const encodings = (configuration) => {
  let fn = (encodingId) => {
    return {
      details    : () => {
        console.info('Getting Details for Encoding with ID ' + encodingId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId);

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
      liveDetails: () => {
        console.info('Getting Live Details for Encoding with ID ' + encodingId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'live');

        return new Promise((resolve, reject) => {
          get(configuration, url)
          .then((liveDetails, rawResponse) => {
            resolve(liveDetails);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      customData : () => {
        console.info('Getting Custom Data for Encoding with ID ' + encodingId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'customData');

        return new Promise((resolve, reject) => {
          get(configuration, url)
          .then((customData, rawResponse) => {
            resolve(customData);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      delete     : () => {
        console.info('Deleting Encoding with ID ' + encodingId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId);

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
      start      : (startConfiguration) => {
        console.info('Starting Encoding with ID ' + encodingId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'start');

        return new Promise((resolve, reject) => {
          post(configuration, url, startConfiguration)
          .then((result, rawResponse) => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      stop       : () => {
        console.info('Starting Encoding with ID ' + encodingId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'stop');

        return new Promise((resolve, reject) => {
          post(configuration, url)
          .then((result, rawResponse) => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      startLive  : (startLiveConfiguration) => {
        console.info('Starting Encoding with ID ' + encodingId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'live', 'start');

        return new Promise((resolve, reject) => {
          post(configuration, url, startLiveConfiguration)
          .then((result, rawResponse) => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      stopLive   : () => {
        console.info('Starting Encoding with ID ' + encodingId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'live', 'stop');

        return new Promise((resolve, reject) => {
          post(configuration, url)
          .then((result, rawResponse) => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      status     : () => {
        console.info('Getting Status for Encoding with ID ' + encodingId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'status');

        return new Promise((resolve, reject) => {
          get(configuration, url)
          .then((status, rawResponse) => {
            resolve(status);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      streams    : streams(configuration, encodingId),
      muxings    : muxings(configuration, encodingId)
    };
  };

  fn.create = (encoding) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings');

    return new Promise((resolve, reject) => {
      post(configuration, url, encoding)
      .then((createdEncoding, rawResponse) => {
        resolve(createdEncoding);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  fn.list = (limit, offset, sort) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings');

    let getParams = utils.buildGetParamString({
      limit : limit,
      offset: offset,
      sort: sort
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return new Promise((resolve, reject) => {
      get(configuration, url)
      .then((encodingList, rawResponse) => {
        resolve(encodingList);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  return fn;
};


module.exports = encodings;
