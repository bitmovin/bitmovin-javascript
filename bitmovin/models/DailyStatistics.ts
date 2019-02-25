import BillableEncodingFeatureMinutes from './BillableEncodingFeatureMinutes';
import BillableEncodingMinutes from './BillableEncodingMinutes';

/**
 * @export
 * @interface DailyStatistics
 */
export default interface DailyStatistics {
    /**
     * Date for the shown data. Format: yyyy-MM-dd
     * @type {Date}
     * @memberof DailyStatistics
     */
    date: Date;

    /**
     * Bytes encoded.
     * @type {number}
     * @memberof DailyStatistics
     */
    bytesEncoded: number;

    /**
     * Time in seconds encoded for this day.
     * @type {number}
     * @memberof DailyStatistics
     */
    timeEncoded: number;

    /**
     * The billable minutes.
     * @type {number}
     * @memberof DailyStatistics
     */
    billableMinutes?: number;

    /**
     * Label identifier.
     * @type {Date}
     * @memberof DailyStatistics
     */
    label?: Date;

    /**
     * Billable minutes for each encoding configuration.
     * @type {Array<BillableEncodingMinutes>}
     * @memberof DailyStatistics
     */
    billableEncodingMinutes?: Array<BillableEncodingMinutes>;

    /**
     * Billable minutes for muxings.
     * @type {number}
     * @memberof DailyStatistics
     */
    billableTransmuxingMinutes?: number;

    /**
     * Billable minutes for features
     * @type {Array<BillableEncodingFeatureMinutes>}
     * @memberof DailyStatistics
     */
    billableFeatureMinutes?: Array<BillableEncodingFeatureMinutes>;

}
