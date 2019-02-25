import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface H264PictureTimingTrimmingInputStream
 */
export default interface H264PictureTimingTrimmingInputStream extends BitmovinResource {
    /**
     * The id of the ingest input stream that should be trimmed
     * @type {string}
     * @memberof H264PictureTimingTrimmingInputStream
     */
    inputStreamId?: string;

    /**
     * Defines the H264 SEI picture timing, as specified in ISO/IEC 14496-10:2008, of the frame from which the encoding should start. The frame indicated by this value will be included in the encoding
     * @type {string}
     * @memberof H264PictureTimingTrimmingInputStream
     */
    startPicTiming?: string;

    /**
     * Defines the H264 SEI picture timing, as specified in ISO/IEC 14496-10:2008, of the frame at which the encoding should stop. The frame indicated by this value will be included in the encoding
     * @type {string}
     * @memberof H264PictureTimingTrimmingInputStream
     */
    endPicTiming?: string;

}
