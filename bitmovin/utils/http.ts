import 'es6-promise/auto';
import fetch from 'isomorphic-fetch';
import urljoin from 'url-join';

import BitmovinError from './BitmovinError';
import logger from './Logger';
import {HttpClient, InternalConfiguration, List, Pagination} from './types';

const GET = 'GET';
const POST = 'POST';
const DELETE = 'DELETE';
const PUT = 'PUT';

const buildParams = (method, configuration, body) => {
  return {
    method,
    body,
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

  return fetchMethod(url, params)
    .then(response => {
      if (response.status > 399) {
        const errorMessage =
          'HTTP Request was unsuccessful: HTTP Response Code was ' + response.status + ' ' + response.statusText;
        logger.error(errorMessage);
        return response.json().then(errorText => {
          logger.error('Error Response Body: ' + JSON.stringify(errorText));
          throw new BitmovinError(errorMessage, {...response, responseData: errorText});
        });
      }

      if (response.status === 204) {
        logger.log('Response: 204 - No Content');
        return {data: {}};
      }

      return response.json();
    })
    .then(responseJSON => {
      return responseJSON.data.result;
    });
};

const get = (configuration, url, fetchMethod = fetch) => {
  return request(configuration, GET, url, fetchMethod, undefined);
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
  return request(configuration, DELETE, url, fetchMethod, undefined);
};

const buildGetParamString = (getParams: object) => {
  const params = [];
  let paramsString = '';

  for (const key in getParams) {
    if (getParams.hasOwnProperty(key)) {
      const value = getParams[key];
      if (value !== undefined && value !== null && value !== '') {
        params.push(key + '=' + getParams[key]);
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
};

const buildFilterParamString = (filterParams?: object) => {
  const processedFilterParams = {};
  for (const key in filterParams) {
    if (filterParams.hasOwnProperty(key)) {
      processedFilterParams[key] = filterParams[key].join(',');
    }
  }
  return processedFilterParams;
};

const buildListCallFunction = <T>(
  httpClient: HttpClient,
  configuration: InternalConfiguration,
  url: string
): List<T> => {
  return (limit?: number, offset?: number, sort?: string, filter?: object): Promise<Pagination<T>> => {
    let urlToCall = url;

    const filterParams = buildFilterParamString(filter);
    const getParams = buildGetParamString({
      ...filterParams,
      limit,
      offset,
      sort
    });

    if (getParams.length > 0) {
      urlToCall = urljoin(url, getParams);
    }

    return httpClient.get<Pagination<T>>(configuration, urlToCall);
  };
};

const Http: HttpClient = {
  get,
  post,
  put,
  delete_
};

export const utils = {
  buildGetParamString,
  buildFilterParamString,
  buildListCallFunction
};

export default Http;
