import Filter from './Filter';
import FilterType from './FilterType';
import PositionUnit from './PositionUnit';

/**
 * @export
 * @interface EnhancedWatermarkFilter
 */
export default interface EnhancedWatermarkFilter extends Filter {
    /**
     * URL of the file to be used as watermark image. Supported image formats: PNG, JPEG, BMP, GIF
     * @type {string}
     * @memberof EnhancedWatermarkFilter
     */
    image: string;

    /**
     * Distance from the left edge of the input video to the left edge of the watermark image. May not be set if 'right' is set.
     * @type {number}
     * @memberof EnhancedWatermarkFilter
     */
    left?: number;

    /**
     * Distance from the right edge of the input video to the right edge of the watermark image . May not be set if 'left' is set.
     * @type {number}
     * @memberof EnhancedWatermarkFilter
     */
    right?: number;

    /**
     * Distance from the top edge of the input video to the top edge of the watermark image. May not be set if 'bottom' is set.
     * @type {number}
     * @memberof EnhancedWatermarkFilter
     */
    top?: number;

    /**
     * Distance from the bottom edge of the input video to the bottom edge of the watermark image. May not be set if 'top' is set.
     * @type {number}
     * @memberof EnhancedWatermarkFilter
     */
    bottom?: number;

    /**
     * @type {PositionUnit}
     * @memberof EnhancedWatermarkFilter
     */
    unit?: PositionUnit;

}
