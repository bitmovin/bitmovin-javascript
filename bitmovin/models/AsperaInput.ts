import Input from './Input';
import InputType from './InputType';

/**
 * @export
 * @interface AsperaInput
 */
export default interface AsperaInput extends Input {
    /**
     * Minimal download bandwidth. Examples: 100k, 100m, 100g
     * @type {string}
     * @memberof AsperaInput
     */
    minBandwidth?: string;

    /**
     * Maximal download bandwidth. Examples: 100k, 100m, 100g
     * @type {string}
     * @memberof AsperaInput
     */
    maxBandwidth?: string;

    /**
     * Host to use for Aspera transfers
     * @type {string}
     * @memberof AsperaInput
     */
    host: string;

    /**
     * Username to log into Aspera host (either password and user must be set or token)
     * @type {string}
     * @memberof AsperaInput
     */
    username?: string;

    /**
     * corresponding password (either password and user must be set or token)
     * @type {string}
     * @memberof AsperaInput
     */
    password?: string;

    /**
     * Token used for authentication (either password and user must be set or token)
     * @type {string}
     * @memberof AsperaInput
     */
    token?: string;

}
