import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import EncodingsApi from './encodings/EncodingsApi';
import EmailNotification from '../../../models/EmailNotification';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import EmailNotificationsListQueryParams from './EmailNotificationsListQueryParams';

/**
 * EncodingApi - object-oriented interface
 * @export
 * @class EncodingApi
 * @extends {BaseAPI}
 */
export default class EncodingApi extends BaseAPI {
    public encodings: EncodingsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.encodings = new EncodingsApi(configuration);
    }

    /**
     * @summary List Email Notifications (All Encodings)
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof EncodingApi
     */
    public list(queryParams?: EmailNotificationsListQueryParams): Promise<PaginationResponse<EmailNotification>> {
        return this.restClient.get<PaginationResponse<EmailNotification>>('/notifications/emails/encoding', {}, queryParams);
    }

}
