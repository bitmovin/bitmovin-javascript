export default interface Eac3AudioConfigurationsListQueryParams {

    /**
     * Index of the first item to return, starting at 0. Default is 0
     * @type {number}
     * @memberof Eac3AudioConfigurationsListQueryParams
     */
    offset?: number;

    /**
     * Maximum number of items to return. Default is 25, maximum is 100
     * @type {number}
     * @memberof Eac3AudioConfigurationsListQueryParams
     */
    limit?: number;

    /**
     * Filter configuration by name
     * @type {string}
     * @memberof Eac3AudioConfigurationsListQueryParams
     */
    name?: string;
}
