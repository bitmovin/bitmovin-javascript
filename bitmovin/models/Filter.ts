import BitmovinResource from './BitmovinResource';
import FilterType from './FilterType';

/**
 * @export
 * @interface Filter
 */
export default interface Filter extends BitmovinResource {
    /**
     * @type {FilterType}
     * @memberof Filter
     */
    type: FilterType;

}
