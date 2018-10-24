import * as urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {ApiResource, HttpClient, InternalConfiguration, List} from '../../utils/types';

export const liveStatistics = (
  configuration: InternalConfiguration,
  encodingId: string,
  httpClient: HttpClient
): LiveStatistics => {
  const {get} = httpClient;

  const resourceDetails = (): Promise<LiveStatisticsDetail> => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings', encodingId, 'live-statistics');
    return get(configuration, url);
  };

  const events = {
    list: buildCustomListCallFunction<Event>(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings', encodingId, 'live-statistics/events')
    )
  };

  const streams = {
    list: utils.buildListCallFunction<Stream>(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/statistics/encodings', encodingId, 'live-statistics/streams')
    )
  };

  const resource = Object.assign(resourceDetails, {
    events,
    streams
  });

  return resource;
};

const buildCustomListCallFunction = <T>(
  httpClient: HttpClient,
  configuration: InternalConfiguration,
  url: string
): CustomList<T> => {
  return (limit?: number, offset?: number, sort?: string, filter?: any): Promise<CustomPagination<T>> => {
    let urlToCall = url;

    const filterParams = filter ? utils.buildFilterParamString(filter) : {};
    const getParams = utils.buildGetParamString({
      ...filterParams,
      limit,
      offset,
      sort
    });

    if (getParams.length > 0) {
      urlToCall = urljoin(url, getParams);
    }

    return httpClient.get<CustomPagination<T>>(configuration, urlToCall);
  };
};

interface CustomPagination<T> {
  totalCount: number;
  items: Array<ApiResource<T>>;
  status: string;
}

type CustomList<T> = (
  limit?: number,
  offset?: number,
  sort?: string,
  filter?: any
) => Promise<CustomPagination<ApiResource<T>>>;
export interface Event {
  time: string;
  details: any;
}

export interface Stream {
  id: string;
  userId: string;
  orgId: string;
  createdAt: string;
  customDataCreatedAt: string;
  time: string;
  streamInfos?: any;
}

interface Events {
  list: CustomList<Event>;
}

interface Streams {
  list: List<Stream>;
}

interface LiveStatisticsDetail {
  id: string;
  createdAt: string;
  encodingId: string;
  status: string;
  events: Event[];
  statistics: Stream[];
}

export interface LiveStatistics {
  (): Promise<LiveStatisticsDetail>;
  events: Events;
  streams: Streams;
}

export default (configuration: InternalConfiguration, encodingId: string): LiveStatistics => {
  return liveStatistics(configuration, encodingId, http);
};
