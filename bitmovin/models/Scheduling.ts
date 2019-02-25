
/**
 * @export
 * @interface Scheduling
 */
export default interface Scheduling {
    /**
     * Specify the priority of this encoding (0 - 100). Higher numbers mean higher priority. Default is 50.
     * @type {number}
     * @memberof Scheduling
     */
    priority?: number;

    /**
     * List of prewarmed Instance pools. If set, prewarmed instances from pools with these IDs will be used for the Encoding if available. The pool IDs will be tried in the order in which they are passed.
     * @type {Array<string>}
     * @memberof Scheduling
     */
    prewarmedInstancePoolIds?: Array<string>;

}
