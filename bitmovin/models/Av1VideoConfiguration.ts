import Av1AdaptiveQuantMode from './Av1AdaptiveQuantMode';
import Av1KeyPlacementMode from './Av1KeyPlacementMode';
import CodecConfigType from './CodecConfigType';
import ColorConfig from './ColorConfig';
import EncodingMode from './EncodingMode';
import PixelFormat from './PixelFormat';
import VideoConfiguration from './VideoConfiguration';

/**
 * @export
 * @interface Av1VideoConfiguration
 */
export default interface Av1VideoConfiguration extends VideoConfiguration {
    /**
     * @type {Av1KeyPlacementMode}
     * @memberof Av1VideoConfiguration
     */
    keyPlacementMode?: Av1KeyPlacementMode;

    /**
     * @type {Av1AdaptiveQuantMode}
     * @memberof Av1VideoConfiguration
     */
    adaptiveQuantMode?: Av1AdaptiveQuantMode;

    /**
     * Number of frames to look ahead for alternate reference frame selection
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    lagInFrames?: number;

    /**
     * Minimum (best quality) quantizer
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    minQ?: number;

    /**
     * Maximum (worst quality) quantizer
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    maxQ?: number;

    /**
     * Rate control adaptation undershoot control
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    undershootPct?: number;

    /**
     * Rate control adaptation overshoot control
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    overshootPct?: number;

    /**
     * Decoder buffer size in milliseconds
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    clientBufferSize?: number;

    /**
     * Decoder buffer initial size in milliseconds
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    clientInitialBufferSize?: number;

    /**
     * Decoder buffer optimal size in milliseconds
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    clientOptimalBufferSize?: number;

    /**
     * Number of tile columns to use, log2
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    tileColumns?: number;

    /**
     * Number of tile rows to use, log2
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    tileRows?: number;

    /**
     * Enable automatic set and use alf frames
     * @type {boolean}
     * @memberof Av1VideoConfiguration
     */
    isAutomaticAltRefFramesEnabled?: boolean;

    /**
     * The max number of frames to create arf
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    arnrMaxFrames?: number;

    /**
     * The filter strength for the arf
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    arnrStrength?: number;

    /**
     * Maximum data rate for intra frames, expressed as a percentage of the average per-frame bitrate. Default value 0 meaning unlimited
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    maxIntraRate?: number;

    /**
     * Lossless encoding mode
     * @type {boolean}
     * @memberof Av1VideoConfiguration
     */
    isLossless?: boolean;

    /**
     * Enable frame parallel decoding feature
     * @type {boolean}
     * @memberof Av1VideoConfiguration
     */
    isFrameParallel?: boolean;

    /**
     * Sets the sharpness
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    sharpness?: number;

    /**
     * Enable quality boost by lowering frame level Q periodically
     * @type {boolean}
     * @memberof Av1VideoConfiguration
     */
    isFrameBoostEnabled?: boolean;

    /**
     * Enable noise sensitivity on Y channel
     * @type {boolean}
     * @memberof Av1VideoConfiguration
     */
    noiseSensitivity?: boolean;

    /**
     * Minimum interval between GF/ARF frames
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    minGfInterval?: number;

    /**
     * Maximum interval between GF/ARF frames
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    maxGfInterval?: number;

    /**
     * Maximum number of tile groups
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    numTileGroups?: number;

    /**
     * Maximum number of bytes in a tile group
     * @type {number}
     * @memberof Av1VideoConfiguration
     */
    mtuSize?: number;

}
