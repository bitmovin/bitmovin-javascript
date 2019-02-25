import BitmovinResponse from './BitmovinResponse';
import NotificationStates from './NotificationStates';

/**
 * @export
 * @interface NotificationStateEntry
 */
export default interface NotificationStateEntry extends BitmovinResponse {
    /**
     * @type {NotificationStates}
     * @memberof NotificationStateEntry
     */
    state: NotificationStates;

    /**
     * Indicate if notification was sent
     * @type {boolean}
     * @memberof NotificationStateEntry
     */
    muted: boolean;

    /**
     * The notification this state belongs to
     * @type {string}
     * @memberof NotificationStateEntry
     */
    notificationId: string;

    /**
     * Indicate if triggered for specific resource
     * @type {string}
     * @memberof NotificationStateEntry
     */
    resourceId: string;

    /**
     * @type {Date}
     * @memberof NotificationStateEntry
     */
    triggeredAt: Date;

}
