import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface AzureInput
 */
export default interface AzureInput extends Input {
    /**
     * Azure Account Name
     * @type {string}
     * @memberof AzureInput
     */
    accountName: string;

    /**
     * Azure Account Key
     * @type {string}
     * @memberof AzureInput
     */
    accountKey: string;

    /**
     * Name of the bucket
     * @type {string}
     * @memberof AzureInput
     */
    container: string;

}
