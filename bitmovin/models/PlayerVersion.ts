import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface PlayerVersion
 */
export default interface PlayerVersion extends BitmovinResponse {
    /**
     * Version of the Player
     * @type {string}
     * @memberof PlayerVersion
     */
    version?: string;

    /**
     * URL of the specified player
     * @type {string}
     * @memberof PlayerVersion
     */
    cdnUrl?: string;

    /**
     * Download URL of the specified player package
     * @type {string}
     * @memberof PlayerVersion
     */
    downloadUrl?: string;

    /**
     * Creation timestamp expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof PlayerVersion
     */
    createdAt?: Date;

}
