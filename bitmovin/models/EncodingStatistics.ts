
/**
 * @export
 * @interface EncodingStatistics
 */
export default interface EncodingStatistics {
    /**
     * Date, format. yyyy-MM-dd
     * @type {Date}
     * @memberof EncodingStatistics
     */
    date: Date;

    /**
     * Bytes encoded for this encoding.
     * @type {number}
     * @memberof EncodingStatistics
     */
    bytesEncoded: number;

    /**
     * Time in seconds encoded for this encoding.
     * @type {number}
     * @memberof EncodingStatistics
     */
    timeEncoded: number;

}
