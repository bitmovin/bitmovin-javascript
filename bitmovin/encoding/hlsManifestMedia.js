import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';


const mediaContainer = (configuration, manifestId) => {
  let typeFn = (typeUrl) => {
    let fn = (mediaId) => {
      return {
        details: () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'media', typeUrl, mediaId);

          return new Promise((resolve, reject) => {
            get(configuration, url)
            .then((media, rawResponse) => {
              resolve(media);
            })
            .catch(error => {
              reject(error);
            });
          });
        },
        delete : () => {
          let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'media', typeUrl, mediaId);

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

    fn.add = (media) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'media', typeUrl);

      return new Promise((resolve, reject) => {
        post(configuration, url, media)
        .then((createdMedia, rawResponse) => {
          resolve(createdMedia);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    fn.list = (limit, offset) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'media', typeUrl);

      let getParams = utils.buildGetParamString({
        limit : limit,
        offset: offset
      });
      if (getParams.length > 0) {
        url = urljoin(url, getParams);
      }

      return new Promise((resolve, reject) => {
        get(configuration, url)
        .then((mediaList, rawResponse) => {
          resolve(mediaList);
        })
        .catch(error => {
          reject(error);
        });
      });
    };

    return fn;
  };

  return {
    video         : typeFn('video'),
    audio         : typeFn('audio'),
    subtitles     : typeFn('subtitles'),
    closedCaptions: typeFn('closed-captions')
  };
};

module.exports = mediaContainer;
