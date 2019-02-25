import AclEntry from './AclEntry';
import Output from './Output';
import OutputType from './OutputType';
import TransferVersion from './TransferVersion';

/**
 * @export
 * @interface FtpOutput
 */
export default interface FtpOutput extends Output {
    /**
     * Host URL or IP of the FTP server
     * @type {string}
     * @memberof FtpOutput
     */
    host: string;

    /**
     * Port to use, standard for FTP: 21
     * @type {number}
     * @memberof FtpOutput
     */
    port?: number;

    /**
     * Use passive mode. Default is true.
     * @type {boolean}
     * @memberof FtpOutput
     */
    passive?: boolean;

    /**
     * Your FTP Username
     * @type {string}
     * @memberof FtpOutput
     */
    username?: string;

    /**
     * Your FTP password
     * @type {string}
     * @memberof FtpOutput
     */
    password?: string;

    /**
     * Controls which transfer version should be used
     * @type {TransferVersion}
     * @memberof FtpOutput
     */
    transferVersion?: TransferVersion;

    /**
     * Restrict maximum concurrent connections. Requires at least version 1.1.0.
     * @type {number}
     * @memberof FtpOutput
     */
    maxConcurrentConnections?: number;

}
