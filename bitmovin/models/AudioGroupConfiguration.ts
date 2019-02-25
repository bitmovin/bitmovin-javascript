import AudioGroup from './AudioGroup';
import VariantStreamDroppingMode from './VariantStreamDroppingMode';

/**
 * @export
 * @interface AudioGroupConfiguration
 */
export default interface AudioGroupConfiguration {
    /**
     * Dropping mode
     * @type {VariantStreamDroppingMode}
     * @memberof AudioGroupConfiguration
     */
    droppingMode: VariantStreamDroppingMode;

    /**
     * Audio groups
     * @type {Array<AudioGroup>}
     * @memberof AudioGroupConfiguration
     */
    groups: Array<AudioGroup>;

}
