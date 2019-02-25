import Drm from './Drm';
import DrmType from './DrmType';
import EncodingOutput from './EncodingOutput';

/**
 * @export
 * @interface FairPlayDrm
 */
export default interface FairPlayDrm extends Drm {
    /**
     * 16 byte Encryption key, 32 hexadecimal characters
     * @type {string}
     * @memberof FairPlayDrm
     */
    key: string;

    /**
     * 16 byte initialization vector
     * @type {string}
     * @memberof FairPlayDrm
     */
    iv: string;

    /**
     * Url of the licensing server
     * @type {string}
     * @memberof FairPlayDrm
     */
    uri?: string;

}
