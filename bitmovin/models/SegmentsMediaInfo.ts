import BasicMediaInfo from './BasicMediaInfo';

/**
 * @export
 * @interface SegmentsMediaInfo
 */
export default interface SegmentsMediaInfo extends BasicMediaInfo {
    /**
     * Path to segments.
     * @type {string}
     * @memberof SegmentsMediaInfo
     */
    segmentPath: string;

    /**
     * Id of the encoding.
     * @type {string}
     * @memberof SegmentsMediaInfo
     */
    encodingId: string;

    /**
     * Id of the stream.
     * @type {string}
     * @memberof SegmentsMediaInfo
     */
    streamId: string;

    /**
     * Id of the muxing.
     * @type {string}
     * @memberof SegmentsMediaInfo
     */
    muxingId: string;

    /**
     * Id of the DRM.
     * @type {string}
     * @memberof SegmentsMediaInfo
     */
    drmId?: string;

    /**
     * Number of the first segment. Default is 0.
     * @type {number}
     * @memberof SegmentsMediaInfo
     */
    startSegmentNumber?: number;

    /**
     * Number of the last segment. Default is the last one that was encoded.
     * @type {number}
     * @memberof SegmentsMediaInfo
     */
    endSegmentNumber?: number;

}
