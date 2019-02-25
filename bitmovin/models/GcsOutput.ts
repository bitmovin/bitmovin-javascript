import AclEntry from './AclEntry';
import GoogleCloudRegion from './GoogleCloudRegion';
import Output from './Output';
import OutputType from './OutputType';

/**
 * @export
 * @interface GcsOutput
 */
export default interface GcsOutput extends Output {
    /**
     * GCS access key
     * @type {string}
     * @memberof GcsOutput
     */
    accessKey: string;

    /**
     * GCS secret key
     * @type {string}
     * @memberof GcsOutput
     */
    secretKey: string;

    /**
     * Name of the bucket
     * @type {string}
     * @memberof GcsOutput
     */
    bucketName: string;

    /**
     * @type {GoogleCloudRegion}
     * @memberof GcsOutput
     */
    cloudRegion?: GoogleCloudRegion;

}
