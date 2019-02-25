
/**
 * @export
 * @interface ConcatenationInputConfiguration
 */
export default interface ConcatenationInputConfiguration {
    /**
     * The id of the input stream that should be used for concatenation. Can be either an ingest input stream, or the result of a trimming input stream
     * @type {string}
     * @memberof ConcatenationInputConfiguration
     */
    inputStreamId?: string;

    /**
     * Exactly one input stream of a concatenation must have this set to true, which will be used as reference for scaling, aspect ratio, FPS, sample rate, etc. 
     * @type {boolean}
     * @memberof ConcatenationInputConfiguration
     */
    isMain?: boolean;

    /**
     * Position of the stream
     * @type {number}
     * @memberof ConcatenationInputConfiguration
     */
    position?: number;

}
