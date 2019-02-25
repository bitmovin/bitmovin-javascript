import MuxingType from './MuxingType';

/**
 * @export
 * @interface StatisticsPerMuxing
 */
export default interface StatisticsPerMuxing {
    /**
     * ID of the stream
     * @type {string}
     * @memberof StatisticsPerMuxing
     */
    streamId: string;

    /**
     * ID of the muxing
     * @type {string}
     * @memberof StatisticsPerMuxing
     */
    muxingId: string;

    /**
     * Multiplier for the encoded minutes. Depends on muxing type.
     * @type {number}
     * @memberof StatisticsPerMuxing
     */
    multiplicator: number;

    /**
     * Encoded bytes.
     * @type {number}
     * @memberof StatisticsPerMuxing
     */
    encodedBytes: number;

    /**
     * Resulting minutes you will be charged for.
     * @type {number}
     * @memberof StatisticsPerMuxing
     */
    billableMinutes: number;

    /**
     * @type {MuxingType}
     * @memberof StatisticsPerMuxing
     */
    muxingType: MuxingType;

}
