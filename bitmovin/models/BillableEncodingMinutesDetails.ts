
/**
 * @export
 * @interface BillableEncodingMinutesDetails
 */
export default interface BillableEncodingMinutesDetails {
    /**
     * Only set if resolution information is not present.
     * @type {number}
     * @memberof BillableEncodingMinutesDetails
     */
    UNKNOWN?: number;

    /**
     * Billable minutes for audio. Available if stream is an audio stream.
     * @type {number}
     * @memberof BillableEncodingMinutesDetails
     */
    AUDIO?: number;

    /**
     * Billable minutes for SD resolutions.
     * @type {number}
     * @memberof BillableEncodingMinutesDetails
     */
    SD?: number;

    /**
     * Billable minutes for HD resolutions.
     * @type {number}
     * @memberof BillableEncodingMinutesDetails
     */
    HD?: number;

    /**
     * Billable minutes for UHD resolutions.
     * @type {number}
     * @memberof BillableEncodingMinutesDetails
     */
    UHD?: number;

}
