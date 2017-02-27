import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';

import representations from './dashManifestRepresentations';
import contentProtections from './dashManifestContentProtections';

const adaptationSets = (configuration, manifestId, periodId) => {
  let typeFn = (typeUrl) => {
    let fn = (adaptationSetId) => {
      return {
        details: () => {
          console.info('Getting Details for DASH Manifest Period with ID ' + adaptationSetId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId,
            'adaptationsets', typeUrl, adaptationSetId);

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
          console.info('Deleting DASH Manifest Period with ID ' + adaptationSetId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId,
            'adaptationsets', typeUrl, adaptationSetId);

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

    fn.create = (period) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId,
        'adaptationsets', typeUrl);

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
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId,
        'adaptationsets', typeUrl);

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

  let fn = (adaptationSetId) => {
    return {
      representations   : representations(configuration, manifestId, periodId, adaptationSetId),
      contentProtections: contentProtections(configuration, manifestId, periodId, adaptationSetId, null)
    };
  };

  fn.audio    = typeFn('audio');
  fn.video    = typeFn('video');
  fn.subtitle = typeFn('subtitle');
  fn.custom   = typeFn('custom');

  return fn;
};

module.exports = adaptationSets;
