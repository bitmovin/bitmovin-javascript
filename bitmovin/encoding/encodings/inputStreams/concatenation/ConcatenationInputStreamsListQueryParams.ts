export default interface ConcatenationInputStreamsListQueryParams {

    /**
     * Index of the first item to return, starting at 0. Default is 0
     * @type {number}
     * @memberof ConcatenationInputStreamsListQueryParams
     */
    offset?: number;

    /**
     * Maximum number of items to return. Default is 25, maximum is 100
     * @type {number}
     * @memberof ConcatenationInputStreamsListQueryParams
     */
    limit?: number;
}
