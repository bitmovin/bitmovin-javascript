import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';

import contentProtections from './dashManifestContentProtections';

const representations = (configuration, manifestId, periodId, adaptationSetId) => {
  let typeFn = (typeUrl) => {
    let fn = (representationId) => {
      return {
        details           : () => {
          console.info('Getting Details for Representation with ID ' + representationId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods',
            periodId, 'adaptationsets', adaptationSetId, 'representations', typeUrl, representationId);

          return new Promise((resolve, reject) => {
            get(configuration, url)
            .then((representation, rawResponse) => {
              resolve(representation);
            })
            .catch(error => {
              reject(error);
            });
          });
        },
        delete            : () => {
          console.info('Deleting Representation with ID ' + representationId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods',
            periodId, 'adaptationsets', adaptationSetId, 'representations', typeUrl, representationId);

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
        contentProtections: contentProtections(configuration, manifestId, periodId, adaptationSetId, {
          type: typeUrl,
          id  : representationId
        })
      };
    };

    fn.add = (representation) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods',
        periodId, 'adaptationsets', adaptationSetId, 'representations', typeUrl);

      return new Promise((resolve, reject) => {
        post(configuration, url, representation)
        .then((createdRepresentation, rawResponse) => {
          resolve(createdRepresentation);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods',
        periodId, 'adaptationsets', adaptationSetId, 'representations', typeUrl);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((representationList, rawResponse) => {
          resolve(representationList);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    return fn;
  };

  return {
    fmp4   : typeFn('fmp4'),
    drmFmp4: typeFn('fmp4/drm'),
    sidecar: typeFn('sidecar')
  };
};

module.exports = representations;
