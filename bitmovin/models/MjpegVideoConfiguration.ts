import CodecConfigType from './CodecConfigType';
import CodecConfiguration from './CodecConfiguration';
import PixelFormat from './PixelFormat';

/**
 * @export
 * @interface MjpegVideoConfiguration
 */
export default interface MjpegVideoConfiguration extends CodecConfiguration {
    /**
     * Width of the encoded video
     * @type {number}
     * @memberof MjpegVideoConfiguration
     */
    width?: number;

    /**
     * Height of the encoded video
     * @type {number}
     * @memberof MjpegVideoConfiguration
     */
    height?: number;

    /**
     * Target frame rate of the encoded video!
     * @type {number}
     * @memberof MjpegVideoConfiguration
     */
    rate: number;

    /**
     * The quality scale parameter
     * @type {number}
     * @memberof MjpegVideoConfiguration
     */
    qScale: number;

    /**
     * @type {PixelFormat}
     * @memberof MjpegVideoConfiguration
     */
    pixelFormat?: PixelFormat;

}
