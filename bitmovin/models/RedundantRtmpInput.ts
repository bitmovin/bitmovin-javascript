import Input from './Input';
import InputType from './InputType';
import RtmpIngestPoint from './RtmpIngestPoint';

/**
 * @export
 * @interface RedundantRtmpInput
 */
export default interface RedundantRtmpInput extends Input {
    /**
     * When there is no input signal present and this threshold in seconds is reached it will switch to another ingest point
     * @type {number}
     * @memberof RedundantRtmpInput
     */
    delayThreshold?: number;

    /**
     * @type {Array<RtmpIngestPoint>}
     * @memberof RedundantRtmpInput
     */
    ingestPoints: Array<RtmpIngestPoint>;

}
