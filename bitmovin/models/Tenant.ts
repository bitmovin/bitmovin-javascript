import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface Tenant
 */
export default interface Tenant extends BitmovinResource {
    /**
     * Email address of the tenant.
     * @type {string}
     * @memberof Tenant
     */
    eMail: string;

}
