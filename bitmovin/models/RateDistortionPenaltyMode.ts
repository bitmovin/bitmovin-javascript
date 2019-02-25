/**
 * Penalty for 32x32 intra transfer units in non-I slices.
 * @export
 * @enum {string}
 */
enum RateDistortionPenaltyMode {
    DISABLED = 'DISABLED',
    NORMAL = 'NORMAL',
    MAXIMUM = 'MAXIMUM'
}

export default RateDistortionPenaltyMode;

