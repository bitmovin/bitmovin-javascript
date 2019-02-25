/**
 * Noise sensitivity (frames to blur).
 * @export
 * @enum {string}
 */
enum Vp8NoiseSensitivity {
    OFF = 'OFF',
    ON_Y_ONLY = 'ON_Y_ONLY',
    ON_YUV = 'ON_YUV',
    ON_YUV_AGGRESSIVE = 'ON_YUV_AGGRESSIVE',
    ADAPTIVE = 'ADAPTIVE'
}

export default Vp8NoiseSensitivity;

