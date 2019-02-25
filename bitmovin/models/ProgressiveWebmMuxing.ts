import EncodingOutput from './EncodingOutput';
import Ignoring from './Ignoring';
import InternalChunkLength from './InternalChunkLength';
import Muxing from './Muxing';
import MuxingStream from './MuxingStream';
import MuxingType from './MuxingType';
import StreamConditionsMode from './StreamConditionsMode';

/**
 * @export
 * @interface ProgressiveWebmMuxing
 */
export default interface ProgressiveWebmMuxing extends Muxing {
    /**
     * Name of the new Video
     * @type {string}
     * @memberof ProgressiveWebmMuxing
     */
    filename?: string;

    /**
     * Modifies the internal chunk length used for chunked encoding
     * @type {InternalChunkLength}
     * @memberof ProgressiveWebmMuxing
     */
    internalChunkLength?: InternalChunkLength;

}
