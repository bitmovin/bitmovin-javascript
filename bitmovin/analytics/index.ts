import analyticsImpressions from './impressions';
import analyticsLicenses from './licenses';
import analyticsQueries from './queries';
import analyticsStatistics from './statistics';

export interface Analytics {
  licenses: object;
  statistics: object;
  impressions: object;
  queries: object;
}

const analytics = internalConfig => ({
  licenses: analyticsLicenses(internalConfig),
  queries: analyticsQueries(internalConfig),
  impressions: analyticsImpressions(internalConfig),
  statistics: analyticsStatistics(internalConfig)
});

export default analytics;
