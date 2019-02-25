import AclEntry from './AclEntry';
import BitmovinResource from './BitmovinResource';
import OutputType from './OutputType';

/**
 * @export
 * @interface Output
 */
export default interface Output extends BitmovinResource {
    /**
     * @type {Array<AclEntry>}
     * @memberof Output
     */
    acl?: Array<AclEntry>;

    /**
     * The type of the output
     * @type {OutputType}
     * @memberof Output
     */
    type?: OutputType;

}
