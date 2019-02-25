export default interface StatisticsPerLabelsListByDateRangeQueryParams {

    /**
     * Index of the first item to return, starting at 0. Default is 0
     * @type {number}
     * @memberof StatisticsPerLabelsListByDateRangeQueryParams
     */
    offset?: number;

    /**
     * Maximum number of items to return. Default is 25, maximum is 100
     * @type {number}
     * @memberof StatisticsPerLabelsListByDateRangeQueryParams
     */
    limit?: number;

    /**
     * Comma separated list of labels. Filter results to only show the ones specified
     * @type {string}
     * @memberof StatisticsPerLabelsListByDateRangeQueryParams
     */
    labels?: string;
}
