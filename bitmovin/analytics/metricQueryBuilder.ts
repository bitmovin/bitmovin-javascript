import MetricQueries, {MetricQuery} from './metricQueries';

import {MetricName} from '.';

export class MetricQueryBuilder {
  private queryObj: MetricQuery;
  private queries: MetricQueries;

  constructor(queries: MetricQueries, query?: MetricQuery) {
    this.queries = queries;
    this.queryObj =
      query ||
      Object.freeze({
        metric: '',
        filters: [],
        groupBy: [],
        orderBy: []
      });
  }

  public metric(metric: MetricName | string): MetricQueryBuilder {
    return this.extendQuery_({metric});
  }

  public between(start, end): MetricQueryBuilder {
    return this.extendQuery_({start, end});
  }

  public interval(interval): MetricQueryBuilder {
    return this.extendQuery_({interval});
  }

  public filter(name, operator, value): MetricQueryBuilder {
    const filter = Object.freeze({name, operator, value});
    return this.extendQuery_({filters: Object.freeze([...this.queryObj.filters, filter])});
  }

  public groupBy(dimension): MetricQueryBuilder {
    return this.extendQuery_({groupBy: Object.freeze([...this.queryObj.groupBy, dimension])});
  }

  public orderBy(name, order): MetricQueryBuilder {
    const newOrder = Object.freeze({name, order});
    return this.extendQuery_({orderBy: Object.freeze([...this.queryObj.orderBy, newOrder])});
  }

  public percentile_(percentile): MetricQueryBuilder {
    return this.extendQuery_({percentile});
  }

  public licenseKey(licenseKey): MetricQueryBuilder {
    return this.extendQuery_({licenseKey});
  }

  public limit(limit): MetricQueryBuilder {
    return this.extendQuery_({limit});
  }

  public offset(offset): MetricQueryBuilder {
    return this.extendQuery_({offset});
  }

  public extendQuery_(extensions): MetricQueryBuilder {
    return new MetricQueryBuilder(this.queries, Object.freeze({...this.queryObj, ...extensions}));
  }

  public query(): Promise<{}> {
    return this.queries.metric(this.queryObj);
  }
}
