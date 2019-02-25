import AudioVolumeUnit from './AudioVolumeUnit';
import Filter from './Filter';
import FilterType from './FilterType';

/**
 * @export
 * @interface AudioVolumeFilter
 */
export default interface AudioVolumeFilter extends Filter {
    /**
     * Audio volume value
     * @type {number}
     * @memberof AudioVolumeFilter
     */
    volume: number;

    /**
     * @type {AudioVolumeUnit}
     * @memberof AudioVolumeFilter
     */
    unit: AudioVolumeUnit;

}
