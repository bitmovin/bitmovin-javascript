import EncodingOutput from './EncodingOutput';
import Ignoring from './Ignoring';
import Muxing from './Muxing';
import MuxingStream from './MuxingStream';
import MuxingType from './MuxingType';
import StreamConditionsMode from './StreamConditionsMode';

/**
 * @export
 * @interface WebmMuxing
 */
export default interface WebmMuxing extends Muxing {
    /**
     * Length of the fragments in seconds
     * @type {number}
     * @memberof WebmMuxing
     */
    segmentLength: number;

    /**
     * Segment naming policy
     * @type {string}
     * @memberof WebmMuxing
     */
    segmentNaming?: string;

    /**
     * Init segment name
     * @type {string}
     * @memberof WebmMuxing
     */
    initSegmentName?: string;

}
