/**
 * Enable adaptive quantization for sub-CTUs. This parameter specifies the minimum CU size at which QP can be adjusted.
 * @export
 * @enum {string}
 */
enum QuantizationGroupSize {
    QGS_8x8 = 'QGS_8x8',
    QGS_16x16 = 'QGS_16x16',
    QGS_32x32 = 'QGS_32x32',
    QGS_64x64 = 'QGS_64x64'
}

export default QuantizationGroupSize;

