import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';

const contentProtections = (configuration, manifestId, periodId, adaptationSetId, representationInfo) => {

  let baseUrl = urljoin(configuration.apiBaseUrl, 'encoding/manifests/dash', manifestId, 'periods', periodId,
    'adaptationsets', adaptationSetId);
  if (representationInfo !== null && representationInfo !== undefined) {
    baseUrl = urljoin(baseUrl, 'representations', representationInfo.type, representationInfo.id);
  }
  baseUrl = urljoin(baseUrl, 'contentprotection');

  let fn = (contentProtectionId) => {
    return {
      details: () => {
        console.info('Getting Details for Content Protection with ID ' + contentProtectionId + ' ...');

        let url = urljoin(baseUrl, contentProtectionId);

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
        console.info('Deleting Content Protection with ID ' + contentProtectionId + ' ...');

        let url = urljoin(baseUrl, contentProtectionId);

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

  fn.add = (contentProtection) => {
    let url = baseUrl;

    return new Promise((resolve, reject) => {
      post(configuration, url, contentProtection)
      .then((createdContentProtection, rawResponse) => {
        resolve(createdContentProtection);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  fn.list = (limit, offset) => {
    let url = baseUrl;

    let getParams = utils.buildGetParamString({
      limit : limit,
      offset: offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return new Promise((resolve, reject) => {
      get(configuration, url)
      .then((contentProtectionList, rawResponse) => {
        resolve(contentProtectionList);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  return fn;
};

module.exports = contentProtections;
