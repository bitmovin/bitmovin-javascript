import BitmovinResource from './BitmovinResource';
import EncodingOutput from './EncodingOutput';
import ThumbnailUnit from './ThumbnailUnit';

/**
 * @export
 * @interface Thumbnail
 */
export default interface Thumbnail extends BitmovinResource {
    /**
     * Height of the thumbnail
     * @type {number}
     * @memberof Thumbnail
     */
    height: number;

    /**
     *  Pattern which describes the thumbnail filenames. For example with thumbnail-%number%.png as pattern and 3 positions: thumbnail-3.png, thumbnail-5.png and thumbnail-25_5.png. (The number represents the position in the source video in seconds, in the previous example the first filename represents the thumbnail at 3s, the second one at 5s and the third one at 25.5s)
     * @type {string}
     * @memberof Thumbnail
     */
    pattern?: string;

    /**
     * Position in the unit where the thumbnail should be created from.
     * @type {Array<number>}
     * @memberof Thumbnail
     */
    positions: Array<number>;

    /**
     * @type {Array<EncodingOutput>}
     * @memberof Thumbnail
     */
    outputs?: Array<EncodingOutput>;

    /**
     * @type {ThumbnailUnit}
     * @memberof Thumbnail
     */
    unit?: ThumbnailUnit;

}
