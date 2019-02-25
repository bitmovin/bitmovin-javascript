import DashRepresentation from './DashRepresentation';

/**
 * @export
 * @interface ContentProtection
 */
export default interface ContentProtection extends DashRepresentation {
    /**
     * DRM Id
     * @type {string}
     * @memberof ContentProtection
     */
    drmId: string;

}
