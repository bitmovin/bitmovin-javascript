import analyticsImpressions from './impressions';
import analyticsLicenses from './licenses';
import analyticsQueries from './queries';
import analyticsStatistics from './statistics';

const ANALYTICS_PATH_QUERIES_ADS = 'analytics/a/queries';
const ANALYTICS_PATH_QUERIES = 'analytics/queries';

export interface Analytics {
  licenses: any;
  statistics: any;
  impressions: any;
  queries: any;
}

const analytics = internalConfig => ({
  licenses: analyticsLicenses(internalConfig),
  queries: analyticsQueries(internalConfig, ANALYTICS_PATH_QUERIES),
  ads: {
    queries: analyticsQueries(internalConfig, ANALYTICS_PATH_QUERIES_ADS)
  },
  impressions: analyticsImpressions(internalConfig),
  statistics: analyticsStatistics(internalConfig)
});

export default analytics;
