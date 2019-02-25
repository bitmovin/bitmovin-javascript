import BitmovinResource from './BitmovinResource';
import PositionMode from './PositionMode';

/**
 * @export
 * @interface CustomTag
 */
export default interface CustomTag extends BitmovinResource {
    /**
     * The positioning mode that should be used when inserting the placement opportunity
     * @type {PositionMode}
     * @memberof CustomTag
     */
    positionMode: PositionMode;

    /**
     * Id of keyframe where the custom tag should be inserted. Required, when KEYFRAME is selected as position mode.
     * @type {string}
     * @memberof CustomTag
     */
    keyframeId?: string;

    /**
     * Time in seconds where the custom tag should be inserted. Required, when TIME is selected as position mode.
     * @type {number}
     * @memberof CustomTag
     */
    time?: number;

    /**
     * The custom tag will be inserted before the specified segment. Required, when SEGMENT is selected as position mode.
     * @type {number}
     * @memberof CustomTag
     */
    segment?: number;

    /**
     * The data to be contained in the custom tag.
     * @type {string}
     * @memberof CustomTag
     */
    data: string;

}
