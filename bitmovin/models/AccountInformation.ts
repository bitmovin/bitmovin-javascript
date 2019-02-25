import AccountApiKey from './AccountApiKey';
import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface AccountInformation
 */
export default interface AccountInformation extends BitmovinResource {
    /**
     * Email address of the account.
     * @type {string}
     * @memberof AccountInformation
     */
    email: string;

    /**
     * ApiKeys associated with the account
     * @type {Array<AccountApiKey>}
     * @memberof AccountInformation
     */
    apiKeys: Array<AccountApiKey>;

    /**
     * First name of the tenant.
     * @type {string}
     * @memberof AccountInformation
     */
    firstName?: string;

    /**
     * Last name of the tenant.
     * @type {string}
     * @memberof AccountInformation
     */
    lastName?: string;

    /**
     * Phone number of the tenant.
     * @type {string}
     * @memberof AccountInformation
     */
    phone?: string;

    /**
     * Company name of the tenant.
     * @type {string}
     * @memberof AccountInformation
     */
    company?: string;

}
