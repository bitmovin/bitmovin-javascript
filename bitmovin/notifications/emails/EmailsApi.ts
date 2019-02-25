import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import EncodingApi from './encoding/EncodingApi';
import Notification from '../../models/Notification';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import PaginationResponse from '../../models/PaginationResponse';
import NotificationsListQueryParams from './NotificationsListQueryParams';

/**
 * EmailsApi - object-oriented interface
 * @export
 * @class EmailsApi
 * @extends {BaseAPI}
 */
export default class EmailsApi extends BaseAPI {
    public encoding: EncodingApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.encoding = new EncodingApi(configuration);
    }

    /**
     * @summary List Email Notifications
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof EmailsApi
     */
    public list(queryParams?: NotificationsListQueryParams): Promise<PaginationResponse<Notification>> {
        return this.restClient.get<PaginationResponse<Notification>>('/notifications/emails', {}, queryParams);
    }

}
