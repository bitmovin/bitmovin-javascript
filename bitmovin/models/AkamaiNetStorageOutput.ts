import AclEntry from './AclEntry';
import Output from './Output';
import OutputType from './OutputType';

/**
 * @export
 * @interface AkamaiNetStorageOutput
 */
export default interface AkamaiNetStorageOutput extends Output {
    /**
     * Host to use for Akamai NetStorage transfers
     * @type {string}
     * @memberof AkamaiNetStorageOutput
     */
    host: string;

    /**
     * Your Akamai NetStorage Username
     * @type {string}
     * @memberof AkamaiNetStorageOutput
     */
    username: string;

    /**
     * Your Akamai NetStorage password
     * @type {string}
     * @memberof AkamaiNetStorageOutput
     */
    password: string;

}
