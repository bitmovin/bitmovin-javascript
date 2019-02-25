import LiveEncodingStatsEventDetails from './LiveEncodingStatsEventDetails';

/**
 * @export
 * @interface LiveEncodingStatsEvent
 */
export default interface LiveEncodingStatsEvent {
    /**
     * Timestamp of the event expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof LiveEncodingStatsEvent
     */
    time: Date;

    /**
     * @type {LiveEncodingStatsEventDetails}
     * @memberof LiveEncodingStatsEvent
     */
    details: LiveEncodingStatsEventDetails;

}
