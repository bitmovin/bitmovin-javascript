import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface BitmovinResource
 */
export default interface BitmovinResource extends BitmovinResponse {
    /**
     * Name of the resource. Can be freely chosen by the user.
     * @type {string}
     * @memberof BitmovinResource
     */
    name?: string;

    /**
     * Description of the resource. Can be freely chosen by the user.
     * @type {string}
     * @memberof BitmovinResource
     */
    description?: string;

    /**
     * Creation timestamp expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof BitmovinResource
     */
    createdAt?: Date;

    /**
     * Modified timestamp expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof BitmovinResource
     */
    modifiedAt?: Date;

    /**
     * User-specific meta data. This can hold anything.
     * @type {{ [key: string]: any; }}
     * @memberof BitmovinResource
     */
    customData?: { [key: string]: any; };

}
