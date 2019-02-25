export default interface HeAacV1AudioConfigurationsListQueryParams {

    /**
     * Index of the first item to return, starting at 0. Default is 0
     * @type {number}
     * @memberof HeAacV1AudioConfigurationsListQueryParams
     */
    offset?: number;

    /**
     * Maximum number of items to return. Default is 25, maximum is 100
     * @type {number}
     * @memberof HeAacV1AudioConfigurationsListQueryParams
     */
    limit?: number;

    /**
     * Filter configuration by name
     * @type {string}
     * @memberof HeAacV1AudioConfigurationsListQueryParams
     */
    name?: string;
}
