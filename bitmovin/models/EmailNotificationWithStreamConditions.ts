import EmailNotification from './EmailNotification';
import StreamCondition from './StreamCondition';

/**
 * @export
 * @interface EmailNotificationWithStreamConditions
 */
export default interface EmailNotificationWithStreamConditions extends EmailNotification {
    /**
     * @type {Array<StreamCondition>}
     * @memberof EmailNotificationWithStreamConditions
     */
    conditions?: Array<StreamCondition>;

}
