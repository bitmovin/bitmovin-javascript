/**
 * Specifies whether keyframes should be placed at fixed intervals or the encoder may determine optimal placement automatically
 * @export
 * @enum {string}
 */
enum Av1KeyPlacementMode {
    AUTO = 'AUTO',
    FIXED = 'FIXED',
    DISABLED = 'DISABLED'
}

export default Av1KeyPlacementMode;

