
/**
 * @export
 * @interface LiveHlsManifest
 */
export default interface LiveHlsManifest {
    /**
     * Hls manifest ids
     * @type {string}
     * @memberof LiveHlsManifest
     */
    manifestId: string;

    /**
     * Timeshift in seconds
     * @type {number}
     * @memberof LiveHlsManifest
     */
    timeshift?: number;

}
