import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface AwsAccount
 */
export default interface AwsAccount extends BitmovinResource {
    /**
     * Amazon access key
     * @type {string}
     * @memberof AwsAccount
     */
    accessKey: string;

    /**
     * Amazon secret key
     * @type {string}
     * @memberof AwsAccount
     */
    secretKey: string;

    /**
     * Amazon account number (12 digits as per AWS spec)
     * @type {string}
     * @memberof AwsAccount
     */
    accountNumber: string;

}
