import AnalyticsFilter from './AnalyticsFilter';
import AnalyticsInterval from './AnalyticsInterval';
import AnalyticsOrderByEntry from './AnalyticsOrderByEntry';
import AnalyticsQueryTimeframe from './AnalyticsQueryTimeframe';

/**
 * @export
 * @interface AnalyticsQueryRequest
 */
export default interface AnalyticsQueryRequest extends AnalyticsQueryTimeframe {
    /**
     * Analytics license key
     * @type {string}
     * @memberof AnalyticsQueryRequest
     */
    licenseKey?: string;

    /**
     * @type {Array<AnalyticsFilter>}
     * @memberof AnalyticsQueryRequest
     */
    filters?: Array<AnalyticsFilter>;

    /**
     * @type {Array<AnalyticsOrderByEntry>}
     * @memberof AnalyticsQueryRequest
     */
    orderBy?: Array<AnalyticsOrderByEntry>;

    /**
     * @type {string}
     * @memberof AnalyticsQueryRequest
     */
    dimension: string;

    /**
     * @type {Array<AnalyticsInterval>}
     * @memberof AnalyticsQueryRequest
     */
    interval?: Array<AnalyticsInterval>;

    /**
     * @type {Array<string>}
     * @memberof AnalyticsQueryRequest
     */
    groupBy?: Array<string>;

    /**
     * Maximum number of rows returned (max. 150)
     * @type {number}
     * @memberof AnalyticsQueryRequest
     */
    limit?: number;

    /**
     * Offset of data
     * @type {number}
     * @memberof AnalyticsQueryRequest
     */
    offset?: number;

}
