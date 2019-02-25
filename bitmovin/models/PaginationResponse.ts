
/**
 * @export
 * @interface PaginationResponse
 */
export default interface PaginationResponse<T> {
    /**
     * @type {number}
     * @memberof PaginationResponse
     */
    totalCount?: number;

    /**
     * @type {number}
     * @memberof PaginationResponse
     */
    offset?: number;

    /**
     * @type {number}
     * @memberof PaginationResponse
     */
    limit?: number;

    /**
     * @type {string}
     * @memberof PaginationResponse
     */
    previous?: string;

    /**
     * @type {string}
     * @memberof PaginationResponse
     */
    next?: string;

    /**
     * @type {Array<T>}
     * @memberof PaginationResponse
     */
    items?: Array<T>;

}
