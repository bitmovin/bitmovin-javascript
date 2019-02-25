import EncodingOutput from './EncodingOutput';
import Ignoring from './Ignoring';
import Muxing from './Muxing';
import MuxingStream from './MuxingStream';
import MuxingType from './MuxingType';
import StreamConditionsMode from './StreamConditionsMode';

/**
 * @export
 * @interface TsMuxing
 */
export default interface TsMuxing extends Muxing {
    /**
     * Length of the fragments in seconds
     * @type {number}
     * @memberof TsMuxing
     */
    segmentLength: number;

    /**
     * Segment naming policy
     * @type {string}
     * @memberof TsMuxing
     */
    segmentNaming?: string;

    /**
     * Offset of MPEG-TS timestamps in seconds. E.g., first packet will start with PTS 900,000 for a 10 seconds offset (90,000 MPEG-TS timescale).
     * @type {number}
     * @memberof TsMuxing
     */
    startOffset?: number;

    /**
     * Number of segments which have been encoded
     * @type {number}
     * @memberof TsMuxing
     */
    segmentsMuxed?: number;

}
