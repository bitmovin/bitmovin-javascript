import urljoin from 'url-join';
import {get, post, delete_, utils} from '../http';
import Promise from 'bluebird';


const streams = (configuration, manifestId) => {
  let fn = (streamId) => {
    return {
      details: () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams', streamId);

        return new Promise((resolve, reject) => {
          get(configuration, url)
          .then((stream, rawResponse) => {
            resolve(stream);
          })
          .catch(error => {
            reject(error);
          });
        });
      },
      delete : () => {
        let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams', streamId);

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

  fn.add = (stream) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams');

    return new Promise((resolve, reject) => {
      post(configuration, url, stream)
      .then((createdStream, rawResponse) => {
        resolve(createdStream);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  fn.list = (limit, offset) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/manifests/hls', manifestId, 'streams');

    let getParams = utils.buildGetParamString({
      limit : limit,
      offset: offset
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return new Promise((resolve, reject) => {
      get(configuration, url)
      .then((streamList, rawResponse) => {
        resolve(streamList);
      })
      .catch(error => {
        reject(error);
      });
    });
  };

  return fn;
};

module.exports = streams;
