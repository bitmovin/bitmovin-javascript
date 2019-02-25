import BitmovinResource from './BitmovinResource';
import EncodingOutput from './EncodingOutput';
import Ignoring from './Ignoring';
import MuxingStream from './MuxingStream';
import MuxingType from './MuxingType';
import StreamConditionsMode from './StreamConditionsMode';

/**
 * @export
 * @interface Muxing
 */
export default interface Muxing extends BitmovinResource {
    /**
     * @type {Array<MuxingStream>}
     * @memberof Muxing
     */
    streams: Array<MuxingStream>;

    /**
     * @type {Array<EncodingOutput>}
     * @memberof Muxing
     */
    outputs?: Array<EncodingOutput>;

    /**
     * Type of the muxing
     * @type {MuxingType}
     * @memberof Muxing
     */
    type?: MuxingType;

    /**
     * Average bitrate. Available after encoding finishes.
     * @type {number}
     * @memberof Muxing
     */
    avgBitrate?: number;

    /**
     * Min bitrate. Available after encoding finishes.
     * @type {number}
     * @memberof Muxing
     */
    minBitrate?: number;

    /**
     * Max bitrate. Available after encoding finishes.
     * @type {number}
     * @memberof Muxing
     */
    maxBitrate?: number;

    /**
     * If this is set and contains objects, then this muxing has been ignored during the encoding process
     * @type {Array<Ignoring>}
     * @memberof Muxing
     */
    ignoredBy?: Array<Ignoring>;

    /**
     * Specifies how to handle streams that don't fulfill stream conditions
     * @type {StreamConditionsMode}
     * @memberof Muxing
     */
    streamConditionsMode?: StreamConditionsMode;

}
