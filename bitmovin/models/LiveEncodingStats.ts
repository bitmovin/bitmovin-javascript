import LiveEncodingStatsEvent from './LiveEncodingStatsEvent';
import LiveEncodingStatus from './LiveEncodingStatus';
import StreamInfos from './StreamInfos';

/**
 * @export
 * @interface LiveEncodingStats
 */
export default interface LiveEncodingStats {
    /**
     * @type {LiveEncodingStatus}
     * @memberof LiveEncodingStats
     */
    status: LiveEncodingStatus;

    /**
     * List of events
     * @type {Array<LiveEncodingStatsEvent>}
     * @memberof LiveEncodingStats
     */
    events?: Array<LiveEncodingStatsEvent>;

    /**
     * List of statistics
     * @type {Array<StreamInfos>}
     * @memberof LiveEncodingStats
     */
    statistics?: Array<StreamInfos>;

}
