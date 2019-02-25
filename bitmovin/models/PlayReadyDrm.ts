import Drm from './Drm';
import DrmType from './DrmType';
import EncodingOutput from './EncodingOutput';
import PlayReadyEncryptionMethod from './PlayReadyEncryptionMethod';

/**
 * @export
 * @interface PlayReadyDrm
 */
export default interface PlayReadyDrm extends Drm {
    /**
     * 16 byte encryption key, 32 hexadecimal characters. Either key or keySeed is required.
     * @type {string}
     * @memberof PlayReadyDrm
     */
    key?: string;

    /**
     * Key seed to generate key. Either key or keySeed is required.
     * @type {string}
     * @memberof PlayReadyDrm
     */
    keySeed?: string;

    /**
     * URL of the license server
     * @type {string}
     * @memberof PlayReadyDrm
     */
    laUrl?: string;

    /**
     * @type {PlayReadyEncryptionMethod}
     * @memberof PlayReadyDrm
     */
    method?: PlayReadyEncryptionMethod;

    /**
     * Key identifier
     * @type {string}
     * @memberof PlayReadyDrm
     */
    kid?: string;

}
