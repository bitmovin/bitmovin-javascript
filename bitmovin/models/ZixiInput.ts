import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface ZixiInput
 */
export default interface ZixiInput extends Input {
    /**
     * @type {string}
     * @memberof ZixiInput
     */
    host?: string;

    /**
     * @type {number}
     * @memberof ZixiInput
     */
    port?: number;

    /**
     * @type {string}
     * @memberof ZixiInput
     */
    stream?: string;

    /**
     * @type {string}
     * @memberof ZixiInput
     */
    password?: string;

    /**
     * @type {number}
     * @memberof ZixiInput
     */
    latency?: number;

    /**
     * @type {number}
     * @memberof ZixiInput
     */
    minBitrate?: number;

    /**
     * @type {string}
     * @memberof ZixiInput
     */
    decryptionType?: string;

    /**
     * @type {string}
     * @memberof ZixiInput
     */
    decryptionKey?: string;

}
