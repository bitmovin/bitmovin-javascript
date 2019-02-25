/**
 * Set the random access indicator (RAI) on appropriate access units (AUs).
 * @export
 * @enum {string}
 */
enum RaiUnit {
    NONE = 'NONE',
    ALL_PES_PACKETS = 'ALL_PES_PACKETS',
    ACQUISITION_POINT_PACKETS = 'ACQUISITION_POINT_PACKETS',
    ACCORDING_TO_INPUT = 'ACCORDING_TO_INPUT'
}

export default RaiUnit;

