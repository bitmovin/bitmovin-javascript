import CloudRegion from '../../models/CloudRegion';
export default interface EncodingsListQueryParams {

    /**
     * Index of the first item to return, starting at 0. Default is 0
     * @type {number}
     * @memberof EncodingsListQueryParams
     */
    offset?: number;

    /**
     * Maximum number of items to return. Default is 25, maximum is 100
     * @type {number}
     * @memberof EncodingsListQueryParams
     */
    limit?: number;

    /**
     * Order list result according an encoding resource attribute
     * @type {string}
     * @memberof EncodingsListQueryParams
     */
    sort?: string;

    /**
     * Filter encodings to only show the ones with the type specified.
     * @type {string}
     * @memberof EncodingsListQueryParams
     */
    type?: string;

    /**
     * Filter encodings to only show the ones with the status specified.
     * @type {string}
     * @memberof EncodingsListQueryParams
     */
    status?: string;

    /**
     * Filter encodings to only show the ones with the cloudRegion specified.
     * @type {CloudRegion}
     * @memberof EncodingsListQueryParams
     */
    cloudRegion?: CloudRegion;

    /**
     * Filter encodings to only show the ones with the encoderVersion specified.
     * @type {string}
     * @memberof EncodingsListQueryParams
     */
    encoderVersion?: string;

    /**
     * Filter encodings by name
     * @type {string}
     * @memberof EncodingsListQueryParams
     */
    name?: string;
}
