/**
 * Override the color space detected in the input file. If not set the input color space will be automatically detected if possible.
 * @export
 * @enum {string}
 */
enum InputColorSpace {
    UNSPECIFIED = 'UNSPECIFIED',
    RGB = 'RGB',
    BT709 = 'BT709',
    FCC = 'FCC',
    BT470BG = 'BT470BG',
    SMPTE170M = 'SMPTE170M',
    SMPTE240M = 'SMPTE240M',
    YCGCO = 'YCGCO',
    YCOCG = 'YCOCG',
    BT2020_NCL = 'BT2020_NCL',
    BT2020_CL = 'BT2020_CL',
    SMPTE2085 = 'SMPTE2085'
}

export default InputColorSpace;

