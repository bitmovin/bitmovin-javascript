import MetricQueries, {MetricQuery} from './metricQueries';

import {MetricName} from '.';

export class MetricQueryBuilder {
  private queryObj: MetricQuery;
  private queries: MetricQueries;

  constructor(queries: MetricQueries, query?: MetricQuery) {
    this.queries = queries;
    this.queryObj = query || {
      metric: '',
      filters: [],
      groupBy: [],
      orderBy: []
    };
  }

  public metric(metric: MetricName | string): MetricQueryBuilder {
    return this.extendQuery_({metric});
  }

  public between(start, end): MetricQueryBuilder {
    return this.extendQuery_({start, end});
  }

  public interval(interval: string): MetricQueryBuilder {
    return this.extendQuery_({interval});
  }

  public filter(name: string, operator: string, value: any): MetricQueryBuilder {
    return this.extendQuery_({filters: [...this.queryObj.filters, {name, operator, value}]});
  }

  public groupBy(dimension: string): MetricQueryBuilder {
    return this.extendQuery_({groupBy: [...this.queryObj.groupBy, dimension]});
  }

  public orderBy(name: string, order: string): MetricQueryBuilder {
    return this.extendQuery_({orderBy: [...this.queryObj.orderBy, {name, order}]});
  }

  public percentile_(percentile: number): MetricQueryBuilder {
    return this.extendQuery_({percentile});
  }

  public licenseKey(licenseKey: string): MetricQueryBuilder {
    return this.extendQuery_({licenseKey});
  }

  public limit(limit: number): MetricQueryBuilder {
    return this.extendQuery_({limit});
  }

  public offset(offset: number): MetricQueryBuilder {
    return this.extendQuery_({offset});
  }

  public extendQuery_(extensions: any): MetricQueryBuilder {
    return new MetricQueryBuilder(this.queries, {...this.queryObj, ...extensions});
  }

  public query(): Promise<{}> {
    return this.queries.metric(this.queryObj);
  }

  public queryObject(): MetricQuery {
    return this.queryObj;
  }
}
