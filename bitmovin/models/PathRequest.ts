import CloudRegion from './CloudRegion';

/**
 * @export
 * @interface PathRequest
 */
export default interface PathRequest {
    /**
     * @type {string}
     * @memberof PathRequest
     */
    path?: string;

    /**
     * @type {boolean}
     * @memberof PathRequest
     */
    recursive?: boolean;

    /**
     * @type {CloudRegion}
     * @memberof PathRequest
     */
    cloudRegion?: CloudRegion;

}
