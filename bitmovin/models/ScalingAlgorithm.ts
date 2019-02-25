/**
 * Determines the algorithm used for scaling
 * @export
 * @enum {string}
 */
enum ScalingAlgorithm {
    FAST_BILINEAR = 'FAST_BILINEAR',
    BILINEAR = 'BILINEAR',
    BICUBIC = 'BICUBIC',
    EXPERIMENTAL = 'EXPERIMENTAL',
    NEAREST_NEIGHBOR = 'NEAREST_NEIGHBOR',
    AVERAGING_AREA = 'AVERAGING_AREA',
    BICUBIC_LUMA_BILINEAR_CHROMA = 'BICUBIC_LUMA_BILINEAR_CHROMA',
    GAUSS = 'GAUSS',
    SINC = 'SINC',
    LANCZOS = 'LANCZOS',
    SPLINE = 'SPLINE'
}

export default ScalingAlgorithm;

