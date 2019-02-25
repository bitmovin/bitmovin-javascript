import GoogleCloudRegion from './GoogleCloudRegion';
import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface GcsInput
 */
export default interface GcsInput extends Input {
    /**
     * Name of the bucket
     * @type {string}
     * @memberof GcsInput
     */
    bucketName: string;

    /**
     * The cloud region in which the bucket is located. Is used to determine the ideal location for your encodings automatically.
     * @type {GoogleCloudRegion}
     * @memberof GcsInput
     */
    cloudRegion?: GoogleCloudRegion;

    /**
     * GCS access key
     * @type {string}
     * @memberof GcsInput
     */
    accessKey: string;

    /**
     * GCS secret key
     * @type {string}
     * @memberof GcsInput
     */
    secretKey: string;

}
