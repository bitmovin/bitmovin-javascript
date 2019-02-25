import AesEncryptionMethod from './AesEncryptionMethod';
import Drm from './Drm';
import DrmType from './DrmType';
import EncodingOutput from './EncodingOutput';

/**
 * @export
 * @interface AesEncryptionDrm
 */
export default interface AesEncryptionDrm extends Drm {
    /**
     * 16 byte Encryption key, 32 hexadecimal characters
     * @type {string}
     * @memberof AesEncryptionDrm
     */
    key: string;

    /**
     * 16 byte initialization vector
     * @type {string}
     * @memberof AesEncryptionDrm
     */
    iv?: string;

    /**
     * Path relative to the output for referencing in the manifest. If this value is not set the key file will be written automatically to the output folder.
     * @type {string}
     * @memberof AesEncryptionDrm
     */
    keyFileUri?: string;

    /**
     * @type {AesEncryptionMethod}
     * @memberof AesEncryptionDrm
     */
    method: AesEncryptionMethod;

}
