import * as e6p from 'es6-promise';
import * as urljoin from 'url-join';
import * as isomorphicFetch from 'isomorphic-fetch';
import {ConsoleLogger} from "./ConsoleLogger";

import BitmovinError from './BitmovinError';
import {RequiredError} from "./BaseAPI";

(e6p as any).polyfill();

const BASE_URL = 'https://api.bitmovin.com/v1'.replace(/\/+$/, '');

export type FetchAPI = (url: string, init?: any) => Promise<Response>;

function getHeaders(apiKey: string, tenantOrgId?: string) {
    const headers: any = {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
    };

    if (tenantOrgId) {
        headers['X-Tenant-Org-Id'] = tenantOrgId;
    }

    return headers;
}

function queryParams(params) {
    if (params === undefined) {
        return '';
    }

    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function prepareUrl(baseUrl: string, url: string, urlParameterMap: any, queryStringParameters: any): URL {
    let modifiedUrl = url;

    if (urlParameterMap !== undefined) {
        for (const key in urlParameterMap) {
            if (urlParameterMap.hasOwnProperty(key)) {
                modifiedUrl = modifiedUrl.replace(new RegExp(`{${key}}`), urlParameterMap[key]);
            }
        }
    }

    if (modifiedUrl.search('{|}') > 0) {
        throw new Error('After replacing ' + url + ' with parameter map ' + JSON.stringify(urlParameterMap) + ' there are still some placeholders left for replacing. Please make sure to provide a urlParameterMap that replaces all placeholders');
    }

    modifiedUrl = urljoin(baseUrl, modifiedUrl);

    const queryString = queryParams(queryStringParameters);
    if (queryString !== undefined && queryString !== '') {
        modifiedUrl = urljoin(modifiedUrl, `?${queryString}`)
    }

    return new URL(modifiedUrl);
}

export interface Logger {
    log(message: string, data?: any);
    error(message: string, data?: any);
}

export interface Configuration {
    apiKey: string;
    tenantOrgId?: string;
    baseUrl?: string;
    debug?: boolean;
    fetch?: FetchAPI;
    logger?: Logger;
}

export class RestClient {
    private configuration: Configuration;
    private readonly GET = 'GET';
    private readonly POST = 'POST';
    private readonly PUT = 'PUT';
    private readonly DELETE = 'DELETE';

    constructor(configuration: Configuration) {
        if (configuration == null) {
            throw new RequiredError("Configuration must be initialized!");
        }

        if (RestClient.isEmpty(configuration.apiKey)) {
            throw new RequiredError("Api key must be set!");
        }

        if (RestClient.isEmpty(configuration.baseUrl)) {
            configuration.baseUrl = BASE_URL;
        }

        if (configuration.fetch == null) {
            configuration.fetch = isomorphicFetch;
        }

        if (configuration.debug == null) {
            configuration.debug = false;
        }

        if (configuration.logger == null) {
            configuration.logger = new ConsoleLogger();
        }

        this.configuration = configuration;
    }

    request<T>(method: string, url: string, urlParameterMap?: object, body?: object, queryStringParameters?: object): Promise<T> {
        const { baseUrl, debug, logger } = this.configuration;

        const requestUrl = prepareUrl(baseUrl!, url, urlParameterMap, queryStringParameters);

        if (debug) {
            logger!.log(`Request: ${method} ${url} ...`);
        }

        if (debug && body != undefined) {
            logger!.log('Request Body:', body);
        }

        return this.configuration.fetch!(requestUrl.toString(), {
            method: method,
            body: JSON.stringify(body),
            headers: getHeaders(this.configuration.apiKey, this.configuration.tenantOrgId)
        }).then((response) => {
            if (response.status > 399) {
                const errorMessage =
                    `HTTP Request was unsuccessful: HTTP Response Code was ${response.status} ${response.statusText}`;

                if (debug) {
                    logger!.error(errorMessage);
                }

                return response.json().then(responseData => {
                    if (debug) {
                        logger!.error('Error Response Body:', responseData);
                    }

                    throw new BitmovinError(errorMessage, {
                        ok: response.ok,
                        statusText: response.statusText,
                        redirected: response.redirected,
                        type: response.type,
                        status: response.status,
                        headers: response.headers,
                        responseData
                    });
                });
            }

            // Empty content
            if (response.status === 204) {
                if (debug) {
                    logger!.log('Response: 204 - No Content');
                }

                return {data: {}};
            }

            return response.json();
        }).then((responseJson) => {
            const result = responseJson.data.result;
            if (debug) {
                logger!.log("Response body:", responseJson);
            }

            return result;
        });
    }

    public post<T>(url: string, urlParameterMap?: object, body?: object): Promise<T> {
        return this.request(this.POST, url, urlParameterMap, body);
    }

    public get<T>(url: string, urlParameterMap?: object, queryStringParameters?: object): Promise<T> {
        return this.request(this.GET, url, urlParameterMap, undefined, queryStringParameters);
    }

    public delete<T>(url: string, urlParameterMap?: object): Promise<T> {
        return this.request(this.DELETE, url, urlParameterMap);
    }

    public put<T>(url: string, urlParameterMap?: object, body?: object): Promise<T> {
        return this.request(this.PUT, url, urlParameterMap, body);
    }

    private static isEmpty(val?: string) {
        return val == undefined || val.length === 0;
    }
}
