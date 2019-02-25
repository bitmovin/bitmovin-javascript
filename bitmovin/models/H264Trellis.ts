/**
 * Enables or disables Trellis quantization. NOTE: This requires cabac
 * @export
 * @enum {string}
 */
enum H264Trellis {
    DISABLED = 'DISABLED',
    ENABLED_FINAL_MB = 'ENABLED_FINAL_MB',
    ENABLED_ALL = 'ENABLED_ALL'
}

export default H264Trellis;

