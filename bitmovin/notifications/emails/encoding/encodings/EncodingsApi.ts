import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import LiveInputStreamChangedApi from './liveInputStreamChanged/LiveInputStreamChangedApi';
import ErrorApi from './error/ErrorApi';
import EmailNotificationWithStreamConditions from '../../../../models/EmailNotificationWithStreamConditions';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import EmailNotificationWithStreamConditionssListQueryParams from './EmailNotificationWithStreamConditionssListQueryParams';

/**
 * EncodingsApi - object-oriented interface
 * @export
 * @class EncodingsApi
 * @extends {BaseAPI}
 */
export default class EncodingsApi extends BaseAPI {
    public liveInputStreamChanged: LiveInputStreamChangedApi;
    public error: ErrorApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.liveInputStreamChanged = new LiveInputStreamChangedApi(configuration);
        this.error = new ErrorApi(configuration);
    }

    /**
     * @summary List Email Notifications (Specific Encoding)
     * @param {string} encodingId Id of the encoding resource
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof EncodingsApi
     */
    public list(encodingId: string, queryParams?: EmailNotificationWithStreamConditionssListQueryParams): Promise<PaginationResponse<EmailNotificationWithStreamConditions>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<EmailNotificationWithStreamConditions>>('/notifications/emails/encoding/encodings/{encoding_id}', pathParamMap, queryParams);
    }

}
