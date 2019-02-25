import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface HttpsInput
 */
export default interface HttpsInput extends Input {
    /**
     * Host Url or IP of the HTTP server
     * @type {string}
     * @memberof HttpsInput
     */
    host: string;

    /**
     * Basic Auth Username, if required
     * @type {string}
     * @memberof HttpsInput
     */
    username?: string;

    /**
     * Basic Auth Password, if required
     * @type {string}
     * @memberof HttpsInput
     */
    password?: string;

    /**
     * Custom Port
     * @type {number}
     * @memberof HttpsInput
     */
    port?: number;

}
