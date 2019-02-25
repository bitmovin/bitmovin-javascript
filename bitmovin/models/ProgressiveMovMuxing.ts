import EncodingOutput from './EncodingOutput';
import Ignoring from './Ignoring';
import InternalChunkLength from './InternalChunkLength';
import Muxing from './Muxing';
import MuxingStream from './MuxingStream';
import MuxingType from './MuxingType';
import StreamConditionsMode from './StreamConditionsMode';

/**
 * @export
 * @interface ProgressiveMovMuxing
 */
export default interface ProgressiveMovMuxing extends Muxing {
    /**
     * The output file name
     * @type {string}
     * @memberof ProgressiveMovMuxing
     */
    filename?: string;

    /**
     * Modifies the internal chunk length used for chunked encoding
     * @type {InternalChunkLength}
     * @memberof ProgressiveMovMuxing
     */
    internalChunkLength?: InternalChunkLength;

}
