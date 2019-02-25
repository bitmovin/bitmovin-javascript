
/**
 * @export
 * @interface CencPlayReady
 */
export default interface CencPlayReady {
    /**
     * Url of the license server. Either the laUrl or the pssh needs to be provided.
     * @type {string}
     * @memberof CencPlayReady
     */
    laUrl?: string;

    /**
     * Base64 encoded pssh payload.
     * @type {string}
     * @memberof CencPlayReady
     */
    pssh?: string;

}
