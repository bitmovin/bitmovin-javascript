import StreamSelectionMode from './StreamSelectionMode';

/**
 * @export
 * @interface InputStream
 */
export default interface InputStream {
    /**
     * Id of input
     * @type {string}
     * @memberof InputStream
     */
    inputId?: string;

    /**
     * Path to media file
     * @type {string}
     * @memberof InputStream
     */
    inputPath?: string;

    /**
     * Specifies the algorithm how the stream in the input file will be selected
     * @type {StreamSelectionMode}
     * @memberof InputStream
     */
    selectionMode?: StreamSelectionMode;

    /**
     * Position of the stream
     * @type {number}
     * @memberof InputStream
     */
    position?: number;

    /**
     * Set this property instead of all others to reference an ingest, trimming or concatenation input stream
     * @type {string}
     * @memberof InputStream
     */
    inputStreamId?: string;

}
