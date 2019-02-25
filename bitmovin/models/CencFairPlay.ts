
/**
 * @export
 * @interface CencFairPlay
 */
export default interface CencFairPlay {
    /**
     * Initialization vector as hexadecimal string
     * @type {string}
     * @memberof CencFairPlay
     */
    iv?: string;

    /**
     * URL of the licensing server
     * @type {string}
     * @memberof CencFairPlay
     */
    uri?: string;

}
