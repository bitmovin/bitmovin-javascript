import AclEntry from './AclEntry';
import AwsCloudRegion from './AwsCloudRegion';
import Output from './Output';
import OutputType from './OutputType';
import S3SignatureVersion from './S3SignatureVersion';

/**
 * @export
 * @interface S3RoleBasedOutput
 */
export default interface S3RoleBasedOutput extends Output {
    /**
     * Amazon S3 bucket name
     * @type {string}
     * @memberof S3RoleBasedOutput
     */
    bucketName: string;

    /**
     * Amazon ARN of the Role that will be assumed for S3 access.
     * @type {string}
     * @memberof S3RoleBasedOutput
     */
    roleArn: string;

    /**
     * If set a user defined tag (x-amz-meta-) with that key will be used to store the MD5 hash of the file.
     * @type {string}
     * @memberof S3RoleBasedOutput
     */
    md5MetaTag?: string;

    /**
     * @type {AwsCloudRegion}
     * @memberof S3RoleBasedOutput
     */
    cloudRegion?: AwsCloudRegion;

    /**
     * Specifies the method used for authentication
     * @type {S3SignatureVersion}
     * @memberof S3RoleBasedOutput
     */
    signatureVersion?: S3SignatureVersion;

}
