import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';

const drms = (configuration, encodingId, muxingTypeUrl, muxingId) => {
  let typeFn = (typeUrl) => {
    let fn = (drmId) => {
      return {
        details   : () => {
          console.info('Getting Details for DRM with ID ' + drmId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', muxingTypeUrl,
            muxingId, 'drm', typeUrl, drmId);

          return new Promise((resolve, reject) => {
            get(configuration, url)
            .then((drm, rawResponse) => {
              resolve(drm);
            })
            .catch(error => {
              reject(error);
            });
          });
        },
        customData: () => {
          console.info('Getting Custom Data for DRM with ID ' + drmId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', muxingTypeUrl,
            muxingId, 'drm', typeUrl, drmId, 'customData');

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
          console.info('Deleting DRM with ID ' + drmId + ' ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', muxingTypeUrl,
            muxingId, 'drm', typeUrl, drmId);

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

    fn.add = (drm) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', muxingTypeUrl, muxingId,
        'drm', typeUrl);

      return new Promise((resolve, reject) => {
        post(configuration, url, drm)
        .then((createdDrm, rawResponse) => {
          resolve(createdDrm);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', muxingTypeUrl, muxingId,
        'drm', typeUrl);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((drmList, rawResponse) => {
          resolve(drmList);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    return fn;
  };

  return {
    aes      : typeFn('aes'),
    cenc     : typeFn('cenc'),
    clearKey : typeFn('clearkey'),
    fairPlay : typeFn('fairplay'),
    marlin   : typeFn('marlin'),
    playReady: typeFn('playready'),
    primeTime: typeFn('primetime'),
    widevine : typeFn('widevine'),

    listAll: (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', muxingTypeUrl, muxingId,
        'drm');

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((drmList, rawResponse) => {
          resolve(drmList);
        })
        .catch(error => {
          reject(error);
        });
      });
    }
  };
};

module.exports = drms;
