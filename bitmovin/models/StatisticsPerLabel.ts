import BillableEncodingFeatureMinutes from './BillableEncodingFeatureMinutes';
import BillableEncodingMinutes from './BillableEncodingMinutes';
import Statistics from './Statistics';

/**
 * @export
 * @interface StatisticsPerLabel
 */
export default interface StatisticsPerLabel extends Statistics {
    /**
     * An optional error message, when the event is in error state (occurs at event: ERROR)
     * @type {string}
     * @memberof StatisticsPerLabel
     */
    label: string;

    /**
     * The billable minutes.
     * @type {number}
     * @memberof StatisticsPerLabel
     */
    billableMinutes?: number;

    /**
     * Billable minutes for each encoding configuration
     * @type {Array<BillableEncodingMinutes>}
     * @memberof StatisticsPerLabel
     */
    billableEncodingMinutes?: Array<BillableEncodingMinutes>;

    /**
     * Billable minutes for muxings.
     * @type {number}
     * @memberof StatisticsPerLabel
     */
    billableTransmuxingMinutes?: number;

    /**
     * Billable minutes for features
     * @type {Array<BillableEncodingFeatureMinutes>}
     * @memberof StatisticsPerLabel
     */
    billableFeatureMinutes?: Array<BillableEncodingFeatureMinutes>;

}
