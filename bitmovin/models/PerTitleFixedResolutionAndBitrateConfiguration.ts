import PerTitleFixedResolutionAndBitrateConfigurationMode from './PerTitleFixedResolutionAndBitrateConfigurationMode';

/**
 * @export
 * @interface PerTitleFixedResolutionAndBitrateConfiguration
 */
export default interface PerTitleFixedResolutionAndBitrateConfiguration {
    /**
     * Number of forced renditions above the highest fixed representation (e.g. FIXED_RESOLUTION_AND_BITRATE). Forced renditions will be added, also if the Per-Title algorithm chooses the user defined force rendition to be the highest one.
     * @type {number}
     * @memberof PerTitleFixedResolutionAndBitrateConfiguration
     */
    forcedRenditionAboveHighestFixedRepresentation?: number;

    /**
     * The factor to calculate the bitrate that will be chosen based on the bitrate of the last FIXED_RESOLUTION.
     * @type {number}
     * @memberof PerTitleFixedResolutionAndBitrateConfiguration
     */
    forcedRenditionAboveHighestFixedRepresentationFactor?: number;

    /**
     * Mode to calculate the bitrate of the next representation
     * @type {PerTitleFixedResolutionAndBitrateConfigurationMode}
     * @memberof PerTitleFixedResolutionAndBitrateConfiguration
     */
    forcedRenditionAboveHighestFixedRepresentationCalculationMode?: PerTitleFixedResolutionAndBitrateConfigurationMode;

}
