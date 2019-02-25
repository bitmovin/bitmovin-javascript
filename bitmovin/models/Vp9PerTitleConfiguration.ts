import AutoRepresentation from './AutoRepresentation';
import PerTitleConfiguration from './PerTitleConfiguration';
import PerTitleFixedResolutionAndBitrateConfiguration from './PerTitleFixedResolutionAndBitrateConfiguration';

/**
 * @export
 * @interface Vp9PerTitleConfiguration
 */
export default interface Vp9PerTitleConfiguration extends PerTitleConfiguration {
    /**
     * Desired target quality of the highest representation expressed as CRF value
     * @type {number}
     * @memberof Vp9PerTitleConfiguration
     */
    targetQualityCrf?: number;

}
