
/**
 * @export
 * @interface StreamFilter
 */
export default interface StreamFilter {
    /**
     * The id of the filter that should be used in the stream
     * @type {string}
     * @memberof StreamFilter
     */
    id: string;

    /**
     * Defines the order in which filters are applied. Filters are applied in ascending order.
     * @type {number}
     * @memberof StreamFilter
     */
    position: number;

}
