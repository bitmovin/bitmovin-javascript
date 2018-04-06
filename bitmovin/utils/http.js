import fetch from 'node-fetch';
import BitmovinError from './BitmovinError';
import logger from './Logger';
import Promise from 'bluebird';
import urljoin from 'url-join';

const GET    = 'GET';
const POST   = 'POST';
const DELETE = 'DELETE';
const PUT    = 'PUT';

const buildParams = (method, configuration, body) => {
  return {
    method : method,
    body   : body,
    headers: configuration.httpHeaders,
    timeout: configuration.requestTimeout
  };
};

const request = (configuration, method, url, fetchMethod = fetch, body) => {
  logger.log('Request: ' + method + ' ' + url + '  ...');

  if (body !== undefined) {
    logger.log('Request Body: ' + body);
  }

  const params = buildParams(method, configuration, body);

  return new Promise((resolve, reject) => {
    fetchMethod(url, params).then((response) => {
      if (response.status > 399) {
        const errorMessage = 'HTTP Request was unsuccessful: HTTP Response Code was ' +
          response.status + ' ' + response.statusText;
        logger.error(errorMessage);
        return response.json().then((errorText) => {
          logger.error('Error Response Body: ', JSON.stringify(errorText));
          throw new BitmovinError(errorMessage, {...response, responseData: errorText});
        });
      }
      if (response.status === 204) {
        logger.log('Response: 204 - No Content');
        resolve();
      }
      return response.json();
    }).then((responseJson) => {
      logger.log('Response: data -> result: ' + JSON.stringify(responseJson.data.result, undefined, 2));
      resolve(responseJson.data.result, responseJson);
    }).catch((error) => {
      reject(error);
    });
  });
};

const get = (configuration, url, fetchMethod = fetch) => {
  return request(configuration, GET, url, fetchMethod);
};

const post = (configuration, url, object, fetchMethod = fetch) => {
  logger.log('Request payload will be: ' + JSON.stringify(object, undefined, 2));
  const body = JSON.stringify(object);

  return request(configuration, POST, url, fetchMethod, body);
};

const put = (configuration, url, object, fetchMethod = fetch) => {
  logger.log('Request payload will be: ' + JSON.stringify(object, undefined, 2));
  const body = JSON.stringify(object);

  return request(configuration, PUT, url, fetchMethod, body);
};

const delete_ = (configuration, url, fetchMethod = fetch) => {
  return request(configuration, DELETE, url, fetchMethod);
};

const utils = {
  buildGetParamString: (getParams) => {
    let params       = [];
    let paramsString = '';

    for (let key in getParams) {
      if (getParams.hasOwnProperty(key)) {
        let value = getParams[key];
        if (value !== undefined && value !== null && value !== '') {
          params.push(key + '=' + value);
        }
      }
    }

    for (let i = 0; i < params.length; i++) {
      let param = '';
      if (i === 0) {
        param += '?';
      } else {
        param += '&';
      }
      param += params[i];

      paramsString += param;
    }

    return paramsString;
  },

  buildFilterParamString: (filterParams) => {
    const processedFilterParams = {};
    for (let key in filterParams) {
      if(filterParams.hasOwnProperty(key)) {
        processedFilterParams[key] = filterParams[key].join(',');
      }
    }
    return processedFilterParams;
  },

  buildUrlParams: (baseUrl, params) => {
    const filterParams = utils.buildFilterParamString(params.filter);
    let getParams = utils.buildGetParamString({
      ...filterParams,
      limit : params.limit,
      offset: params.offset,
      sort: params.sort
    });

    if (getParams.length > 0) {
      return urljoin(baseUrl, getParams);
    }

    return baseUrl;
  }
};

module.exports = {
  get,
  post,
  put,
  delete_,
  utils
};
