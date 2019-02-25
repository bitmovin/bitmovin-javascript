import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface FtpInput
 */
export default interface FtpInput extends Input {
    /**
     * Host URL or IP of the FTP server
     * @type {string}
     * @memberof FtpInput
     */
    host: string;

    /**
     * Port to use, standard for FTP: 21
     * @type {number}
     * @memberof FtpInput
     */
    port?: number;

    /**
     * Use passive mode. Default is true.
     * @type {boolean}
     * @memberof FtpInput
     */
    passive?: boolean;

    /**
     * Your FTP Username
     * @type {string}
     * @memberof FtpInput
     */
    username?: string;

    /**
     * Your FTP password
     * @type {string}
     * @memberof FtpInput
     */
    password?: string;

    /**
     * Ensure that connections originate from the declared ftp host. Default is true.
     * @type {boolean}
     * @memberof FtpInput
     */
    remoteVerificationEnabled?: boolean;

}
