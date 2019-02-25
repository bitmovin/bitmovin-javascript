import DashRepresentation from './DashRepresentation';

/**
 * @export
 * @interface DashSidecarRepresentation
 */
export default interface DashSidecarRepresentation extends DashRepresentation {
    /**
     * Sidecar Id
     * @type {string}
     * @memberof DashSidecarRepresentation
     */
    sidecarId: string;

}
