/**
 * Enable evaluation of transform skip (bypass DCT but still use quantization) coding for 4x4 TU coded blocks.
 * @export
 * @enum {string}
 */
enum TransformSkipMode {
    NONE = 'NONE',
    NORMAL = 'NORMAL',
    FAST = 'FAST'
}

export default TransformSkipMode;

