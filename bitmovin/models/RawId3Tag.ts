import Id3Tag from './Id3Tag';
import Id3TagPositionMode from './Id3TagPositionMode';
import Id3TagType from './Id3TagType';

/**
 * @export
 * @interface RawId3Tag
 */
export default interface RawId3Tag extends Id3Tag {
    /**
     * Base64 Encoded Data
     * @type {string}
     * @memberof RawId3Tag
     */
    bytes: string;

}
