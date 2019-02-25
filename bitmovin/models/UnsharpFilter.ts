import Filter from './Filter';
import FilterType from './FilterType';

/**
 * @export
 * @interface UnsharpFilter
 */
export default interface UnsharpFilter extends Filter {
    /**
     * Must be an odd integer between 3 and 23
     * @type {number}
     * @memberof UnsharpFilter
     */
    lumaMatrixHorizontalSize?: number;

    /**
     * Must be an odd integer between 3 and 23
     * @type {number}
     * @memberof UnsharpFilter
     */
    lumaMatrixVerticalSize?: number;

    /**
     * Negative value: blur, positive value: sharpen, floating point number, valid value range: -1.5 - 1.5
     * @type {number}
     * @memberof UnsharpFilter
     */
    lumaEffectStrength?: number;

    /**
     * Must be an odd integer between 3 and 23
     * @type {number}
     * @memberof UnsharpFilter
     */
    chromaMatrixHorizontalSize?: number;

    /**
     * Must be an odd integer between 3 and 23
     * @type {number}
     * @memberof UnsharpFilter
     */
    chromaMatrixVerticalSize?: number;

    /**
     * Negative value: blur, positive value: sharpen, floating point number, valid value range: -1.5 - 1.5
     * @type {number}
     * @memberof UnsharpFilter
     */
    chromaEffectStrength?: number;

}
