import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';

const outputs = (configuration) => {
  let typeFn = (typeUrl) => {
    let fn = (outputId) => {
      return {
        details   : () => {
          console.info('Getting Details for Output with ID ' + outputId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId);

          return new Promise((resolve, reject) => {
            get(configuration, url)
            .then((output, rawResponse) => {
              resolve(output);
            })
            .catch(error => {
              reject(error);
            });
          });
        },
        customData: () => {
          console.info('Getting Custom Data for Output with ID ' + outputId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId, 'customData');

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
          console.info('Deleting Output with ID ' + outputId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId);

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

    fn.create = (output) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl);

      return new Promise((resolve, reject) => {
        post(configuration, url, output)
        .then((createdOutput, rawResponse) => {
          resolve(createdOutput);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((outputList, rawResponse) => {
          resolve(outputList);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    return fn;
  };

  let bitmovinTypeFn = (typeUrl) => {
    let bitmovinFn = (outputId) => {
      return {
        details: () => {
          console.info('Getting Details for Bitmovin Output with ID ' + outputId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl, outputId);

          return new Promise((resolve, reject) => {
            get(configuration, url)
            .then((output, rawResponse) => {
              resolve(output);
            })
            .catch(error => {
              reject(error);
            });
          });
        }
      };
    };

    bitmovinFn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', typeUrl);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((outputList, rawResponse) => {
          resolve(outputList);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    return bitmovinFn;
  };

  return {
    s3       : typeFn('s3'),
    gcs      : typeFn('gcs'),
    azure    : typeFn('azure'),
    ftp      : typeFn('ftp'),
    sftp     : typeFn('sftp'),
    genericS3: typeFn('generic-s3'),
    bitmovin : {
      aws: bitmovinTypeFn('bitmovin/aws'),
      gcp: bitmovinTypeFn('bitmovin/gcp')
    },

    listAll: (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs');

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((outputList, rawResponse) => {
          resolve(outputList);
        })
        .catch(error => {
          reject(error);
        });
      });
    },

    getType: (outputId) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/outputs', outputId, 'type');

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

module.exports = outputs;
