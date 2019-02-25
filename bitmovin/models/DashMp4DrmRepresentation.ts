import DashMp4Representation from './DashMp4Representation';

/**
 * @export
 * @interface DashMp4DrmRepresentation
 */
export default interface DashMp4DrmRepresentation extends DashMp4Representation {
    /**
     * DRM Id
     * @type {string}
     * @memberof DashMp4DrmRepresentation
     */
    drmId: string;

}
