import {InternalConfiguration} from '../utils/types';

import analyticsImpressions from './impressions';
import IndustryInsightQueries from './insights/IndustryInsightQueries';
import OrganizationSettings from './insights/OrganizationSettings';
import analyticsLicenses from './licenses';
import MetricQueries from './metricQueries';
import analyticsQueries from './queries';
import analyticsPlatforms, {Platforms} from './releases/platforms';
import analyticsStatistics from './statistics';
const ANALYTICS_PATH_QUERIES_ADS = 'analytics/ads/queries';
const ANALYTICS_PATH_QUERIES = 'analytics/queries';
const ANALYTICS_PATH_METRIC_QUERIES = 'analytics/metrics';
const ANALYTICS_PATH_INSIGHTS = 'analytics/insights';

export const enum MetricName {
  MaxConcurrentViewers = 'max_concurrentviewers',
  AvgConcurrentViewers = 'avg_concurrentviewers'
}

export const enum IndustryInsightMetric {
  VideoBitrate = 'video_bitrate',
  RebufferPercentage = 'rebuffer_percentage',
  ErrorPercentage = 'error_percentage',
  Startuptime = 'startuptime',
  Videostartuptime = 'videostartuptime'
}

export const enum IndustryInsightFilter {
  Browser = 'browser',
  Isp = 'isp',
  Country = 'country'
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
  releases: {
    platforms: Platforms;
  };
  insights: {
    industry: IndustryInsightQueries;
    organizations: OrganizationSettings;
  };
}

const analytics = (internalConfig: InternalConfiguration): Analytics => ({
  licenses: analyticsLicenses(internalConfig),
  queries: analyticsQueries(internalConfig, ANALYTICS_PATH_QUERIES),
  ads: {
    queries: analyticsQueries(internalConfig, ANALYTICS_PATH_QUERIES_ADS)
  },
  metrics: new MetricQueries(internalConfig, ANALYTICS_PATH_METRIC_QUERIES),
  impressions: analyticsImpressions(internalConfig),
  statistics: analyticsStatistics(internalConfig),
  releases: {
    platforms: analyticsPlatforms(internalConfig)
  },
  insights: {
    industry: new IndustryInsightQueries(internalConfig, ANALYTICS_PATH_INSIGHTS),
    organizations: new OrganizationSettings(internalConfig, ANALYTICS_PATH_INSIGHTS)
  }
});

export default analytics;
