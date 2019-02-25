import Link from './Link';
import Message from './Message';

/**
 * @export
 * @interface ResponseErrorData
 */
export default interface ResponseErrorData {
    /**
     * Contains an error code as defined in https://bitmovin.com/encoding-documentation/bitmovin-api/#/introduction/api-error-codes 
     * @type {number}
     * @memberof ResponseErrorData
     */
    code: number;

    /**
     * General error message
     * @type {string}
     * @memberof ResponseErrorData
     */
    message: string;

    /**
     * More detailed message meant for developers
     * @type {string}
     * @memberof ResponseErrorData
     */
    developerMessage: string;

    /**
     * collection of links to webpages containing further information on the topic
     * @type {Array<Link>}
     * @memberof ResponseErrorData
     */
    links?: Array<Link>;

    /**
     * collection of messages containing more detailed information on the cause of the error
     * @type {Array<Message>}
     * @memberof ResponseErrorData
     */
    details?: Array<Message>;

}
