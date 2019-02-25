/**
 * Specifies which field of an interlaced frame is assumed to be the first one
 * @export
 * @enum {string}
 */
enum PictureFieldParity {
    AUTO = 'AUTO',
    TOP_FIELD_FIRST = 'TOP_FIELD_FIRST',
    BOTTOM_FIELD_FIRST = 'BOTTOM_FIELD_FIRST'
}

export default PictureFieldParity;

