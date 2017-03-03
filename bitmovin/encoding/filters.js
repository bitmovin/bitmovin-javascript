import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';

const filters = (configuration) => {
  let typeFn = (typeUrl) => {
    let fn = (filterId) => {
      return {
        details   : () => {
          console.info('Getting Details for Filter with ID ' + filterId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl, filterId);

          return new Promise((resolve, reject) => {
            get(configuration, url)
            .then((filter, rawResponse) => {
              resolve(filter);
            })
            .catch(error => {
              reject(error);
            });
          });
        },
        customData: () => {
          console.info('Getting Custom Data for Filter with ID ' + filterId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl, filterId, 'customData');

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
          console.info('Deleting Filter with ID ' + filterId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl, filterId);

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

    fn.create = (filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl);

      return new Promise((resolve, reject) => {
        post(configuration, url, filter)
        .then((createdOutput, rawResponse) => {
          resolve(createdOutput);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl);

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

    return fn;
  };

  return {
    crop       : typeFn('crop'),
    deinterlace: typeFn('deinterlace'),
    rotate     : typeFn('rotate'),
    watermark  : typeFn('watermark'),

    list: (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/filters');

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
    }
  };
};

module.exports = filters;
