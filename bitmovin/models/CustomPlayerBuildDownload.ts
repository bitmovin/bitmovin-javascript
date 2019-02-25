
/**
 * Custom player download information
 * @export
 * @interface CustomPlayerBuildDownload
 */
export default interface CustomPlayerBuildDownload {
    /**
     * The link to download the custom built player
     * @type {string}
     * @memberof CustomPlayerBuildDownload
     */
    downloadLink: string;

    /**
     * Until this date the download link is valid and can be downloaded.
     * @type {Date}
     * @memberof CustomPlayerBuildDownload
     */
    expiresAt: Date;

}
