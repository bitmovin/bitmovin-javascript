import BitmovinResource from './BitmovinResource';
import Permission from './Permission';
import Policy from './Policy';

/**
 * @export
 * @interface Acl
 */
export default interface Acl extends BitmovinResource {
    /**
     * Resource to define the permission for.
     * @type {string}
     * @memberof Acl
     */
    resource: string;

    /**
     * @type {Policy}
     * @memberof Acl
     */
    policy: Policy;

    /**
     * Permissions to assign.
     * @type {Array<Permission>}
     * @memberof Acl
     */
    permissions: Array<Permission>;

}
