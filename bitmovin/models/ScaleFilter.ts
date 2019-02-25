import Filter from './Filter';
import FilterType from './FilterType';
import ScalingAlgorithm from './ScalingAlgorithm';

/**
 * @export
 * @interface ScaleFilter
 */
export default interface ScaleFilter extends Filter {
    /**
     * The width of the output frame in pixel. If not set: codec configuration width will be used.
     * @type {number}
     * @memberof ScaleFilter
     */
    width?: number;

    /**
     * The height of the output frame in pixel. If not set: codec configuration height will be used.
     * @type {number}
     * @memberof ScaleFilter
     */
    height?: number;

    /**
     * @type {ScalingAlgorithm}
     * @memberof ScaleFilter
     */
    scalingAlgorithm?: ScalingAlgorithm;

}
