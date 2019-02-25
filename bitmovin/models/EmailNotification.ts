import Notification from './Notification';

/**
 * @export
 * @interface EmailNotification
 */
export default interface EmailNotification extends Notification {
    /**
     * @type {Array<string>}
     * @memberof EmailNotification
     */
    emails: Array<string>;

}
