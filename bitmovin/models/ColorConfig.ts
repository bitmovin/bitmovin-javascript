import ChromaLocation from './ChromaLocation';
import ColorPrimaries from './ColorPrimaries';
import ColorRange from './ColorRange';
import ColorSpace from './ColorSpace';
import ColorTransfer from './ColorTransfer';
import InputColorRange from './InputColorRange';
import InputColorSpace from './InputColorSpace';

/**
 * @export
 * @interface ColorConfig
 */
export default interface ColorConfig {
    /**
     * Copy the chroma location setting from the input source
     * @type {boolean}
     * @memberof ColorConfig
     */
    copyChromaLocationFlag?: boolean;

    /**
     * Copy the color space setting from the input source
     * @type {boolean}
     * @memberof ColorConfig
     */
    copyColorSpaceFlag?: boolean;

    /**
     * Copy the color primaries setting from the input source
     * @type {boolean}
     * @memberof ColorConfig
     */
    copyColorPrimariesFlag?: boolean;

    /**
     * Copy the color range setting from the input source
     * @type {boolean}
     * @memberof ColorConfig
     */
    copyColorRangeFlag?: boolean;

    /**
     * Copy the color transfer setting from the input source
     * @type {boolean}
     * @memberof ColorConfig
     */
    copyColorTransferFlag?: boolean;

    /**
     * The chroma location to be applied
     * @type {ChromaLocation}
     * @memberof ColorConfig
     */
    chromaLocation?: ChromaLocation;

    /**
     * The color space to be applied
     * @type {ColorSpace}
     * @memberof ColorConfig
     */
    colorSpace?: ColorSpace;

    /**
     * The color primaries to be applied
     * @type {ColorPrimaries}
     * @memberof ColorConfig
     */
    colorPrimaries?: ColorPrimaries;

    /**
     * The color range to be applied
     * @type {ColorRange}
     * @memberof ColorConfig
     */
    colorRange?: ColorRange;

    /**
     * The color transfer to be applied
     * @type {ColorTransfer}
     * @memberof ColorConfig
     */
    colorTransfer?: ColorTransfer;

    /**
     * Override the color space detected in the input file. If not set the input color space will be automatically detected if possible.
     * @type {InputColorSpace}
     * @memberof ColorConfig
     */
    inputColorSpace?: InputColorSpace;

    /**
     * Override the color range detected in the input file. If not set the input color range will be automatically detected if possible.
     * @type {InputColorRange}
     * @memberof ColorConfig
     */
    inputColorRange?: InputColorRange;

}
