import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface ApiKey
 */
export default interface ApiKey extends BitmovinResponse {
    /**
     * @type {string}
     * @memberof ApiKey
     */
    keyValue?: string;

}
