/**
 * Specifies the method how fields are converted to frames
 * @export
 * @enum {string}
 */
enum DeinterlaceMode {
    FRAME = 'FRAME',
    FIELD = 'FIELD',
    FRAME_NOSPATIAL = 'FRAME_NOSPATIAL',
    FIELD_NOSPATIAL = 'FIELD_NOSPATIAL'
}

export default DeinterlaceMode;

