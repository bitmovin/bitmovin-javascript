import DashMuxingType from './DashMuxingType';
import DashRepresentation from './DashRepresentation';

/**
 * @export
 * @interface DashSegmentedRepresentation
 */
export default interface DashSegmentedRepresentation extends DashRepresentation {
    /**
     * @type {DashMuxingType}
     * @memberof DashSegmentedRepresentation
     */
    type: DashMuxingType;

    /**
     * Path to segments
     * @type {string}
     * @memberof DashSegmentedRepresentation
     */
    segmentPath: string;

    /**
     * Number of the first segment
     * @type {number}
     * @memberof DashSegmentedRepresentation
     */
    startSegmentNumber?: number;

    /**
     * Number of the last segment. Default is the last one that was encoded
     * @type {number}
     * @memberof DashSegmentedRepresentation
     */
    endSegmentNumber?: number;

    /**
     * Id of the Keyframe to start with
     * @type {string}
     * @memberof DashSegmentedRepresentation
     */
    startKeyframeId?: string;

    /**
     * Id of the Keyframe to end with
     * @type {string}
     * @memberof DashSegmentedRepresentation
     */
    endKeyframeId?: string;

}
