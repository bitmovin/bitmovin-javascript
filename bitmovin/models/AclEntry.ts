import AclPermission from './AclPermission';

/**
 * @export
 * @interface AclEntry
 */
export default interface AclEntry {
    /**
     * @type {string}
     * @memberof AclEntry
     */
    scope?: string;

    /**
     * @type {AclPermission}
     * @memberof AclEntry
     */
    permission: AclPermission;

}
