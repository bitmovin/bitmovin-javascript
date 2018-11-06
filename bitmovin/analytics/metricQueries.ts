import * as urljoin from 'url-join';

import http from '../utils/http';
import {HttpClient} from '../utils/types';

import {MetricQueryBuilder} from './metricQueryBuilder';

export interface MetricQuery {
  metric: string;
  filters: any[];
  groupBy: any[];
  orderBy: any[];
}

export default class MetricQueries {
  private configuration;
  private baseUrl: string;
  private httpClient: HttpClient;

  constructor(configuration, urlPath: string, httpClient: HttpClient = http) {
    this.httpClient = httpClient;
    this.configuration = configuration;
    this.baseUrl = urljoin(configuration.apiBaseUrl, urlPath);
  }

  public metric(query: MetricQuery): Promise<{}> {
    return this.httpClient.post(this.configuration, urljoin(this.baseUrl, query.metric), query);
  }

  get builder(): MetricQueryBuilder {
    return new MetricQueryBuilder(this);
  }
}
