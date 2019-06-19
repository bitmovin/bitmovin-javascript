import {IndustryInsightFilter, IndustryInsightMetric} from '..';

import IndustryInsightQueries, {IndustryInsightQuery, IndustryInsightValue} from './IndustryInsightQueries';

export class IndustryInsightsQueryBuilder {
  private queryObj: IndustryInsightQuery;

  constructor(private queries: IndustryInsightQueries, query?: IndustryInsightQuery) {
    this.queryObj = query || {
      metric: ''
    };
  }

  public metric(metric: IndustryInsightMetric | string): IndustryInsightsQueryBuilder {
    return this.extendQuery_({metric});
  }

  public industry(industry: string) {
    return this.extendQuery_({industry});
  }

  public subIndustry(subIndustry: string) {
    return this.extendQuery_({subindustry: subIndustry});
  }

  public filter(name: IndustryInsightFilter, value: string) {
    return this.extendQuery_({
      [name]: value
    });
  }

  public extendQuery_(extensions: any): IndustryInsightsQueryBuilder {
    return new IndustryInsightsQueryBuilder(this.queries, {...this.queryObj, ...extensions});
  }

  public query(): Promise<IndustryInsightValue> {
    return this.queries.metric(this.queryObj);
  }

  public queryObject(): IndustryInsightQuery {
    return this.queryObj;
  }
}
