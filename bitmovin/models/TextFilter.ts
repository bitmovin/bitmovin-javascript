import Filter from './Filter';
import FilterType from './FilterType';
import TextFilterFont from './TextFilterFont';

/**
 * Only one of those properties may be set: fontSize, fontSizeExpression.
 * @export
 * @interface TextFilter
 */
export default interface TextFilter extends Filter {
    /**
     * @type {TextFilterFont}
     * @memberof TextFilter
     */
    font?: TextFilterFont;

    /**
     * If set to true a box is drawn around the text using the background color.
     * @type {boolean}
     * @memberof TextFilter
     */
    box?: boolean;

    /**
     * The width of the box drawn around the text.
     * @type {number}
     * @memberof TextFilter
     */
    boxBorderWidth?: number;

    /**
     * The background color to be used for drawing the box.
     * @type {string}
     * @memberof TextFilter
     */
    boxColor?: string;

    /**
     * Line spacing of the border around the box in pixels
     * @type {number}
     * @memberof TextFilter
     */
    lineSpacing?: number;

    /**
     * Width of the border around the text
     * @type {number}
     * @memberof TextFilter
     */
    borderWidth?: number;

    /**
     * If set to true, it will fix text coordinates to avoid clipping if necessary
     * @type {boolean}
     * @memberof TextFilter
     */
    fixBounds?: boolean;

    /**
     * The color to be used to draw the text
     * @type {string}
     * @memberof TextFilter
     */
    fontColor?: string;

    /**
     * Font size to be used to draw the text
     * @type {number}
     * @memberof TextFilter
     */
    fontSize?: number;

    /**
     * An expression for the Font size. Either fontSize or fontSizeExpression can be set at the same time. The following variables are valid: main_h, h, H for input height and main_w, w, W for the input_width
     * @type {string}
     * @memberof TextFilter
     */
    fontSizeExpression?: string;

    /**
     * If set, alpha blending for the text is applied. Values are valid between 0.0 and 1.0.
     * @type {number}
     * @memberof TextFilter
     */
    alpha?: number;

    /**
     * Color of the shadow
     * @type {string}
     * @memberof TextFilter
     */
    shadowColor?: string;

    /**
     * X offset of the shadow
     * @type {number}
     * @memberof TextFilter
     */
    shadowX?: number;

    /**
     * Y offset of the shadow
     * @type {number}
     * @memberof TextFilter
     */
    shadowY?: number;

    /**
     * If set, the timecode representation in \"hh:mm:ss[:;.]ff\" format will be applied
     * @type {string}
     * @memberof TextFilter
     */
    timecode?: string;

    /**
     * String to be drawn
     * @type {string}
     * @memberof TextFilter
     */
    text?: string;

    /**
     * X position of the text. Also an expression can be used. The following variables are valid: line_h - height of each text line; main_h - input height; main_w - input width; n - number of input frame; text_h - Text height; text_w - Text width
     * @type {string}
     * @memberof TextFilter
     */
    x: string;

    /**
     * Y position of the text. Also an expression can be used. The following variables are valid: line_h - height of each text line; main_h - input height; main_w - input width; n - number of input frame; text_h - Text height; text_w - Text width
     * @type {string}
     * @memberof TextFilter
     */
    y: string;

}
