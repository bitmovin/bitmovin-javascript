import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface TimecodeTrackTrimmingInputStream
 */
export default interface TimecodeTrackTrimmingInputStream extends BitmovinResource {
    /**
     * The id of the ingest input stream that should be trimmed
     * @type {string}
     * @memberof TimecodeTrackTrimmingInputStream
     */
    inputStreamId?: string;

    /**
     * Defines the timecode, in SMPTE-12M format, of the frame from which the encoding should start. The frame indicated by this value will be included in the encoding
     * @type {string}
     * @memberof TimecodeTrackTrimmingInputStream
     */
    startTimeCode?: string;

    /**
     * Defines the timecode, in SMPTE-12M format, of the frame at which the encoding should stop. The frame indicated by this value will be included in the encoding
     * @type {string}
     * @memberof TimecodeTrackTrimmingInputStream
     */
    endTimeCode?: string;

}
