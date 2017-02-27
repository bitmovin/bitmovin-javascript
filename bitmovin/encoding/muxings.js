import urljoin from 'url-join';
import drms from './drms';
import {get, post, delete_, utils} from '../http';

const muxings = (configuration, encodingId) => {
  let typeFn = (typeUrl) => {
    let fn = (muxingId) => {
      return {
        details   : () => {
          console.info('Getting Details for Muxing with ID ' + muxingId + ' (Encoding ID ' + encodingId + ') ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl, muxingId);

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
        customData: () => {
          console.info('Getting Custom Data for Muxing with ID ' + muxingId + ' (Encoding ID ' + encodingId + ') ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl, muxingId,
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
        delete    : () => {
          console.info('Deleting Muxing with ID ' + muxingId + ' (Encoding ID ' + encodingId + ') ...');

          let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl, muxingId);

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
        drms      : drms(configuration, encodingId, typeUrl, muxingId)
      };
    };

    fn.add = (muxing) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl);

      return new Promise((resolve, reject) => {
        post(configuration, url, muxing)
        .then((createdMuxing, rawResponse) => {
          resolve(createdMuxing);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'muxings', typeUrl);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((muxingList, rawResponse) => {
          resolve(muxingList);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    return fn;
  };

  return {
    fmp4: typeFn('fmp4'),
    ts  : typeFn('ts'),
    mp4 : typeFn('mp4')
  };
};

module.exports = muxings;
