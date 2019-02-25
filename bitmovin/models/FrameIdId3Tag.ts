import Id3Tag from './Id3Tag';
import Id3TagPositionMode from './Id3TagPositionMode';
import Id3TagType from './Id3TagType';

/**
 * @export
 * @interface FrameIdId3Tag
 */
export default interface FrameIdId3Tag extends Id3Tag {
    /**
     * Base64 Encoded Data
     * @type {string}
     * @memberof FrameIdId3Tag
     */
    bytes: string;

    /**
     * 4 character long Frame ID
     * @type {string}
     * @memberof FrameIdId3Tag
     */
    frameId: string;

}
