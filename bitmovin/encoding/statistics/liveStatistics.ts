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
    list: utils.buildListCallFunction<Event, {status: string}>(
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
  list: List<Event, {status: string}>;
}

interface Streams {
  list: List<Stream>;
}

export type LiveStatisticsDetail = ApiResource<{
  encodingId: string;
  status: string;
  events: Event[];
  statistics: Stream[];
}>;

export interface LiveStatistics {
  (): Promise<LiveStatisticsDetail>;
  events: Events;
  streams: Streams;
}

export default (configuration: InternalConfiguration, encodingId: string): LiveStatistics => {
  return liveStatistics(configuration, encodingId, http);
};
