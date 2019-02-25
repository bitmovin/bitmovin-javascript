export default interface DashManifestsListQueryParams {

    /**
     * Index of the first item to return, starting at 0. Default is 0
     * @type {number}
     * @memberof DashManifestsListQueryParams
     */
    offset?: number;

    /**
     * Maximum number of items to return. Default is 25, maximum is 100
     * @type {number}
     * @memberof DashManifestsListQueryParams
     */
    limit?: number;

    /**
     * Get the manifests that belong to that encoding id
     * @type {string}
     * @memberof DashManifestsListQueryParams
     */
    encodingId?: string;
}
