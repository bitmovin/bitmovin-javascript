/**
 * Override the color range detected in the input file. If not set the input color range will be automatically detected if possible.
 * @export
 * @enum {string}
 */
enum InputColorRange {
    UNSPECIFIED = 'UNSPECIFIED',
    MPEG = 'MPEG',
    JPEG = 'JPEG'
}

export default InputColorRange;

