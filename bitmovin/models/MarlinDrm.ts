import Drm from './Drm';
import DrmType from './DrmType';
import EncodingOutput from './EncodingOutput';

/**
 * @export
 * @interface MarlinDrm
 */
export default interface MarlinDrm extends Drm {
    /**
     * 16 byte key in hex (32 characters)
     * @type {string}
     * @memberof MarlinDrm
     */
    key: string;

    /**
     * 16 byte key in hex (32 characters)
     * @type {string}
     * @memberof MarlinDrm
     */
    kid: string;

}
