// @flow

import urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {BitmovinConfiguration, Create, CustomData, Delete, Details, HttpClient, List} from '../../utils/types';

import muxings, {Muxings} from './muxings';
import streams, {Streams} from './streams';

export const encodings = (configuration: BitmovinConfiguration, http: HttpClient): Encodings => {
  const {get, post, delete_} = http;

  const fn = (encodingId: string): EncodingDetail => {
    return {
      details: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId);
        return get(configuration, url);
      },
      liveDetails: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'live');
        return get(configuration, url);
      },
      customData: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'customData');
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId);
        return delete_(configuration, url);
      },
      start: startConfiguration => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'start');
        return post(configuration, url, startConfiguration);
      },
      stop: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'stop');
        return post(configuration, url);
      },
      startLive: startLiveConfiguration => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'live', 'start');
        return post(configuration, url, startLiveConfiguration);
      },
      stopLive: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'live', 'stop');
        return post(configuration, url);
      },
      status: () => {
        const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'status');
        return get(configuration, url);
      },
      streams: streams(configuration, encodingId),
      muxings: muxings(configuration, encodingId)
    };
  };

  fn.create = encoding => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings');
    return post(configuration, url, encoding);
  };

  fn.list = (limit, offset, sort, filter) => {
    let url = urljoin(configuration.apiBaseUrl, 'encoding/encodings');

    const filterParams = utils.buildFilterParamString(filter);
    const getParams = utils.buildGetParamString({
      ...filterParams,
      limit,
      offset,
      sort
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return get(configuration, url);
  };

  return fn;
};

interface Encoding {
  cloudRegion: string;
}

interface EncodingDetail {
  details: Details<Encoding>;
  delete: Delete<{}>;
  customData: CustomData;
  liveDetails: Details<Object>;
  start: Create<Object>;
  stop: Details<Object>;
  startLive: Create<Object>;
  stopLive: Details<Object>;
  status: Details<Object>;
  streams: Streams;
  muxings: Muxings;
}

export interface Encodings {
  (encodingId: string): EncodingDetail;
  create: Create<Encoding>;
  list: List<Encoding>;
}

export default (configuration: BitmovinConfiguration): Encodings => {
  return encodings(configuration, http);
};
