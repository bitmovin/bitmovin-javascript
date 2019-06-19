import * as urljoin from 'url-join';

import http from '../../utils/http';
import {HttpClient, InternalConfiguration} from '../../utils/types';

import {IndustryInsightsQueryBuilder} from './IndustryInsightsQueryBuilder';

export interface IndustryInsightValue {
  value?: number;
}

export interface IndustryInsightQuery {
  metric: string;
  industry?: string;
  subindustry?: string;
  [filter: string]: string | undefined;
}

export default class IndustryInsightQueries {
  private baseUrl: string;

  constructor(private configuration: InternalConfiguration, urlPath: string, private httpClient: HttpClient = http) {
    this.configuration = configuration;
    this.baseUrl = urljoin(configuration.apiBaseUrl, urlPath);
  }

  public metric(query: IndustryInsightQuery): Promise<IndustryInsightValue> {
    const {metric, ...data} = query;
    return this.httpClient.get(this.configuration, `${urljoin(this.baseUrl, metric)}?${this.encodeQueryData(data)}`);
  }

  private encodeQueryData(data) {
    return Object.keys(data)
      .filter(key => data[key] !== undefined)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  }

  get builder(): IndustryInsightsQueryBuilder {
    return new IndustryInsightsQueryBuilder(this);
  }
}
