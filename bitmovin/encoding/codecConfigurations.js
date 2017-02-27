import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';

const codecConfigurations = (configuration) => {
  let typeFn = (typeUrl) => {
    let fn = (codecConfigId) => {
      return {
        details   : () => {
          console.info('Getting Details for Codec Configuration with ID ' + codecConfigId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl, codecConfigId);

          return new Promise((resolve, reject) => {
            get(configuration, url)
            .then((codecConfig, rawResponse) => {
              resolve(codecConfig);
            })
            .catch(error => {
              reject(error);
            });
          });
        },
        customData: () => {
          console.info('Getting Custom Data for Codec Configuration with ID ' + codecConfigId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl, codecConfigId, 'customData');

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
          console.info('Deleting Codec Configuration with ID ' + codecConfigId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl, codecConfigId);

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

    fn.create = (codecConfig) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl);

      return new Promise((resolve, reject) => {
        post(configuration, url, codecConfig)
        .then((createdConfig, rawResponse) => {
          resolve(createdConfig);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', typeUrl);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((configList, rawResponse) => {
          resolve(configList);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    return fn;
  };

  return {
    h264: typeFn('video/h264'),
    h265: typeFn('video/h265'),
    aac : typeFn('audio/aac'),

    listAll: (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations');

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((configList, rawResponse) => {
          resolve(configList);
        })
        .catch(error => {
          reject(error);
        });
      });
    },

    getType: (configurationId) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/configurations', configurationId, 'type');

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

module.exports = codecConfigurations;
