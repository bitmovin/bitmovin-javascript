import AnalyticsFilter from './AnalyticsFilter';
import AnalyticsInterval from './AnalyticsInterval';
import AnalyticsOrderByEntry from './AnalyticsOrderByEntry';
import AnalyticsQueryRequest from './AnalyticsQueryRequest';

/**
 * @export
 * @interface AnalyticsPercentileQueryRequest
 */
export default interface AnalyticsPercentileQueryRequest extends AnalyticsQueryRequest {
    /**
     * The percentage (0-99) used for percentile queries.
     * @type {number}
     * @memberof AnalyticsPercentileQueryRequest
     */
    percentile?: number;

}
