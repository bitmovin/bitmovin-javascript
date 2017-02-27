import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';

import thumbnails from './thumbnails';
import sprites from './sprites';

const streams = (configuration, encodingId) => {

  let filterFn = (streamId) => {
    let fn = (filterId) => {
      return {
        delete: () => {
          console.info(
            'Deleting Filter with ID ' + filterId + ' from Stream with ID ' + streamId + '(Encoding ID ' + encodingId
            + ') ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters',
            filterId);

          return new Promise((resolve, reject) => {
            delete_(configuration, url)
            .then((response, rawResponse) => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
          });
        }
      };
    };

    fn.add = (filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');

      return new Promise((resolve, reject) => {
        post(configuration, url, filter)
        .then((response, rawResponse) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    fn.listAll = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((filterList, rawResponse) => {
          resolve(filterList);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    fn.deleteAll = () => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'filters');

      return new Promise((resolve, reject) => {
        delete_(configuration, url)
        .then((result, rawResponse) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    return fn;
  };

  let fn = (streamId) => {
    return {
      details     : () => {
        console.info('Getting Details for Stream with ID ' + streamId + ' (Encoding ID ' + encodingId + ') ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId);

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
      customData  : () => {
        console.info('Getting Custom Data for Stream with ID ' + streamId + ' (Encoding ID ' + encodingId + ') ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId,
          'customData');

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
      delete      : () => {
        console.info('Deleting Stream with ID ' + streamId + ' (Encoding ID ' + encodingId + ') ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId);

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
      inputDetails: () => {
        console.info('Getting Input Details for Stream with ID ' + streamId + ' (Encoding ID ' + encodingId + ') ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'input');

        return new Promise((resolve, reject) => {
          get(configuration, url)
          .then((inputDetails, rawResponse) => {
            resolve(inputDetails);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      filters     : filterFn(streamId),
      thumbnails  : thumbnails(configuration, encodingId, streamId),
      sprites     : sprites(configuration, encodingId, streamId)
    };
  };

  fn.add = (stream) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams');

    return new Promise((resolve, reject) => {
      post(configuration, url, stream)
      .then((createdStream, rawResponse) => {
        resolve(createdStream);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams');

    let getParams = utils.buildGetParamString({
      limit : limit,
      offset: offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return new Promise((resolve, reject) => {
      get(configuration, url)
      .then((streamList, rawResponse) => {
        resolve(streamList);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  return fn;
};

module.exports = streams;
