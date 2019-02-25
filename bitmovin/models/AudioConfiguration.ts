import CodecConfigType from './CodecConfigType';
import CodecConfiguration from './CodecConfiguration';

/**
 * @export
 * @interface AudioConfiguration
 */
export default interface AudioConfiguration extends CodecConfiguration {
    /**
     * Target bitrate for the encoded audio in bps
     * @type {number}
     * @memberof AudioConfiguration
     */
    bitrate: number;

    /**
     * Audio sampling rate Hz
     * @type {number}
     * @memberof AudioConfiguration
     */
    rate?: number;

}
