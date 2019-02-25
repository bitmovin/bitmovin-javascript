export default interface StatisticsPerLabelsListQueryParams {

    /**
     * Index of the first item to return, starting at 0. Default is 0
     * @type {number}
     * @memberof StatisticsPerLabelsListQueryParams
     */
    offset?: number;

    /**
     * Maximum number of items to return. Default is 25, maximum is 100
     * @type {number}
     * @memberof StatisticsPerLabelsListQueryParams
     */
    limit?: number;

    /**
     * Comma separated list of labels. Filter results to only show the ones specified
     * @type {string}
     * @memberof StatisticsPerLabelsListQueryParams
     */
    labels?: string;
}
