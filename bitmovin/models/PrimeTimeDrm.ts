import Drm from './Drm';
import DrmType from './DrmType';
import EncodingOutput from './EncodingOutput';

/**
 * @export
 * @interface PrimeTimeDrm
 */
export default interface PrimeTimeDrm extends Drm {
    /**
     * 16 byte Encryption key, 32 hexadecimal characters
     * @type {string}
     * @memberof PrimeTimeDrm
     */
    key: string;

    /**
     * 16 byte Key id, 32 hexadecimal characters
     * @type {string}
     * @memberof PrimeTimeDrm
     */
    kid: string;

    /**
     * Base 64 Encoded
     * @type {string}
     * @memberof PrimeTimeDrm
     */
    pssh: string;

}
