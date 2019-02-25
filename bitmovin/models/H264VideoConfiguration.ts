import AdaptiveQuantMode from './AdaptiveQuantMode';
import BAdapt from './BAdapt';
import Cea608708SubtitleConfiguration from './Cea608708SubtitleConfiguration';
import CodecConfigType from './CodecConfigType';
import ColorConfig from './ColorConfig';
import EncodingMode from './EncodingMode';
import H264BPyramid from './H264BPyramid';
import H264InterlaceMode from './H264InterlaceMode';
import H264MotionEstimationMethod from './H264MotionEstimationMethod';
import H264NalHrd from './H264NalHrd';
import H264Partition from './H264Partition';
import H264SubMe from './H264SubMe';
import H264Trellis from './H264Trellis';
import LevelH264 from './LevelH264';
import MvPredictionMode from './MvPredictionMode';
import PixelFormat from './PixelFormat';
import ProfileH264 from './ProfileH264';
import VideoConfiguration from './VideoConfiguration';
import WeightedPredictionPFrames from './WeightedPredictionPFrames';

/**
 * @export
 * @interface H264VideoConfiguration
 */
export default interface H264VideoConfiguration extends VideoConfiguration {
    /**
     * Sets the constant rate factor for quality-based variable bitrate. Either bitrate or crf is required.
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    crf?: number;

    /**
     * @type {ProfileH264}
     * @memberof H264VideoConfiguration
     */
    profile: ProfileH264;

    /**
     * Sets the amount of b frames.
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    bframes?: number;

    /**
     * Sets the amount of reference frames.
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    refFrames?: number;

    /**
     * Sets the minimum of quantization factor.
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    qpMin?: number;

    /**
     * Sets the maximum of quantization factor.
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    qpMax?: number;

    /**
     * @type {MvPredictionMode}
     * @memberof H264VideoConfiguration
     */
    mvPredictionMode?: MvPredictionMode;

    /**
     * Sets the maximum Motion-Vector-Search-Range
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    mvSearchRangeMax?: number;

    /**
     * Enable or disable CABAC
     * @type {boolean}
     * @memberof H264VideoConfiguration
     */
    cabac?: boolean;

    /**
     * Maximum Bitrate
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    maxBitrate?: number;

    /**
     * Minimum Bitrate
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    minBitrate?: number;

    /**
     * Playback device buffer size
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    bufsize?: number;

    /**
     * Minimum GOP length, the minimum distance between I-frames
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    minGop?: number;

    /**
     * Maximum GOP length, the maximum distance between I-frames
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    maxGop?: number;

    /**
     * Enable open-gop, allows referencing frames from a previous gop
     * @type {boolean}
     * @memberof H264VideoConfiguration
     */
    openGop?: boolean;

    /**
     * Minimum interval in seconds between key frames
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    minKeyframeInterval?: number;

    /**
     * Maximum interval in seconds between key frames
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    maxKeyframeInterval?: number;

    /**
     * @type {LevelH264}
     * @memberof H264VideoConfiguration
     */
    level?: LevelH264;

    /**
     * @type {BAdapt}
     * @memberof H264VideoConfiguration
     */
    bAdaptiveStrategy?: BAdapt;

    /**
     * @type {H264MotionEstimationMethod}
     * @memberof H264VideoConfiguration
     */
    motionEstimationMethod?: H264MotionEstimationMethod;

    /**
     * Number of frames for frame-type decision lookahead
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    rcLookahead?: number;

    /**
     * Subpixel motion estimation and mode decision
     * @type {H264SubMe}
     * @memberof H264VideoConfiguration
     */
    subMe?: H264SubMe;

    /**
     * Enables or disables Trellis quantization. NOTE: This requires cabac
     * @type {H264Trellis}
     * @memberof H264VideoConfiguration
     */
    trellis?: H264Trellis;

    /**
     * Partitions to consider. Analyzing more partition options improves quality at the cost of speed.
     * @type {Array<H264Partition>}
     * @memberof H264VideoConfiguration
     */
    partitions?: Array<H264Partition>;

    /**
     * Number of slices per frame.
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    slices?: number;

    /**
     * Using TOP_FIELD_FIRST or BOTTOM_FIELD_FIRST will output interlaced video
     * @type {H264InterlaceMode}
     * @memberof H264VideoConfiguration
     */
    interlaceMode?: H264InterlaceMode;

    /**
     * Scene Change sensitivity. The higher the value, the more likely an I-Frame will be inserted. Set to 0 to disable it.
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    sceneCutThreshold?: number;

    /**
     * Signal hypothetical reference decoder (HRD) information (requires bufsize to be set)
     * @type {H264NalHrd}
     * @memberof H264VideoConfiguration
     */
    nalHrd?: H264NalHrd;

    /**
     * Keep some B-frames as references
     * @type {H264BPyramid}
     * @memberof H264VideoConfiguration
     */
    bPyramid?: H264BPyramid;

    /**
     * Defines whether CEA 608/708 subtitles are copied from the input video stream
     * @type {Cea608708SubtitleConfiguration}
     * @memberof H264VideoConfiguration
     */
    cea608708SubtitleConfiguration?: Cea608708SubtitleConfiguration;

    /**
     * Strength of the in-loop deblocking filter. Higher values deblock more effectively but also soften the image
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    deblockAlpha?: number;

    /**
     * Threshold of the in-loop deblocking filter. Higher values apply deblocking stronger on non flat blocks, lower values on flat blocks
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    deblockBeta?: number;

    /**
     * Controls the adaptive quantization algorithm
     * @type {AdaptiveQuantMode}
     * @memberof H264VideoConfiguration
     */
    adaptiveQuantizationMode?: AdaptiveQuantMode;

    /**
     * Values greater than 1 reduce blocking and blurring in flat and textured areas. Values less than 1 reduces ringing artifacts at the cost of more banding artifacts. Negative values are not allowed
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    adaptiveQuantizationStrength?: number;

    /**
     * Allow references on a per partition basis, rather than per-macroblock basis
     * @type {boolean}
     * @memberof H264VideoConfiguration
     */
    mixedReferences?: boolean;

    /**
     * Enables adaptive spatial transform (high profile 8x8 transform)
     * @type {boolean}
     * @memberof H264VideoConfiguration
     */
    adaptiveSpatialTransform?: boolean;

    /**
     * Enables fast skip detection on P-frames. Disabling this very slightly increases quality but at a large speed loss
     * @type {boolean}
     * @memberof H264VideoConfiguration
     */
    fastSkipDetectionPFrames?: boolean;

    /**
     * Enable open-gop, allows referencing frames from a previous gop
     * @type {boolean}
     * @memberof H264VideoConfiguration
     */
    weightedPredictionBFrames?: boolean;

    /**
     * Defines the mode for weighted prediction for P-frames
     * @type {WeightedPredictionPFrames}
     * @memberof H264VideoConfiguration
     */
    weightedPredictionPFrames?: WeightedPredictionPFrames;

    /**
     * Enable macroblock tree ratecontrol. Macroblock tree rate control tracks how often blocks of the frame are used for prediciting future frames
     * @type {boolean}
     * @memberof H264VideoConfiguration
     */
    macroblockTreeRatecontrol?: boolean;

    /**
     * Ratio between constant bitrate (0.0) and constant quantizer (1.0). Valid range 0.0 - 1.0
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    quantizerCurveCompression?: number;

    /**
     * Psychovisual Rate Distortion retains fine details like film grain at the expense of more blocking artifacts. Higher values make the video appear sharper and more detailed but with a higher risk of blocking artifacts. Needs to have subMe with RD_IP, RD_ALL, RD_REF_IP, RD_REF_ALL, QPRD or FULL_RD
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    psyRateDistortionOptimization?: number;

    /**
     * Higher values will improve sharpness and detail retention but might come at costs of artifacts. Needs to have trellis enabled
     * @type {number}
     * @memberof H264VideoConfiguration
     */
    psyTrellis?: number;

}
