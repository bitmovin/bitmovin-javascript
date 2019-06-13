import * as urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {
  ApiResource,
  Create,
  CustomData,
  Delete,
  Details,
  HttpClient,
  InternalConfiguration,
  List
} from '../../utils/types';

import machineLearning, {MachineLearning} from './machineLearning';
import muxings, {Muxings} from './muxings';
import streams, {Streams} from './streams';

export const encodings = (configuration: InternalConfiguration, httpClient: HttpClient): Encodings => {
  const {get, post, delete_} = httpClient;

  const resourceDetails = (encodingId: string): EncodingDetail => {
    const startCallable = startConfiguration => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'start');
      return post(configuration, url, startConfiguration);
    };

    const startDetails = () => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, 'start');
      return get(configuration, url);
    };

    const start = Object.assign(startCallable, {
      details: startDetails
    });

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
      start,
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
      muxings: muxings(configuration, encodingId),
      machineLearning: machineLearning(configuration, encodingId)
    };
  };

  const create = encoding => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings');
    return post<ApiResource<Encoding>, any>(configuration, url, encoding);
  };

  const list = utils.buildListCallFunction<Encoding>(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'encoding/encodings')
  );

  const resource = Object.assign(resourceDetails, {
    create,
    list
  });

  return resource;
};

export type Encoding = any & {
  cloudRegion: string;
};

interface Start {
  (startConfiguration: any): Promise<ApiResource<any>>;
  details: Details<any>;
}

interface EncodingDetail {
  details: Details<Encoding>;
  delete: Delete<{}>;
  customData: CustomData;
  liveDetails: Details<any>;
  start: Start;
  stop: Details<any>;
  startLive: Create<any>;
  stopLive: Details<any>;
  status: Details<any>;
  streams: Streams;
  muxings: Muxings;
  machineLearning: MachineLearning;
}

export interface Encodings {
  (encodingId: string): EncodingDetail;
  create: Create<Encoding>;
  list: List<Encoding>;
}

export default (configuration: InternalConfiguration): Encodings => {
  return encodings(configuration, http);
};
