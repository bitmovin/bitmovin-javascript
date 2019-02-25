import LiveEncodingEventName from './LiveEncodingEventName';

/**
 * @export
 * @interface LiveEncodingStatsEventDetails
 */
export default interface LiveEncodingStatsEventDetails {
    /**
     * @type {LiveEncodingEventName}
     * @memberof LiveEncodingStatsEventDetails
     */
    eventName: LiveEncodingEventName;

    /**
     * The Audio/Video Drift in seconds. The drift was corrected by the RESYNCING event (occurs at event: RESYNCING)
     * @type {number}
     * @memberof LiveEncodingStatsEventDetails
     */
    avDriftInSeconds?: number;

    /**
     * The time the stream was in idle state in seconds (occurs at event: IDLE)
     * @type {number}
     * @memberof LiveEncodingStatsEventDetails
     */
    idleDurationInSeconds?: number;

    /**
     * An optional error message, when the event is in error state (occurs at event: ERROR)
     * @type {string}
     * @memberof LiveEncodingStatsEventDetails
     */
    errorMessage?: string;

}
