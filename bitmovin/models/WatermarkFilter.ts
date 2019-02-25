import Filter from './Filter';
import FilterType from './FilterType';
import PositionUnit from './PositionUnit';

/**
 * @export
 * @interface WatermarkFilter
 */
export default interface WatermarkFilter extends Filter {
    /**
     * URL of the file to be used as watermark image. Supported image formats: PNG, JPEG, BMP, GIF
     * @type {string}
     * @memberof WatermarkFilter
     */
    image: string;

    /**
     * Distance from the left edge of the input video to the left edge of the watermark image. May not be set if 'right' is set.
     * @type {number}
     * @memberof WatermarkFilter
     */
    left?: number;

    /**
     * Distance from the right edge of the input video to the right edge of the watermark image . May not be set if 'left' is set.
     * @type {number}
     * @memberof WatermarkFilter
     */
    right?: number;

    /**
     * Distance from the top edge of the input video to the top edge of the watermark image. May not be set if 'bottom' is set.
     * @type {number}
     * @memberof WatermarkFilter
     */
    top?: number;

    /**
     * Distance from the bottom edge of the input video to the bottom edge of the watermark image. May not be set if 'top' is set.
     * @type {number}
     * @memberof WatermarkFilter
     */
    bottom?: number;

    /**
     * @type {PositionUnit}
     * @memberof WatermarkFilter
     */
    unit?: PositionUnit;

}
