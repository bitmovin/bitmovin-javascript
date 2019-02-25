import RetryHint from './RetryHint';

/**
 * @export
 * @interface ErrorDetails
 */
export default interface ErrorDetails {
    /**
     * Specific error code
     * @type {number}
     * @memberof ErrorDetails
     */
    code: number;

    /**
     * Error group name
     * @type {string}
     * @memberof ErrorDetails
     */
    category: string;

    /**
     * Detailed error message
     * @type {string}
     * @memberof ErrorDetails
     */
    text: string;

    /**
     * Information if the encoding could potentially succeed when retrying.
     * @type {RetryHint}
     * @memberof ErrorDetails
     */
    retryHint: RetryHint;

}
