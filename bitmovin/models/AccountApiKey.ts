import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface AccountApiKey
 */
export default interface AccountApiKey extends BitmovinResource {
    /**
     * Key value for authentication with the Bitmovin API
     * @type {string}
     * @memberof AccountApiKey
     */
    value: string;

}
