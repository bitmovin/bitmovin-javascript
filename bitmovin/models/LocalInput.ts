import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface LocalInput
 */
export default interface LocalInput extends Input {
    /**
     * Path to your local storage
     * @type {string}
     * @memberof LocalInput
     */
    path: string;

}
