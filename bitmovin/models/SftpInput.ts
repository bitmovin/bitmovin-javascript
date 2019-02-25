import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface SftpInput
 */
export default interface SftpInput extends Input {
    /**
     * Host Url or IP of the SFTP server
     * @type {string}
     * @memberof SftpInput
     */
    host: string;

    /**
     * Port to use, standard for SFTP: 22
     * @type {number}
     * @memberof SftpInput
     */
    port?: number;

    /**
     * Use passive mode. Default is true.
     * @type {boolean}
     * @memberof SftpInput
     */
    passive?: boolean;

    /**
     * Your SFTP Username
     * @type {string}
     * @memberof SftpInput
     */
    username?: string;

    /**
     * Your SFTP password
     * @type {string}
     * @memberof SftpInput
     */
    password?: string;

}
