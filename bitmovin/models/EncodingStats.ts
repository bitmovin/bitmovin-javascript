import BillableEncodingFeatureMinutes from './BillableEncodingFeatureMinutes';
import BillableEncodingMinutes from './BillableEncodingMinutes';
import StatisticsPerMuxing from './StatisticsPerMuxing';
import StatisticsPerStream from './StatisticsPerStream';

/**
 * @export
 * @interface EncodingStats
 */
export default interface EncodingStats {
    /**
     * Date, format. yyyy-MM-dd
     * @type {Date}
     * @memberof EncodingStats
     */
    date?: Date;

    /**
     * The id of the encoding
     * @type {string}
     * @memberof EncodingStats
     */
    encodingId: string;

    /**
     * Total bytes encoded
     * @type {number}
     * @memberof EncodingStats
     */
    bytesEncoded?: number;

    /**
     * Total time encoded
     * @type {number}
     * @memberof EncodingStats
     */
    timeEncoded?: number;

    /**
     * Downloaded size of the input file
     * @type {number}
     * @memberof EncodingStats
     */
    downloadedSize?: number;

    /**
     * Billable minutes
     * @type {number}
     * @memberof EncodingStats
     */
    billableMinutes?: number;

    /**
     * Detailed statistics per stream
     * @type {Array<BillableEncodingMinutes>}
     * @memberof EncodingStats
     */
    billableEncodingMinutes?: Array<BillableEncodingMinutes>;

    /**
     * Billable transmuxing minutes
     * @type {number}
     * @memberof EncodingStats
     */
    billableTransmuxingMinutes: number;

    /**
     * Billable feature minutes
     * @type {number}
     * @memberof EncodingStats
     */
    billableFeatureMinutes?: number;

    /**
     * Detailed statistics per stream
     * @type {Array<StatisticsPerStream>}
     * @memberof EncodingStats
     */
    streams: Array<StatisticsPerStream>;

    /**
     * Detailed statistics per muxing
     * @type {Array<StatisticsPerMuxing>}
     * @memberof EncodingStats
     */
    muxings: Array<StatisticsPerMuxing>;

    /**
     * Detailed statistics per feature
     * @type {Array<BillableEncodingFeatureMinutes>}
     * @memberof EncodingStats
     */
    features?: Array<BillableEncodingFeatureMinutes>;

}
