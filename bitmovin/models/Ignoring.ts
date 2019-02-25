import IgnoredBy from './IgnoredBy';

/**
 * @export
 * @interface Ignoring
 */
export default interface Ignoring {
    /**
     * @type {IgnoredBy}
     * @memberof Ignoring
     */
    ignoredBy?: IgnoredBy;

    /**
     * Describes why ignoredBy has been set to its current value.
     * @type {string}
     * @memberof Ignoring
     */
    ignoredByDescription?: string;

}
