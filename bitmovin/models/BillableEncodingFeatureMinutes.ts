
/**
 * @export
 * @interface BillableEncodingFeatureMinutes
 */
export default interface BillableEncodingFeatureMinutes {
    /**
     * The name of the feature.
     * @type {string}
     * @memberof BillableEncodingFeatureMinutes
     */
    featureType?: string;

    /**
     * Encoded minutes related to this feature.
     * @type {number}
     * @memberof BillableEncodingFeatureMinutes
     */
    encodedMinutes?: number;

    /**
     * The multiplier used for this feature.
     * @type {number}
     * @memberof BillableEncodingFeatureMinutes
     */
    featureMultiplier?: number;

    /**
     * The billable minutes related to this feature.
     * @type {number}
     * @memberof BillableEncodingFeatureMinutes
     */
    billableMinutes?: number;

}
