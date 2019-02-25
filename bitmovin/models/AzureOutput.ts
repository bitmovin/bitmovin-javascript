import AclEntry from './AclEntry';
import Output from './Output';
import OutputType from './OutputType';

/**
 * @export
 * @interface AzureOutput
 */
export default interface AzureOutput extends Output {
    /**
     * Azure Account Name
     * @type {string}
     * @memberof AzureOutput
     */
    accountName: string;

    /**
     * Azure Account Key
     * @type {string}
     * @memberof AzureOutput
     */
    accountKey: string;

    /**
     * Name of the bucket
     * @type {string}
     * @memberof AzureOutput
     */
    container: string;

}
