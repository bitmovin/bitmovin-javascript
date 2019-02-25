import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface TimeBasedTrimmingInputStream
 */
export default interface TimeBasedTrimmingInputStream extends BitmovinResource {
    /**
     * The id of the ingest input stream that should be trimmed
     * @type {string}
     * @memberof TimeBasedTrimmingInputStream
     */
    inputStreamId?: string;

    /**
     * Defines the offset in seconds at which the encoding should start, beginning at 0. The frame indicated by this value will be included in the encoding
     * @type {number}
     * @memberof TimeBasedTrimmingInputStream
     */
    offset?: number;

    /**
     * Defines how many seconds of the input will be encoded
     * @type {number}
     * @memberof TimeBasedTrimmingInputStream
     */
    duration?: number;

}
