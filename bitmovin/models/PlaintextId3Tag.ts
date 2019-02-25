import Id3Tag from './Id3Tag';
import Id3TagPositionMode from './Id3TagPositionMode';
import Id3TagType from './Id3TagType';

/**
 * @export
 * @interface PlaintextId3Tag
 */
export default interface PlaintextId3Tag extends Id3Tag {
    /**
     * Plain Text Data
     * @type {string}
     * @memberof PlaintextId3Tag
     */
    text: string;

    /**
     * 4 character long Frame ID
     * @type {string}
     * @memberof PlaintextId3Tag
     */
    frameId: string;

}
