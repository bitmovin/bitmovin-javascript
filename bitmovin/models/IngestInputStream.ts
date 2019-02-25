import BitmovinResource from './BitmovinResource';
import StreamSelectionMode from './StreamSelectionMode';

/**
 * @export
 * @interface IngestInputStream
 */
export default interface IngestInputStream extends BitmovinResource {
    /**
     * Id of input
     * @type {string}
     * @memberof IngestInputStream
     */
    inputId?: string;

    /**
     * Path to media file
     * @type {string}
     * @memberof IngestInputStream
     */
    inputPath?: string;

    /**
     * Specifies the algorithm how the stream in the input file will be selected
     * @type {StreamSelectionMode}
     * @memberof IngestInputStream
     */
    selectionMode?: StreamSelectionMode;

    /**
     * Position of the stream
     * @type {number}
     * @memberof IngestInputStream
     */
    position?: number;

}
