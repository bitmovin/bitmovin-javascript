export default interface NotificationStateEntrysListByNotificationIdQueryParams {

    /**
     * Index of the first item to return, starting at 0. Default is 0
     * @type {number}
     * @memberof NotificationStateEntrysListByNotificationIdQueryParams
     */
    offset?: number;

    /**
     * Maximum number of items to return. Default is 25, maximum is 100
     * @type {number}
     * @memberof NotificationStateEntrysListByNotificationIdQueryParams
     */
    limit?: number;
}
