import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import EmailNotificationWithStreamConditions from '../../../../../models/EmailNotificationWithStreamConditions';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';

/**
 * LiveInputStreamChangedApi - object-oriented interface
 * @export
 * @class LiveInputStreamChangedApi
 * @extends {BaseAPI}
 */
export default class LiveInputStreamChangedApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Live Input Stream Changed Email Notification (All Encodings)
     * @param {EmailNotificationWithStreamConditions} [emailNotificationWithStreamConditions] The email notifications object
     * @throws {RequiredError}
     * @memberof LiveInputStreamChangedApi
     */
    public create(emailNotificationWithStreamConditions?: EmailNotificationWithStreamConditions): Promise<EmailNotificationWithStreamConditions> {
        return this.restClient.post<EmailNotificationWithStreamConditions>('/notifications/emails/encoding/encodings/live-input-stream-changed', {}, emailNotificationWithStreamConditions);
    }

    /**
     * @summary Add Live Input Stream Changed Email Notification (Specific Encoding)
     * @param {string} encodingId Id of the encoding resource
     * @param {EmailNotificationWithStreamConditions} [emailNotificationWithStreamConditions] The email notifications object
     * @throws {RequiredError}
     * @memberof LiveInputStreamChangedApi
     */
    public createByEncodingId(encodingId: string, emailNotificationWithStreamConditions?: EmailNotificationWithStreamConditions): Promise<EmailNotificationWithStreamConditions> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<EmailNotificationWithStreamConditions>('/notifications/emails/encoding/encodings/{encoding_id}/live-input-stream-changed', pathParamMap, emailNotificationWithStreamConditions);
    }

    /**
     * @summary Replace Live Input Stream Changed Email Notification
     * @param {string} notificationId Id of the email notification
     * @param {EmailNotificationWithStreamConditions} [emailNotificationWithStreamConditions] The email notification with the updated values
     * @throws {RequiredError}
     * @memberof LiveInputStreamChangedApi
     */
    public putNotificationsEmailsEncodingEncodingsLiveInputStreamChangedByInputId(notificationId: string, emailNotificationWithStreamConditions?: EmailNotificationWithStreamConditions): Promise<EmailNotificationWithStreamConditions> {
        const pathParamMap = {
            notification_id: notificationId
        };
        return this.restClient.put<EmailNotificationWithStreamConditions>('/notifications/emails/encoding/encodings/live-input-stream-changed/{notification_id}', pathParamMap, emailNotificationWithStreamConditions);
    }

}
