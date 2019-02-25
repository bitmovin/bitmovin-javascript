import EncodingOutput from './EncodingOutput';
import Ignoring from './Ignoring';
import Muxing from './Muxing';
import MuxingStream from './MuxingStream';
import MuxingType from './MuxingType';
import StreamConditionsMode from './StreamConditionsMode';

/**
 * @export
 * @interface SegmentedRawMuxing
 */
export default interface SegmentedRawMuxing extends Muxing {
    /**
     * Length of the fragments in seconds
     * @type {number}
     * @memberof SegmentedRawMuxing
     */
    segmentLength: number;

    /**
     * Segment naming policy
     * @type {string}
     * @memberof SegmentedRawMuxing
     */
    segmentNaming: string;

    /**
     * Number of segments which have been encoded
     * @type {number}
     * @memberof SegmentedRawMuxing
     */
    segmentsMuxed?: number;

}
