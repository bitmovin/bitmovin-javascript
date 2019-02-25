import BitmovinResource from './BitmovinResource';
import ConcatenationInputConfiguration from './ConcatenationInputConfiguration';

/**
 * @export
 * @interface ConcatenationInputStream
 */
export default interface ConcatenationInputStream extends BitmovinResource {
    /**
     * Concatenation configuration for the output of this stream
     * @type {Array<ConcatenationInputConfiguration>}
     * @memberof ConcatenationInputStream
     */
    concatenation?: Array<ConcatenationInputConfiguration>;

}
