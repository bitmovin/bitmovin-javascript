import CodecConfigType from './CodecConfigType';
import ColorConfig from './ColorConfig';
import EncodingMode from './EncodingMode';
import PixelFormat from './PixelFormat';
import VideoConfiguration from './VideoConfiguration';
import Vp8ArnrType from './Vp8ArnrType';
import Vp8NoiseSensitivity from './Vp8NoiseSensitivity';
import Vp8Quality from './Vp8Quality';

/**
 * @export
 * @interface Vp8VideoConfiguration
 */
export default interface Vp8VideoConfiguration extends VideoConfiguration {
    /**
     * Sets the constant rate factor for quality-based variable bitrate. Either bitrate or crf is required.
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    crf?: number;

    /**
     * Number of frames to look ahead for alternate reference frame selection.
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    lagInFrames?: number;

    /**
     * Maximum I-frame bitrate (percentage) 0=unlimited
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    maxIntraRate?: number;

    /**
     * Sets the minimum of quantization factor.
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    qpMin?: number;

    /**
     * Sets the maximum of quantization factor.
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    qpMax?: number;

    /**
     * Datarate undershoot (min) target (percentage).
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    rateUndershootPct?: number;

    /**
     * Datarate overshoot (max) target (percentage).
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    rateOvershootPct?: number;

    /**
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    cpuUsed?: number;

    /**
     * @type {Vp8NoiseSensitivity}
     * @memberof Vp8VideoConfiguration
     */
    noiseSensitivity?: Vp8NoiseSensitivity;

    /**
     * Loop filter sharpness.
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    sharpness?: number;

    /**
     * Minimum GOP length, the minimum distance between I-frames.
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    minGop?: number;

    /**
     * Maximum GOP length, the maximum distance between I-frames
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    maxGop?: number;

    /**
     * Minimum interval in seconds between key frames
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    minKeyframeInterval?: number;

    /**
     * Maximum interval in seconds between key frames
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    maxKeyframeInterval?: number;

    /**
     * @type {Vp8Quality}
     * @memberof Vp8VideoConfiguration
     */
    quality?: Vp8Quality;

    /**
     * A change threshold on blocks below which they will be skipped by the encoder.
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    staticThresh?: number;

    /**
     * altref noise reduction max frame count.
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    arnrMaxFrames?: number;

    /**
     * altref noise reduction filter strength.
     * @type {number}
     * @memberof Vp8VideoConfiguration
     */
    arnrStrength?: number;

    /**
     * @type {Vp8ArnrType}
     * @memberof Vp8VideoConfiguration
     */
    arnrType?: Vp8ArnrType;

}
