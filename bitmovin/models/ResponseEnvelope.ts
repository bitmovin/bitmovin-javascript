import ResponseStatus from './ResponseStatus';
import ResultWrapper from './ResultWrapper';

/**
 * @export
 * @interface ResponseEnvelope
 */
export default interface ResponseEnvelope<T> {
    /**
     * Unique correlation id
     * @type {string}
     * @memberof ResponseEnvelope
     */
    requestId?: string;

    /**
     * Response status information
     * @type {ResponseStatus}
     * @memberof ResponseEnvelope
     */
    status?: ResponseStatus;

    /**
     * Response information
     * @type {ResultWrapper<T>}
     * @memberof ResponseEnvelope
     */
    data?: ResultWrapper<T>;

    /**
     * Additional endpoint specific information
     * @type {any}
     * @memberof ResponseEnvelope
     */
    more?: any;

}
