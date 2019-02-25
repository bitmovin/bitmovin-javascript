import Filter from './Filter';
import FilterType from './FilterType';
import InterlaceMode from './InterlaceMode';
import VerticalLowPassFilteringMode from './VerticalLowPassFilteringMode';

/**
 * @export
 * @interface InterlaceFilter
 */
export default interface InterlaceFilter extends Filter {
    /**
     * @type {InterlaceMode}
     * @memberof InterlaceFilter
     */
    mode?: InterlaceMode;

    /**
     * @type {VerticalLowPassFilteringMode}
     * @memberof InterlaceFilter
     */
    verticalLowPassFilteringMode?: VerticalLowPassFilteringMode;

}
