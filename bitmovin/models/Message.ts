import BitmovinResponse from './BitmovinResponse';
import Link from './Link';
import MessageType from './MessageType';

/**
 * @export
 * @interface Message
 */
export default interface Message extends BitmovinResponse {
    /**
     * Message type giving a hint on the importance of the message (log level)
     * @type {MessageType}
     * @memberof Message
     */
    type: MessageType;

    /**
     * Message text
     * @type {string}
     * @memberof Message
     */
    text: string;

    /**
     * Name of the field to which the message is referring to
     * @type {string}
     * @memberof Message
     */
    field?: string;

    /**
     * collection of links to webpages containing further information on the topic
     * @type {Array<Link>}
     * @memberof Message
     */
    links?: Array<Link>;

    /**
     * Service-specific information
     * @type {any}
     * @memberof Message
     */
    more?: any;

    /**
     * Timestamp when the message occured
     * @type {Date}
     * @memberof Message
     */
    date?: Date;

}
