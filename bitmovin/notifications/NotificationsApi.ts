import { BaseAPI } from '../common/BaseAPI';
import { Configuration } from '../common/RestClient';
import WebhooksApi from './webhooks/WebhooksApi';
import StateApi from './state/StateApi';
import EmailsApi from './emails/EmailsApi';
import BitmovinResponse from '../models/BitmovinResponse';
import Notification from '../models/Notification';
import NotificationStateEntry from '../models/NotificationStateEntry';
import ResponseEnvelope from '../models/ResponseEnvelope';
import PaginationResponse from '../models/PaginationResponse';
import NotificationStateEntrysListByNotificationIdQueryParams from './NotificationStateEntrysListByNotificationIdQueryParams';
import NotificationsListQueryParams from './NotificationsListQueryParams';

/**
 * NotificationsApi - object-oriented interface
 * @export
 * @class NotificationsApi
 * @extends {BaseAPI}
 */
export default class NotificationsApi extends BaseAPI {
    public webhooks: WebhooksApi;
    public state: StateApi;
    public emails: EmailsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.webhooks = new WebhooksApi(configuration);
        this.state = new StateApi(configuration);
        this.emails = new EmailsApi(configuration);
    }

    /**
     * @summary Delete Notification
     * @param {string} notificationId Id of the notification
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public delete(notificationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            notification_id: notificationId
        };
        return this.restClient.delete<BitmovinResponse>('/notifications/{notification_id}', pathParamMap);
    }

    /**
     * @summary Get Notification
     * @param {string} notificationId Id of the notification
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public get(notificationId: string): Promise<Notification> {
        const pathParamMap = {
            notification_id: notificationId
        };
        return this.restClient.get<Notification>('/notifications/{notification_id}', pathParamMap);
    }

    /**
     * @summary List Notifications
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public list(queryParams?: NotificationsListQueryParams): Promise<PaginationResponse<Notification>> {
        return this.restClient.get<PaginationResponse<Notification>>('/notifications', {}, queryParams);
    }

    /**
     * @summary List Notification State History (All Resources)
     * @param {string} notificationId Id of the notification
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public listByNotificationId(notificationId: string, queryParams?: NotificationStateEntrysListByNotificationIdQueryParams): Promise<PaginationResponse<NotificationStateEntry>> {
        const pathParamMap = {
            notification_id: notificationId
        };
        return this.restClient.get<PaginationResponse<NotificationStateEntry>>('/notifications/{notification_id}/state', pathParamMap, queryParams);
    }

    /**
     * @summary Mute Notification
     * @param {string} notificationId Id of the notification
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public mute(notificationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            notification_id: notificationId
        };
        return this.restClient.post<BitmovinResponse>('/notifications/{notification_id}/mute', pathParamMap);
    }

    /**
     * @summary Unmute Notification
     * @param {string} notificationId Id of the notification
     * @throws {RequiredError}
     * @memberof NotificationsApi
     */
    public unmute(notificationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            notification_id: notificationId
        };
        return this.restClient.post<BitmovinResponse>('/notifications/{notification_id}/unmute', pathParamMap);
    }

}
