import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface PlayerChannel
 */
export default interface PlayerChannel extends BitmovinResponse {
    /**
     * Name of the resource
     * @type {string}
     * @memberof PlayerChannel
     */
    name?: string;

}
