import DashFmp4Representation from './DashFmp4Representation';
import DashMuxingType from './DashMuxingType';

/**
 * @export
 * @interface DashFmp4DrmRepresentation
 */
export default interface DashFmp4DrmRepresentation extends DashFmp4Representation {
    /**
     * DRM Id
     * @type {string}
     * @memberof DashFmp4DrmRepresentation
     */
    drmId: string;

}
