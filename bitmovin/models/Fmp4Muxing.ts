import EncodingOutput from './EncodingOutput';
import Ignoring from './Ignoring';
import Muxing from './Muxing';
import MuxingStream from './MuxingStream';
import MuxingType from './MuxingType';
import StreamConditionsMode from './StreamConditionsMode';

/**
 * @export
 * @interface Fmp4Muxing
 */
export default interface Fmp4Muxing extends Muxing {
    /**
     * Length of the fragments in seconds
     * @type {number}
     * @memberof Fmp4Muxing
     */
    segmentLength: number;

    /**
     * Segment naming policy
     * @type {string}
     * @memberof Fmp4Muxing
     */
    segmentNaming?: string;

    /**
     * Init segment name
     * @type {string}
     * @memberof Fmp4Muxing
     */
    initSegmentName?: string;

    /**
     * Number of segments which have been encoded
     * @type {number}
     * @memberof Fmp4Muxing
     */
    segmentsMuxed?: number;

}
