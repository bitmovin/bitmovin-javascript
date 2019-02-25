import AclEntry from './AclEntry';
import AwsCloudRegion from './AwsCloudRegion';
import Output from './Output';
import OutputType from './OutputType';
import S3SignatureVersion from './S3SignatureVersion';

/**
 * @export
 * @interface S3Output
 */
export default interface S3Output extends Output {
    /**
     * Amazon S3 bucket name
     * @type {string}
     * @memberof S3Output
     */
    bucketName: string;

    /**
     * Amazon S3 access key
     * @type {string}
     * @memberof S3Output
     */
    accessKey: string;

    /**
     * Amazon S3 secret key
     * @type {string}
     * @memberof S3Output
     */
    secretKey: string;

    /**
     * If set a user defined tag (x-amz-meta-) with that key will be used to store the MD5 hash of the file.
     * @type {string}
     * @memberof S3Output
     */
    md5MetaTag?: string;

    /**
     * @type {AwsCloudRegion}
     * @memberof S3Output
     */
    cloudRegion?: AwsCloudRegion;

    /**
     * @type {S3SignatureVersion}
     * @memberof S3Output
     */
    signatureVersion?: S3SignatureVersion;

}
