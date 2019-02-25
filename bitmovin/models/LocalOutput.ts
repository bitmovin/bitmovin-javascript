import AclEntry from './AclEntry';
import Output from './Output';
import OutputType from './OutputType';

/**
 * @export
 * @interface LocalOutput
 */
export default interface LocalOutput extends Output {
    /**
     * Path to your local storage
     * @type {string}
     * @memberof LocalOutput
     */
    path: string;

}
