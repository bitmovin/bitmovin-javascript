import AutoRepresentation from './AutoRepresentation';
import PerTitleConfiguration from './PerTitleConfiguration';
import PerTitleFixedResolutionAndBitrateConfiguration from './PerTitleFixedResolutionAndBitrateConfiguration';

/**
 * @export
 * @interface H264PerTitleConfiguration
 */
export default interface H264PerTitleConfiguration extends PerTitleConfiguration {
    /**
     * Desired target quality of the highest representation expressed as CRF value
     * @type {number}
     * @memberof H264PerTitleConfiguration
     */
    targetQualityCrf?: number;

    /**
     * This factor is used to calculate the minBitrate of the codec configuration for the generated representations as a multiple of the targetBitrate
     * @type {number}
     * @memberof H264PerTitleConfiguration
     */
    codecMinBitrateFactor?: number;

    /**
     * This factor is used to calculate the maxBitrate of the codec configuration for the generated representations as a multiple of the targetBitrate
     * @type {number}
     * @memberof H264PerTitleConfiguration
     */
    codecMaxBitrateFactor?: number;

    /**
     * This factor is used to calculate the bufsize of the codec configuration for the generated representations as a multiple of the targetBitrate
     * @type {number}
     * @memberof H264PerTitleConfiguration
     */
    codecBufsizeFactor?: number;

}
