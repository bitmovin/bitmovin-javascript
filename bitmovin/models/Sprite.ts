import BitmovinResource from './BitmovinResource';
import EncodingOutput from './EncodingOutput';
import SpriteUnit from './SpriteUnit';

/**
 * @export
 * @interface Sprite
 */
export default interface Sprite extends BitmovinResource {
    /**
     * Height of one thumbnail
     * @type {number}
     * @memberof Sprite
     */
    height: number;

    /**
     * Width of one thumbnail
     * @type {number}
     * @memberof Sprite
     */
    width: number;

    /**
     * @type {SpriteUnit}
     * @memberof Sprite
     */
    unit?: SpriteUnit;

    /**
     * Distance in the given unit between a screenshot
     * @type {number}
     * @memberof Sprite
     */
    distance?: number;

    /**
     * Name of the sprite image. File extension \".jpg\" or \".png\" is required.
     * @type {string}
     * @memberof Sprite
     */
    spriteName: string;

    /**
     * Filename of the sprite image. If not set, spriteName will be used, but without an extension.
     * @type {string}
     * @memberof Sprite
     */
    fileName?: string;

    /**
     * Filename of the vtt-file. The file-extension \".vtt\" is required.
     * @type {string}
     * @memberof Sprite
     */
    vttName: string;

    /**
     * @type {Array<EncodingOutput>}
     * @memberof Sprite
     */
    outputs?: Array<EncodingOutput>;

    /**
     * Number of images per file. If more images are generated than specified in this value, multiple sprites will be created. You can use the placeholder '%number%' in the spriteName to specify the naming policy.
     * @type {number}
     * @memberof Sprite
     */
    imagesPerFile?: number;

}
