import BroadcastTsMuxingConfiguration from './BroadcastTsMuxingConfiguration';
import EncodingOutput from './EncodingOutput';
import Ignoring from './Ignoring';
import InternalChunkLength from './InternalChunkLength';
import Muxing from './Muxing';
import MuxingStream from './MuxingStream';
import MuxingType from './MuxingType';
import StreamConditionsMode from './StreamConditionsMode';

/**
 * @export
 * @interface BroadcastTsMuxing
 */
export default interface BroadcastTsMuxing extends Muxing {
    /**
     * Length of the segments in seconds.
     * @type {number}
     * @memberof BroadcastTsMuxing
     */
    segmentLength?: number;

    /**
     * Name of the new Video
     * @type {string}
     * @memberof BroadcastTsMuxing
     */
    filename?: string;

    /**
     * @type {BroadcastTsMuxingConfiguration}
     * @memberof BroadcastTsMuxing
     */
    configuration?: BroadcastTsMuxingConfiguration;

    /**
     * Modifies the internal chunk length used for chunked encoding
     * @type {InternalChunkLength}
     * @memberof BroadcastTsMuxing
     */
    internalChunkLength?: InternalChunkLength;

}
