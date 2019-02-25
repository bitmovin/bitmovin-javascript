import BitrateSelectionMode from './BitrateSelectionMode';

/**
 * @export
 * @interface StreamPerTitleFixedResolutionAndBitrateSettings
 */
export default interface StreamPerTitleFixedResolutionAndBitrateSettings {
    /**
     * The minimum bitrate that will be used for that template.
     * @type {number}
     * @memberof StreamPerTitleFixedResolutionAndBitrateSettings
     */
    minBitrate?: number;

    /**
     * The maximum bitrate that will be used for that template.
     * @type {number}
     * @memberof StreamPerTitleFixedResolutionAndBitrateSettings
     */
    maxBitrate?: number;

    /**
     * Bitrate selection mode
     * @type {BitrateSelectionMode}
     * @memberof StreamPerTitleFixedResolutionAndBitrateSettings
     */
    bitrateSelectionMode?: BitrateSelectionMode;

    /**
     * Low complexity boundary for max bitrate
     * @type {number}
     * @memberof StreamPerTitleFixedResolutionAndBitrateSettings
     */
    lowComplexityBoundaryForMaxBitrate?: number;

    /**
     * High complexity boundary for max bitrate
     * @type {number}
     * @memberof StreamPerTitleFixedResolutionAndBitrateSettings
     */
    highComplexityBoundaryForMaxBitrate?: number;

}
