import CencFairPlay from './CencFairPlay';
import CencMarlin from './CencMarlin';
import CencPlayReady from './CencPlayReady';
import CencWidevine from './CencWidevine';
import Drm from './Drm';
import DrmType from './DrmType';
import EncodingOutput from './EncodingOutput';
import EncryptionMode from './EncryptionMode';
import IvSize from './IvSize';

/**
 * @export
 * @interface CencDrm
 */
export default interface CencDrm extends Drm {
    /**
     * 16 byte encryption key, 32 hexadecimal characters
     * @type {string}
     * @memberof CencDrm
     */
    key: string;

    /**
     * 16 byte encryption key id. Required for any other DRM but FairPlay
     * @type {string}
     * @memberof CencDrm
     */
    kid?: string;

    /**
     * The encryption method to use. Default is `CTR`
     * @type {EncryptionMode}
     * @memberof CencDrm
     */
    encryptionMode: EncryptionMode;

    /**
     * Size of the initialization vector
     * @type {IvSize}
     * @memberof CencDrm
     */
    ivSize?: IvSize;

    /**
     * Enables compatibility with the Protected Interoperable File Format (PIFF) specification
     * @type {boolean}
     * @memberof CencDrm
     */
    enablePiffCompatibility?: boolean;

    /**
     * Configuration for Widevine DRM
     * @type {CencWidevine}
     * @memberof CencDrm
     */
    widevine?: CencWidevine;

    /**
     * Configuration for PlayReady DRM
     * @type {CencPlayReady}
     * @memberof CencDrm
     */
    playReady?: CencPlayReady;

    /**
     * Configuration for Marlin DRM
     * @type {CencMarlin}
     * @memberof CencDrm
     */
    marlin?: CencMarlin;

    /**
     * Configuration for FairPlay DRM
     * @type {CencFairPlay}
     * @memberof CencDrm
     */
    fairPlay?: CencFairPlay;

}
