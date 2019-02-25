
/**
 * @export
 * @interface ReuploadSettings
 */
export default interface ReuploadSettings {
    /**
     * Interval in seconds to reupload the DASH manifest (minimum value: 30)
     * @type {number}
     * @memberof ReuploadSettings
     */
    dashManifestInterval?: number;

    /**
     * Interval in seconds to reupload the HLS master file. This is currently not used, as the master file will always be uploaded when one of the playlist files has changed (minimum value: 30)
     * @type {number}
     * @memberof ReuploadSettings
     */
    hlsManifestInterval?: number;

    /**
     * The interval in seconds to reupload the init file for segmented muxings (e.g. fMP4, WebM) (minimum value: 30)
     * @type {number}
     * @memberof ReuploadSettings
     */
    muxingInitFileInterval?: number;

}
