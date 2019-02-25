import Filter from './Filter';
import FilterType from './FilterType';
import PositionUnit from './PositionUnit';

/**
 * @export
 * @interface CropFilter
 */
export default interface CropFilter extends Filter {
    /**
     * Amount of pixels which will be cropped of the input video from the left side.
     * @type {number}
     * @memberof CropFilter
     */
    left?: number;

    /**
     * Amount of pixels which will be cropped of the input video from the right side.
     * @type {number}
     * @memberof CropFilter
     */
    right?: number;

    /**
     * Amount of pixels which will be cropped of the input video from the top.
     * @type {number}
     * @memberof CropFilter
     */
    top?: number;

    /**
     * Amount of pixels which will be cropped of the input video from the bottom.
     * @type {number}
     * @memberof CropFilter
     */
    bottom?: number;

    /**
     * @type {PositionUnit}
     * @memberof CropFilter
     */
    unit?: PositionUnit;

}
