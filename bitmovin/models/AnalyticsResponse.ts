import AnalyticsColumnLabel from './AnalyticsColumnLabel';

/**
 * @export
 * @interface AnalyticsResponse
 */
export default interface AnalyticsResponse {
    /**
     * @type {Array<any>}
     * @memberof AnalyticsResponse
     */
    rows?: Array<any>;

    /**
     * Number of rows returned
     * @type {number}
     * @memberof AnalyticsResponse
     */
    rowCount?: number;

    /**
     * @type {Array<AnalyticsColumnLabel>}
     * @memberof AnalyticsResponse
     */
    columnLabels?: Array<AnalyticsColumnLabel>;

}
