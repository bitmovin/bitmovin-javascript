import AclEntry from './AclEntry';
import Output from './Output';
import OutputType from './OutputType';
import TransferVersion from './TransferVersion';

/**
 * @export
 * @interface SftpOutput
 */
export default interface SftpOutput extends Output {
    /**
     * Host Url or IP of the SFTP server
     * @type {string}
     * @memberof SftpOutput
     */
    host: string;

    /**
     * Port to use, standard for SFTP: 22
     * @type {number}
     * @memberof SftpOutput
     */
    port?: number;

    /**
     * Use passive mode. Default is true.
     * @type {boolean}
     * @memberof SftpOutput
     */
    passive?: boolean;

    /**
     * Your SFTP Username
     * @type {string}
     * @memberof SftpOutput
     */
    username?: string;

    /**
     * Your SFTP password
     * @type {string}
     * @memberof SftpOutput
     */
    password?: string;

    /**
     * Controls which transfer version should be used
     * @type {TransferVersion}
     * @memberof SftpOutput
     */
    transferVersion?: TransferVersion;

    /**
     * Restrict maximum concurrent connections. Requires at least version 1.1.0.
     * @type {number}
     * @memberof SftpOutput
     */
    maxConcurrentConnections?: number;

}
