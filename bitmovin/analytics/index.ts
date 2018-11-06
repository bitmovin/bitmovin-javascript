import MetricQueries from './metricQueries';

import analyticsImpressions from './impressions';
import analyticsLicenses from './licenses';
import analyticsQueries from './queries';
import analyticsStatistics from './statistics';

const ANALYTICS_PATH_QUERIES_ADS = 'analytics/ads/queries';
const ANALYTICS_PATH_QUERIES = 'analytics/queries';
const ANALYTICS_PATH_METRIC_QUERIES = 'analytics/metrics';

export const enum MetricName {
  MaxConcurrentViewers = 'max_concurrentviewers',
  AvgConcurrentViewers = 'avg_concurrentviewers'
}

export interface Analytics {
  licenses: any;
  statistics: any;
  impressions: any;
  queries: any;
  metrics: MetricQueries;
  ads: {
    queries: any;
  };
}

const analytics = internalConfig => ({
  licenses: analyticsLicenses(internalConfig),
  queries: analyticsQueries(internalConfig, ANALYTICS_PATH_QUERIES),
  ads: {
    queries: analyticsQueries(internalConfig, ANALYTICS_PATH_QUERIES_ADS)
  },
  metrics: new MetricQueries(internalConfig, ANALYTICS_PATH_METRIC_QUERIES),
  impressions: analyticsImpressions(internalConfig),
  statistics: analyticsStatistics(internalConfig)
});

export default analytics;
