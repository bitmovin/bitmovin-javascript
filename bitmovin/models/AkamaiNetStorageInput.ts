import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface AkamaiNetStorageInput
 */
export default interface AkamaiNetStorageInput extends Input {
    /**
     * Host to use for Akamai NetStorage transfers
     * @type {string}
     * @memberof AkamaiNetStorageInput
     */
    host: string;

    /**
     * Your Akamai NetStorage Username
     * @type {string}
     * @memberof AkamaiNetStorageInput
     */
    username: string;

    /**
     * Your Akamai NetStorage password
     * @type {string}
     * @memberof AkamaiNetStorageInput
     */
    password: string;

}
