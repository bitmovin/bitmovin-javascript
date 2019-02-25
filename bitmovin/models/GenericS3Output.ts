import AclEntry from './AclEntry';
import Output from './Output';
import OutputType from './OutputType';
import S3SignatureVersion from './S3SignatureVersion';

/**
 * @export
 * @interface GenericS3Output
 */
export default interface GenericS3Output extends Output {
    /**
     * Your generic S3 access key
     * @type {string}
     * @memberof GenericS3Output
     */
    accessKey: string;

    /**
     * Your generic S3 secret key
     * @type {string}
     * @memberof GenericS3Output
     */
    secretKey: string;

    /**
     * Name of the bucket
     * @type {string}
     * @memberof GenericS3Output
     */
    bucketName: string;

    /**
     * The Generic S3 server hostname (or IP address)
     * @type {string}
     * @memberof GenericS3Output
     */
    host: string;

    /**
     * The port on which the Generic S3 server is running on (if not provided 8000 will be used)
     * @type {number}
     * @memberof GenericS3Output
     */
    port?: number;

    /**
     * Controls whether SSL is used or not
     * @type {boolean}
     * @memberof GenericS3Output
     */
    ssl?: boolean;

    /**
     * Specifies the method used for authentication
     * @type {S3SignatureVersion}
     * @memberof GenericS3Output
     */
    signatureVersion?: S3SignatureVersion;

}
