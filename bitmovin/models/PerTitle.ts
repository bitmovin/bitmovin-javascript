import H264PerTitleConfiguration from './H264PerTitleConfiguration';
import H265PerTitleConfiguration from './H265PerTitleConfiguration';
import Vp9PerTitleConfiguration from './Vp9PerTitleConfiguration';

/**
 * @export
 * @interface PerTitle
 */
export default interface PerTitle {
    /**
     * Per-Title configuration for H264
     * @type {H264PerTitleConfiguration}
     * @memberof PerTitle
     */
    h264Configuration?: H264PerTitleConfiguration;

    /**
     * Per-Title configuration for H265
     * @type {H265PerTitleConfiguration}
     * @memberof PerTitle
     */
    h265Configuration?: H265PerTitleConfiguration;

    /**
     * Per-Title configuration for VP9
     * @type {Vp9PerTitleConfiguration}
     * @memberof PerTitle
     */
    vp9Configuration?: Vp9PerTitleConfiguration;

}
