import EncodingStatistics from './EncodingStatistics';

/**
 * @export
 * @interface EncodingStatisticsVod
 */
export default interface EncodingStatisticsVod extends EncodingStatistics {
    /**
     * Time in seconds encoded for this encoding.
     * @type {number}
     * @memberof EncodingStatisticsVod
     */
    timeEnqueued: number;

    /**
     * The realtime factor.
     * @type {number}
     * @memberof EncodingStatisticsVod
     */
    realTimeFactor: number;

}
