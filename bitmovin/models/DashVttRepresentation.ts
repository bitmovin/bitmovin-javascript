import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface DashVttRepresentation
 */
export default interface DashVttRepresentation extends BitmovinResource {
    /**
     * URL of the referenced VTT file
     * @type {string}
     * @memberof DashVttRepresentation
     */
    vttUrl: string;

}
