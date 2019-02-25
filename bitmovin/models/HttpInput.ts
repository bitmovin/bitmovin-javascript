import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface HttpInput
 */
export default interface HttpInput extends Input {
    /**
     * Host Url or IP of the HTTP server
     * @type {string}
     * @memberof HttpInput
     */
    host: string;

    /**
     * Basic Auth Username, if requiGred
     * @type {string}
     * @memberof HttpInput
     */
    username?: string;

    /**
     * Basic Auth Password, if required
     * @type {string}
     * @memberof HttpInput
     */
    password?: string;

    /**
     * Custom Port
     * @type {number}
     * @memberof HttpInput
     */
    port?: number;

}
