import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';

const sprites = (configuration, encodingId, streamId) => {
  let fn = (spriteId) => {
    return {
      details   : () => {
        console.info(
          'Getting Details for Sprite with ID ' + spriteId + ' (Encoding ID ' + encodingId + '; Stream ID ' + streamId
          + ') ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites',
          spriteId);

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
        console.info(
          'Getting Custom Data for Sprite with ID ' + spriteId + ' (Encoding ID ' + encodingId + '; Stream ID '
          + streamId + ') ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites',
          spriteId, 'customData');

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
        console.info(
          'Deleting Sprite with ID ' + spriteId + ' (Encoding ID ' + encodingId + '; Stream ID ' + streamId + ') ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites',
          spriteId);

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

  fn.add = (sprite) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites');

    return new Promise((resolve, reject) => {
      post(configuration, url, sprite)
      .then((createdSprite, rawResponse) => {
        resolve(createdSprite);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'sprites');

    let getParams = utils.buildGetParamString({
      limit : limit,
      offset: offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return new Promise((resolve, reject) => {
      get(configuration, url)
      .then((spriteList, rawResponse) => {
        resolve(spriteList);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  return fn;
};

module.exports = sprites;
