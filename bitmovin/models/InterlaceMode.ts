/**
 * How to interleave the input frames
 * @export
 * @enum {string}
 */
enum InterlaceMode {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
    DROP_EVEN = 'DROP_EVEN',
    DROP_ODD = 'DROP_ODD',
    PAD = 'PAD',
    INTERLACE_X2 = 'INTERLACE_X2',
    MERGE = 'MERGE',
    MERGE_X2 = 'MERGE_X2'
}

export default InterlaceMode;

