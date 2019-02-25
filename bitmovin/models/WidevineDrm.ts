import Drm from './Drm';
import DrmType from './DrmType';
import EncodingOutput from './EncodingOutput';

/**
 * @export
 * @interface WidevineDrm
 */
export default interface WidevineDrm extends Drm {
    /**
     * 16 byte Encryption key, 32 hexadecimal characters
     * @type {string}
     * @memberof WidevineDrm
     */
    key: string;

    /**
     * 16 byte Key id, 32 hexadecimal characters
     * @type {string}
     * @memberof WidevineDrm
     */
    kid: string;

    /**
     * Base 64 Encoded
     * @type {string}
     * @memberof WidevineDrm
     */
    pssh: string;

}
