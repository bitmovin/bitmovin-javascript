
/**
 * @export
 * @interface AnalyticsQueryTimeframe
 */
export default interface AnalyticsQueryTimeframe {
    /**
     * Start of timeframe which is queried
     * @type {Date}
     * @memberof AnalyticsQueryTimeframe
     */
    start?: Date;

    /**
     * End of timeframe which is queried
     * @type {Date}
     * @memberof AnalyticsQueryTimeframe
     */
    end?: Date;

}
