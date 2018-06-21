import analyticsImpressions from './impressions';
import analyticsLicenses from './licenses';
import analyticsQueries from './queries';
import analyticsStatistics from './statistics';

export interface Analytics {
  licenses: any;
  statistics: any;
  impressions: any;
  queries: any;
}

const analytics = internalConfig => ({
  licenses: analyticsLicenses(internalConfig),
  queries: analyticsQueries(internalConfig),
  impressions: analyticsImpressions(internalConfig),
  statistics: analyticsStatistics(internalConfig)
});

export default analytics;
