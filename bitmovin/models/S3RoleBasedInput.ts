import AwsCloudRegion from './AwsCloudRegion';
import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface S3RoleBasedInput
 */
export default interface S3RoleBasedInput extends Input {
    /**
     * Amazon S3 bucket name
     * @type {string}
     * @memberof S3RoleBasedInput
     */
    bucketName: string;

    /**
     * Amazon ARN of the Role that will be assumed for S3 access.
     * @type {string}
     * @memberof S3RoleBasedInput
     */
    roleArn: string;

    /**
     * @type {AwsCloudRegion}
     * @memberof S3RoleBasedInput
     */
    cloudRegion?: AwsCloudRegion;

}
