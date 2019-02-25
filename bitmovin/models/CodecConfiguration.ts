import BitmovinResource from './BitmovinResource';
import CodecConfigType from './CodecConfigType';

/**
 * @export
 * @interface CodecConfiguration
 */
export default interface CodecConfiguration extends BitmovinResource {
    /**
     * The type of the codec configuration
     * @type {CodecConfigType}
     * @memberof CodecConfiguration
     */
    type?: CodecConfigType;

}
