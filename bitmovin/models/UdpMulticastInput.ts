import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface UdpMulticastInput
 */
export default interface UdpMulticastInput extends Input {
    /**
     * Host name or IP address to use
     * @type {string}
     * @memberof UdpMulticastInput
     */
    host: string;

    /**
     * Port to use
     * @type {number}
     * @memberof UdpMulticastInput
     */
    port: number;

}
