import Filter from './Filter';
import FilterType from './FilterType';

/**
 * @export
 * @interface RotateFilter
 */
export default interface RotateFilter extends Filter {
    /**
     * Rotation of the video in degrees. A positive value will rotate the video clockwise and a negative one counter clockwise.
     * @type {number}
     * @memberof RotateFilter
     */
    rotation: number;

}
