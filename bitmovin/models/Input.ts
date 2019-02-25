import BitmovinResource from './BitmovinResource';
import InputType from './InputType';

/**
 * @export
 * @interface Input
 */
export default interface Input extends BitmovinResource {
    /**
     * The type of the input
     * @type {InputType}
     * @memberof Input
     */
    type?: InputType;

}
