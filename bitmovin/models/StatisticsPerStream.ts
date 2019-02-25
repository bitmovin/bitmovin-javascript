import CodecConfigType from './CodecConfigType';
import EncodingMode from './EncodingMode';
import PsnrPerStreamMode from './PsnrPerStreamMode';
import StatisticsPerTitleStream from './StatisticsPerTitleStream';
import StatisticsResolution from './StatisticsResolution';

/**
 * @export
 * @interface StatisticsPerStream
 */
export default interface StatisticsPerStream {
    /**
     * ID of the stream
     * @type {string}
     * @memberof StatisticsPerStream
     */
    streamId: string;

    /**
     * ID of the condec configuration
     * @type {string}
     * @memberof StatisticsPerStream
     */
    codecConfigId: string;

    /**
     * Multiplier for the encoded minutes. Depends on muxing type.
     * @type {number}
     * @memberof StatisticsPerStream
     */
    multiplicator: number;

    /**
     * Encoded bytes.
     * @type {number}
     * @memberof StatisticsPerStream
     */
    encodedBytes: number;

    /**
     * Length of the stream.
     * @type {number}
     * @memberof StatisticsPerStream
     */
    encodedSeconds: number;

    /**
     * Minutes you will be charged for (billableMinutes = encodedSeconds * multiplicator)
     * @type {number}
     * @memberof StatisticsPerStream
     */
    billableMinutes: number;

    /**
     * Video width, only if video stream
     * @type {number}
     * @memberof StatisticsPerStream
     */
    width?: number;

    /**
     * Video height, only if video stream
     * @type {number}
     * @memberof StatisticsPerStream
     */
    height?: number;

    /**
     * If it' a video stream this value is the FPS, for audio it's the sample rate.
     * @type {number}
     * @memberof StatisticsPerStream
     */
    rate: number;

    /**
     * Bitrate of the stream
     * @type {number}
     * @memberof StatisticsPerStream
     */
    bitrate: number;

    /**
     * @type {CodecConfigType}
     * @memberof StatisticsPerStream
     */
    codec: CodecConfigType;

    /**
     * @type {StatisticsResolution}
     * @memberof StatisticsPerStream
     */
    resolution?: StatisticsResolution;

    /**
     * @type {EncodingMode}
     * @memberof StatisticsPerStream
     */
    encodingMode?: EncodingMode;

    /**
     * The output minutes multiplicator for the given encodingMode
     * @type {number}
     * @memberof StatisticsPerStream
     */
    encodingModeMultiplicator?: number;

    /**
     * @type {StatisticsPerTitleStream}
     * @memberof StatisticsPerStream
     */
    perTitleResultStream?: StatisticsPerTitleStream;

    /**
     * The output minutes multiplicator for per-title
     * @type {number}
     * @memberof StatisticsPerStream
     */
    perTitleMultiplicator?: number;

    /**
     * @type {PsnrPerStreamMode}
     * @memberof StatisticsPerStream
     */
    psnrMode?: PsnrPerStreamMode;

    /**
     * The output minutes multiplicator for psnr streams
     * @type {number}
     * @memberof StatisticsPerStream
     */
    psnrMultiplicator?: number;

}
