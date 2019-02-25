import Input from './Input';
import InputType from './InputType';
import S3SignatureVersion from './S3SignatureVersion';

/**
 * @export
 * @interface GenericS3Input
 */
export default interface GenericS3Input extends Input {
    /**
     * Your generic S3 bucket name
     * @type {string}
     * @memberof GenericS3Input
     */
    bucketName: string;

    /**
     * The generic S3 server hostname (or IP address)
     * @type {string}
     * @memberof GenericS3Input
     */
    host: string;

    /**
     * The port on which the generic S3 server is running on (if not provided 8000 will be used)
     * @type {number}
     * @memberof GenericS3Input
     */
    port?: number;

    /**
     * Controls whether SSL is used or not
     * @type {boolean}
     * @memberof GenericS3Input
     */
    ssl?: boolean;

    /**
     * Specifies the method used for authentication
     * @type {S3SignatureVersion}
     * @memberof GenericS3Input
     */
    signatureVersion?: S3SignatureVersion;

    /**
     * Your generic S3 access key
     * @type {string}
     * @memberof GenericS3Input
     */
    accessKey: string;

    /**
     * Your generic S3 secret key
     * @type {string}
     * @memberof GenericS3Input
     */
    secretKey: string;

}
