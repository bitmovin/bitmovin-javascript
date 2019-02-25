import Drm from './Drm';
import DrmType from './DrmType';
import EncodingOutput from './EncodingOutput';

/**
 * @export
 * @interface ClearKeyDrm
 */
export default interface ClearKeyDrm extends Drm {
    /**
     * 16 byte encryption key, 32 hexadecimal characters
     * @type {string}
     * @memberof ClearKeyDrm
     */
    key: string;

    /**
     * 16 byte key id
     * @type {string}
     * @memberof ClearKeyDrm
     */
    kid: string;

}
