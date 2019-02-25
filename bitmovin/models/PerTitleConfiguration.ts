import AutoRepresentation from './AutoRepresentation';
import PerTitleFixedResolutionAndBitrateConfiguration from './PerTitleFixedResolutionAndBitrateConfiguration';

/**
 * @export
 * @interface PerTitleConfiguration
 */
export default interface PerTitleConfiguration {
    /**
     * The minimum bitrate that will be used by the Per-Title algorithm.
     * @type {number}
     * @memberof PerTitleConfiguration
     */
    minBitrate?: number;

    /**
     * The maximum bitrate that will be used by the Per-Title algorithm. It will not generate any rendition with a higher bitrate.
     * @type {number}
     * @memberof PerTitleConfiguration
     */
    maxBitrate?: number;

    /**
     * The minimum ratio between the bitrates of generated renditions, e.g. if the first bitrate is 240,000, a minimum ratio of 1.5 will require the next higher bitrate to be at least 360,000
     * @type {number}
     * @memberof PerTitleConfiguration
     */
    minBitrateStepSize?: number;

    /**
     * The maximum ratio between the bitrates of neighbouring renditions, e.g., if the first bitrate is 240,000, a maximum ratio of 1.5 will require the next higher bitrate to be at most 360,000
     * @type {number}
     * @memberof PerTitleConfiguration
     */
    maxBitrateStepSize?: number;

    /**
     * @type {AutoRepresentation}
     * @memberof PerTitleConfiguration
     */
    autoRepresentations?: AutoRepresentation;

    /**
     * Will modify the assumed complexity for the Per-Title algorithm (> 0.0). Values higher than 1 will increase complexity and thus select smaller resolutions for given bitrates. This will also result in a higher bitrate for the top rendition. Values lower than 1 will decrease assumed complexity and thus select higher resolutions for given bitrates and also decrease the bitrate of the top rendition
     * @type {number}
     * @memberof PerTitleConfiguration
     */
    complexityFactor?: number;

    /**
     * Additional configuration for fixed resolution and bitrate templates
     * @type {PerTitleFixedResolutionAndBitrateConfiguration}
     * @memberof PerTitleConfiguration
     */
    fixedResolutionAndBitrateConfiguration?: PerTitleFixedResolutionAndBitrateConfiguration;

}
