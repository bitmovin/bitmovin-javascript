import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import Webhook from '../../../../../models/Webhook';
import PaginationResponse from '../../../../../models/PaginationResponse';
import WebhooksListQueryParams from './WebhooksListQueryParams';
import WebhooksListByEncodingIdQueryParams from './WebhooksListByEncodingIdQueryParams';

/**
 * ErrorApi - object-oriented interface
 * @export
 * @class ErrorApi
 * @extends {BaseAPI}
 */
export default class ErrorApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Add Encoding Error Webhook
     * @param {Webhook} [webhook]
     * @throws {RequiredError}
     * @memberof ErrorApi
     */
    public create(webhook?: Webhook): Promise<Webhook> {
        return this.restClient.post<Webhook>('/notifications/webhooks/encoding/encodings/error', {}, webhook);
    }

    /**
     * @summary Add Encoding Error Webhook for specific Encoding Resource
     * @param {string} encodingId Id of the encoding
     * @param {Webhook} [webhook]
     * @throws {RequiredError}
     * @memberof ErrorApi
     */
    public createbyEncodingId(encodingId: string, webhook?: Webhook): Promise<Webhook> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<Webhook>('/notifications/webhooks/encoding/encodings/{encoding_id}/error', pathParamMap, webhook);
    }

    /**
     * @summary Delete Encoding Error Webhook for specific Encoding Resource
     * @param {string} encodingId Id of the encoding
     * @param {string} webhookId Id of the webhook
     * @throws {RequiredError}
     * @memberof ErrorApi
     */
    public deleteByEncodingIdAndWebhookId(encodingId: string, webhookId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            webhook_id: webhookId
        };
        return this.restClient.delete<BitmovinResponse>('/notifications/webhooks/encoding/encodings/{encoding_id}/error/{webhook_id}', pathParamMap);
    }

    /**
     * @summary Delete Encoding Error Webhook
     * @param {string} webhookId Id of the webhook
     * @throws {RequiredError}
     * @memberof ErrorApi
     */
    public deleteByWebhookId(webhookId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            webhook_id: webhookId
        };
        return this.restClient.delete<BitmovinResponse>('/notifications/webhooks/encoding/encodings/error/{webhook_id}', pathParamMap);
    }

    /**
     * @summary Encoding Error Webhook Details for specific Encoding Resource
     * @param {string} encodingId Id of the encoding
     * @param {string} webhookId Id of the webhook
     * @throws {RequiredError}
     * @memberof ErrorApi
     */
    public getByEncodingIdAndWebhookId(encodingId: string, webhookId: string): Promise<Webhook> {
        const pathParamMap = {
            encoding_id: encodingId,
            webhook_id: webhookId
        };
        return this.restClient.get<Webhook>('/notifications/webhooks/encoding/encodings/{encoding_id}/error/{webhook_id}', pathParamMap);
    }

    /**
     * @summary Encoding Error Webhook Details
     * @param {string} webhookId Id of the webhook
     * @throws {RequiredError}
     * @memberof ErrorApi
     */
    public getByWebhookId(webhookId: string): Promise<Webhook> {
        const pathParamMap = {
            webhook_id: webhookId
        };
        return this.restClient.get<Webhook>('/notifications/webhooks/encoding/encodings/error/{webhook_id}', pathParamMap);
    }

    /**
     * @summary List Encoding Error Webhooks
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ErrorApi
     */
    public list(queryParams?: WebhooksListQueryParams): Promise<PaginationResponse<Webhook>> {
        return this.restClient.get<PaginationResponse<Webhook>>('/notifications/webhooks/encoding/encodings/error', {}, queryParams);
    }

    /**
     * @summary List Encoding Error Webhooks for specific Encoding Resource
     * @param {string} encodingId Id of the encoding
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ErrorApi
     */
    public listByEncodingId(encodingId: string, queryParams?: WebhooksListByEncodingIdQueryParams): Promise<PaginationResponse<Webhook>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<Webhook>>('/notifications/webhooks/encoding/encodings/{encoding_id}/error', pathParamMap, queryParams);
    }

}
