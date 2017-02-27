import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';

const inputs = (configuration) => {
  let typeFn = (typeUrl) => {
    let fn = (inputId) => {
      return {
        details   : () => {
          console.info('Getting Details for Input with ID ' + inputId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId);

          return new Promise((resolve, reject) => {
            get(configuration, url)
            .then((input, rawResponse) => {
              resolve(input);
            })
            .catch(error => {
              reject(error);
            });
          });
        },
        customData: () => {
          console.info('Getting Custom Data for Input with ID ' + inputId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId, 'customData');

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
        delete    : () => {
          console.info('Deleting Input with ID ' + inputId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId);

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

    fn.create = (input) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl);

      return new Promise((resolve, reject) => {
        post(configuration, url, input)
        .then((createdOutput, rawResponse) => {
          resolve(createdOutput);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((inputList, rawResponse) => {
          resolve(inputList);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    return fn;
  };

  let rtmpTypeFn = (typeUrl) => {
    let rtmpFn = (inputId) => {
      return {
        details: () => {
          console.info('Getting Details for Output with ID ' + inputId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl, inputId);

          return new Promise((resolve, reject) => {
            get(configuration, url)
            .then((input, rawResponse) => {
              resolve(input);
            })
            .catch(error => {
              reject(error);
            });
          });
        }
      };
    };

    rtmpFn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', typeUrl);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((inputList, rawResponse) => {
          resolve(inputList);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    return rtmpFn;
  };

  return {
    aspera   : typeFn('aspera'),
    azure    : typeFn('azure'),
    ftp      : typeFn('ftp'),
    gcs      : typeFn('gcs'),
    http     : typeFn('http'),
    https    : typeFn('https'),
    rtmp     : rtmpTypeFn('rtmp'),
    s3       : typeFn('s3'),
    genericS3: typeFn('generic-s3'),
    sftp     : typeFn('sftp'),

    listAll: (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs');

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((inputList, rawResponse) => {
          resolve(inputList);
        })
        .catch(error => {
          reject(error);
        });
      });
    },

    getType: (inputId) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/inputs', inputId, 'type');

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((result, rawResponse) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
      });
    }
  };
};

module.exports = inputs;
