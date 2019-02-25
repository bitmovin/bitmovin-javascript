
/**
 * @export
 * @interface ProgressiveTsMuxingInformationByteRanges
 */
export default interface ProgressiveTsMuxingInformationByteRanges {
    /**
     * Number of the segment (starting at 0)
     * @type {number}
     * @memberof ProgressiveTsMuxingInformationByteRanges
     */
    segmentNumber: number;

    /**
     * The position of the first byte of the segment
     * @type {number}
     * @memberof ProgressiveTsMuxingInformationByteRanges
     */
    startBytes?: number;

    /**
     * The position of the last byte of the segment
     * @type {number}
     * @memberof ProgressiveTsMuxingInformationByteRanges
     */
    endBytes?: number;

    /**
     * The duration of the segment in seconds
     * @type {number}
     * @memberof ProgressiveTsMuxingInformationByteRanges
     */
    duration?: number;

}
