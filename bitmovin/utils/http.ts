import 'es6-promise/auto';
import * as fetch from 'isomorphic-fetch';
import * as urljoin from 'url-join';

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
    .then(async response => {
      if (response.status > 399) {
        const errorMessage =
          'HTTP Request was unsuccessful: HTTP Response Code was ' + response.status + ' ' + response.statusText;
        logger.error(errorMessage);
        let responseData;
        try {
          responseData = await response.json();
        } catch (error) {
          logger.log('Couldn`t parse server response as json.');
        }
        logger.error('Error Response Body: ' + JSON.stringify(responseData));
        throw new BitmovinError(errorMessage, {
          ok: response.ok,
          statusText: response.statusText,
          redirected: response.redirected,
          type: response.type,
          status: response.status,
          headers: response.headers,
          responseData
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

// tslint:disable-next-line
const delete_ = (configuration, url, fetchMethod = fetch) => {
  return request(configuration, DELETE, url, fetchMethod, undefined);
};

const buildGetParamString = (getParams: any) => {
  const params: string[] = [];
  let paramsString = '';

  for (const key in getParams) {
    if (getParams.hasOwnProperty(key)) {
      const value = getParams[key];
      if (value !== undefined && value !== null && value !== '') {
        params.push(`${key}=${value}`);
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

const buildFilterParamString = (filterParams: any) => {
  const processedFilterParams = {};
  for (const key in filterParams) {
    if (filterParams.hasOwnProperty(key)) {
      processedFilterParams[key] = filterParams[key].join(',');
    }
  }
  return processedFilterParams;
};

const buildListCallFunction = <T, J = {}>(
  httpClient: HttpClient,
  configuration: InternalConfiguration,
  url: string
): List<T, J> => {
  return (limit?: number, offset?: number, sort?: string, filter?: any): Promise<Pagination<T, J>> => {
    let urlToCall = url;

    const filterParams = filter ? buildFilterParamString(filter) : {};
    const getParams = buildGetParamString({
      ...filterParams,
      limit,
      offset,
      sort
    });

    if (getParams.length > 0) {
      urlToCall = urljoin(url, getParams);
    }

    return httpClient.get<Pagination<T, J>>(configuration, urlToCall);
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
