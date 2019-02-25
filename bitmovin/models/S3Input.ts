import AwsCloudRegion from './AwsCloudRegion';
import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface S3Input
 */
export default interface S3Input extends Input {
    /**
     * The cloud region in which the bucket is located. Is used to determine the ideal location for your encodings automatically.
     * @type {AwsCloudRegion}
     * @memberof S3Input
     */
    cloudRegion?: AwsCloudRegion;

    /**
     * Name of the bucket
     * @type {string}
     * @memberof S3Input
     */
    bucketName: string;

    /**
     * Amazon access key
     * @type {string}
     * @memberof S3Input
     */
    accessKey: string;

    /**
     * Amazon secret key
     * @type {string}
     * @memberof S3Input
     */
    secretKey: string;

}
