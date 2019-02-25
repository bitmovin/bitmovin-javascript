/**
 * Enables early exit from transfer unit depth recursion, for inter coded blocks.
 * @export
 * @enum {string}
 */
enum LimitTransferUnitDepthRecursionMode {
    DISABLED = 'DISABLED',
    LEVEL_1 = 'LEVEL_1',
    LEVEL_2 = 'LEVEL_2',
    LEVEL_3 = 'LEVEL_3',
    LEVEL_4 = 'LEVEL_4'
}

export default LimitTransferUnitDepthRecursionMode;

