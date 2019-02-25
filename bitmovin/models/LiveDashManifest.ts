
/**
 * @export
 * @interface LiveDashManifest
 */
export default interface LiveDashManifest {
    /**
     * Dash manifest ids
     * @type {string}
     * @memberof LiveDashManifest
     */
    manifestId: string;

    /**
     * Timeshift in seconds
     * @type {number}
     * @memberof LiveDashManifest
     */
    timeshift?: number;

    /**
     * Live edge offset in seconds
     * @type {number}
     * @memberof LiveDashManifest
     */
    liveEdgeOffset?: number;

}
