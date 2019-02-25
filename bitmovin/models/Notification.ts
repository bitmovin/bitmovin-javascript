import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface Notification
 */
export default interface Notification extends BitmovinResponse {
    /**
     * Notify when condition resolves after it was met
     * @type {boolean}
     * @memberof Notification
     */
    resolve?: boolean;

    /**
     * Specific resource, e.g. encoding id
     * @type {string}
     * @memberof Notification
     */
    resourceId?: string;

    /**
     * Last time the notification was triggered
     * @type {Date}
     * @memberof Notification
     */
    triggeredAt?: Date;

    /**
     * @type {string}
     * @memberof Notification
     */
    type?: string;

    /**
     * @type {string}
     * @memberof Notification
     */
    eventType?: string;

    /**
     * @type {string}
     * @memberof Notification
     */
    category?: string;

    /**
     * @type {string}
     * @memberof Notification
     */
    resourceType?: string;

    /**
     * @type {boolean}
     * @memberof Notification
     */
    muted?: boolean;

}
