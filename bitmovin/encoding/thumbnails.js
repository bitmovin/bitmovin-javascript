import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';

const thumbnails = (configuration, encodingId, streamId) => {
  let fn = (thumbnailId) => {
    return {
      details   : () => {
        console.info(
          'Getting Details for Thumbnail with ID ' + thumbnailId + ' (Encoding ID ' + encodingId + '; Stream ID '
          + streamId + ') ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'thumbnails',
          thumbnailId);

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
          'Getting Custom Data for Thumbnail with ID ' + thumbnailId + ' (Encoding ID ' + encodingId + '; Stream ID '
          + streamId + ') ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'thumbnails',
          thumbnailId, 'customData');

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
          'Deleting Thumbnail with ID ' + thumbnailId + ' (Encoding ID ' + encodingId + '; Stream ID ' + streamId
          + ') ...');

        let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'thumbnails',
          thumbnailId);

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

  fn.add = (thumbnail) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'thumbnails');

    return new Promise((resolve, reject) => {
      post(configuration, url, thumbnail)
      .then((createdThumbnail, rawResponse) => {
        resolve(createdThumbnail);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'streams', streamId, 'thumbnails');

    let getParams = utils.buildGetParamString({
      limit : limit,
      offset: offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return new Promise((resolve, reject) => {
      get(configuration, url)
      .then((thumbnailList, rawResponse) => {
        resolve(thumbnailList);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  return fn;
};

module.exports = thumbnails;
