import CodecConfigType from './CodecConfigType';
import ColorConfig from './ColorConfig';
import EncodingMode from './EncodingMode';
import PixelFormat from './PixelFormat';
import VideoConfiguration from './VideoConfiguration';
import Vp9AqMode from './Vp9AqMode';
import Vp9ArnrType from './Vp9ArnrType';
import Vp9Quality from './Vp9Quality';

/**
 * @export
 * @interface Vp9VideoConfiguration
 */
export default interface Vp9VideoConfiguration extends VideoConfiguration {
    /**
     * Sets the constant rate factor for quality-based variable bitrate. Either bitrate or crf is required.
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    crf?: number;

    /**
     * Number of frames to look ahead for alternate reference frame selection.
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    lagInFrames?: number;

    /**
     * Number of tile columns to use, log2.
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    tileColumns?: number;

    /**
     * Number of tile rows to use, log2.
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    tileRows?: number;

    /**
     * Enable frame parallel decodability features
     * @type {boolean}
     * @memberof Vp9VideoConfiguration
     */
    frameParallel?: boolean;

    /**
     * Maximum I-frame bitrate (percentage) 0=unlimited
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    maxIntraRate?: number;

    /**
     * Sets the minimum of quantization factor.
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    qpMin?: number;

    /**
     * Sets the maximum of quantization factor.
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    qpMax?: number;

    /**
     * Datarate undershoot (min) target (percentage).
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    rateUndershootPct?: number;

    /**
     * Datarate overshoot (max) target (percentage).
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    rateOvershootPct?: number;

    /**
     * Enable noise sensitivity on Y channel
     * @type {boolean}
     * @memberof Vp9VideoConfiguration
     */
    noiseSensitivity?: boolean;

    /**
     * Loop filter sharpness.
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    sharpness?: number;

    /**
     * Minimum GOP length, the minimum distance between I-frames.
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    minGop?: number;

    /**
     * Maximum GOP length, the maximum distance between I-frames
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    maxGop?: number;

    /**
     * Minimum interval in seconds between key frames
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    minKeyframeInterval?: number;

    /**
     * Maximum interval in seconds between key frames
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    maxKeyframeInterval?: number;

    /**
     * @type {Vp9Quality}
     * @memberof Vp9VideoConfiguration
     */
    quality?: Vp9Quality;

    /**
     * Lossless mode
     * @type {boolean}
     * @memberof Vp9VideoConfiguration
     */
    lossless?: boolean;

    /**
     * A change threshold on blocks below which they will be skipped by the encoder.
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    staticThresh?: number;

    /**
     * @type {Vp9AqMode}
     * @memberof Vp9VideoConfiguration
     */
    aqMode?: Vp9AqMode;

    /**
     * altref noise reduction max frame count.
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    arnrMaxFrames?: number;

    /**
     * altref noise reduction filter strength.
     * @type {number}
     * @memberof Vp9VideoConfiguration
     */
    arnrStrength?: number;

    /**
     * @type {Vp9ArnrType}
     * @memberof Vp9VideoConfiguration
     */
    arnrType?: Vp9ArnrType;

}
