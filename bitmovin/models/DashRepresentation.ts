import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface DashRepresentation
 */
export default interface DashRepresentation extends BitmovinResponse {
    /**
     * UUID of an encoding
     * @type {string}
     * @memberof DashRepresentation
     */
    encodingId: string;

    /**
     * UUID of a muxing
     * @type {string}
     * @memberof DashRepresentation
     */
    muxingId: string;

}
