import AutoRepresentation from './AutoRepresentation';
import PerTitleConfiguration from './PerTitleConfiguration';
import PerTitleFixedResolutionAndBitrateConfiguration from './PerTitleFixedResolutionAndBitrateConfiguration';

/**
 * @export
 * @interface H265PerTitleConfiguration
 */
export default interface H265PerTitleConfiguration extends PerTitleConfiguration {
    /**
     * Desired target quality of the highest representation expressed as CRF value
     * @type {number}
     * @memberof H265PerTitleConfiguration
     */
    targetQualityCrf?: number;

    /**
     * This factor is used to calculate the minBitrate of the codec configuration for the generated representations as a multiple of the targetBitrate
     * @type {number}
     * @memberof H265PerTitleConfiguration
     */
    codecMinBitrateFactor?: number;

    /**
     * This factor is used to calculate the maxBitrate of the codec configuration for the generated representations as a multiple of the targetBitrate
     * @type {number}
     * @memberof H265PerTitleConfiguration
     */
    codecMaxBitrateFactor?: number;

    /**
     * This factor is used to calculate the bufsize of the codec configuration for the generated representations as a multiple of the targetBitrate
     * @type {number}
     * @memberof H265PerTitleConfiguration
     */
    codecBufsizeFactor?: number;

}
