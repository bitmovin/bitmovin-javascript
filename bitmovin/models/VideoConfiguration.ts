import CodecConfigType from './CodecConfigType';
import CodecConfiguration from './CodecConfiguration';
import ColorConfig from './ColorConfig';
import EncodingMode from './EncodingMode';
import PixelFormat from './PixelFormat';

/**
 * @export
 * @interface VideoConfiguration
 */
export default interface VideoConfiguration extends CodecConfiguration {
    /**
     * Width of the encoded video in pixels
     * @type {number}
     * @memberof VideoConfiguration
     */
    width?: number;

    /**
     * Height of the encoded video in pixels
     * @type {number}
     * @memberof VideoConfiguration
     */
    height?: number;

    /**
     * Target bitrate for the encoded video in bps. Either bitrate or crf is required.
     * @type {number}
     * @memberof VideoConfiguration
     */
    bitrate?: number;

    /**
     * Target frame rate of the encoded video. Must be set for live encodings
     * @type {number}
     * @memberof VideoConfiguration
     */
    rate?: number;

    /**
     * @type {PixelFormat}
     * @memberof VideoConfiguration
     */
    pixelFormat?: PixelFormat;

    /**
     * @type {ColorConfig}
     * @memberof VideoConfiguration
     */
    colorConfig?: ColorConfig;

    /**
     * The numerator of the sample aspect ratio (also known as pixel aspect ratio). Must be set if sampleAspectRatioDenominator is set.
     * @type {number}
     * @memberof VideoConfiguration
     */
    sampleAspectRatioNumerator?: number;

    /**
     * The denominator of the sample aspect ratio (also known as pixel aspect ratio). Must be set if sampleAspectRatioNumerator is set.
     * @type {number}
     * @memberof VideoConfiguration
     */
    sampleAspectRatioDenominator?: number;

    /**
     * The mode of the encoding
     * @type {EncodingMode}
     * @memberof VideoConfiguration
     */
    encodingMode?: EncodingMode;

}
