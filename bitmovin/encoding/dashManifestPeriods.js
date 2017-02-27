import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import adaptationSets from './dashManifestAdaptationSets';
import Promise from 'bluebird';

const periods = (configuration, manifestId) => {
  let fn = (periodId) => {
    return {
      details       : () => {
        console.info('Getting Details for DASH Manifest Period with ID ' + periodId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId);

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
      delete        : () => {
        console.info('Deleting DASH Manifest Period with ID ' + periodId + ' ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId);

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
      adaptationSets: adaptationSets(configuration, manifestId, periodId)
    };
  };

  fn.add = (period) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods');

    return new Promise((resolve, reject) => {
      post(configuration, url, period)
      .then((createdPeriod, rawResponse) => {
        resolve(createdPeriod);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods');

    let getParams = utils.buildGetParamString({
      limit : limit,
      offset: offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return new Promise((resolve, reject) => {
      get(configuration, url)
      .then((periodList, rawResponse) => {
        resolve(periodList);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  return fn;
};

module.exports = periods;
