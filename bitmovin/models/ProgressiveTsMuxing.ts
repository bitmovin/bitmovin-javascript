import EncodingOutput from './EncodingOutput';
import Ignoring from './Ignoring';
import InternalChunkLength from './InternalChunkLength';
import Muxing from './Muxing';
import MuxingStream from './MuxingStream';
import MuxingType from './MuxingType';
import StreamConditionsMode from './StreamConditionsMode';

/**
 * @export
 * @interface ProgressiveTsMuxing
 */
export default interface ProgressiveTsMuxing extends Muxing {
    /**
     * Length of the segments in seconds
     * @type {number}
     * @memberof ProgressiveTsMuxing
     */
    segmentLength?: number;

    /**
     * Name of the new Video
     * @type {string}
     * @memberof ProgressiveTsMuxing
     */
    filename?: string;

    /**
     * Offset of MPEG-TS timestamps in seconds. E.g., first packet will start with PTS 900,000 for a 10 seconds offset (90,000 MPEG-TS timescale).
     * @type {number}
     * @memberof ProgressiveTsMuxing
     */
    startOffset?: number;

    /**
     * Modifies the internal chunk length used for chunked encoding
     * @type {InternalChunkLength}
     * @memberof ProgressiveTsMuxing
     */
    internalChunkLength?: InternalChunkLength;

}
