import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import DrmApi from './drm/DrmApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import WebmMuxing from '../../../../models/WebmMuxing';
import PaginationResponse from '../../../../models/PaginationResponse';
import WebmMuxingsListQueryParams from './WebmMuxingsListQueryParams';

/**
 * WebmApi - object-oriented interface
 * @export
 * @class WebmApi
 * @extends {BaseAPI}
 */
export default class WebmApi extends BaseAPI {
    public customdata: CustomdataApi;
    public drm: DrmApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.drm = new DrmApi(configuration);
    }

    /**
     * @summary Add WebM Segment Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {WebmMuxing} [webmMuxing]
     * @throws {RequiredError}
     * @memberof WebmApi
     */
    public create(encodingId: string, webmMuxing?: WebmMuxing): Promise<WebmMuxing> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<WebmMuxing>('/encoding/encodings/{encoding_id}/muxings/webm', pathParamMap, webmMuxing);
    }

    /**
     * @summary Delete WebM Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the WebM muxing
     * @throws {RequiredError}
     * @memberof WebmApi
     */
    public delete(encodingId: string, muxingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/webm/{muxing_id}', pathParamMap);
    }

    /**
     * @summary WebM Segment Muxing Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the WebM muxing
     * @throws {RequiredError}
     * @memberof WebmApi
     */
    public get(encodingId: string, muxingId: string): Promise<WebmMuxing> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<WebmMuxing>('/encoding/encodings/{encoding_id}/muxings/webm/{muxing_id}', pathParamMap);
    }

    /**
     * @summary List WebM Segment Muxings
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof WebmApi
     */
    public list(encodingId: string, queryParams?: WebmMuxingsListQueryParams): Promise<PaginationResponse<WebmMuxing>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<WebmMuxing>>('/encoding/encodings/{encoding_id}/muxings/webm', pathParamMap, queryParams);
    }

}
