import BitmovinResource from './BitmovinResource';
import Id3TagPositionMode from './Id3TagPositionMode';
import Id3TagType from './Id3TagType';

/**
 * @export
 * @interface Id3Tag
 */
export default interface Id3Tag extends BitmovinResource {
    /**
     * Type of the tag
     * @type {Id3TagType}
     * @memberof Id3Tag
     */
    type?: Id3TagType;

    /**
     * @type {Id3TagPositionMode}
     * @memberof Id3Tag
     */
    positionMode?: Id3TagPositionMode;

    /**
     * Number of frame where the Tag should be inserted
     * @type {number}
     * @memberof Id3Tag
     */
    frame?: number;

    /**
     * Time in seconds where the frame should be inserted
     * @type {number}
     * @memberof Id3Tag
     */
    time?: number;

}
