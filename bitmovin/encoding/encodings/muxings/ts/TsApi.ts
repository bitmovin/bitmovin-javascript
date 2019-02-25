import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import DrmApi from './drm/DrmApi';
import CaptionsApi from './captions/CaptionsApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import TsMuxing from '../../../../models/TsMuxing';
import PaginationResponse from '../../../../models/PaginationResponse';
import TsMuxingsListQueryParams from './TsMuxingsListQueryParams';

/**
 * TsApi - object-oriented interface
 * @export
 * @class TsApi
 * @extends {BaseAPI}
 */
export default class TsApi extends BaseAPI {
    public customdata: CustomdataApi;
    public drm: DrmApi;
    public captions: CaptionsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.drm = new DrmApi(configuration);
        this.captions = new CaptionsApi(configuration);
    }

    /**
     * @summary Add TS Segment Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {TsMuxing} [tsMuxing]
     * @throws {RequiredError}
     * @memberof TsApi
     */
    public create(encodingId: string, tsMuxing?: TsMuxing): Promise<TsMuxing> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<TsMuxing>('/encoding/encodings/{encoding_id}/muxings/ts', pathParamMap, tsMuxing);
    }

    /**
     * @summary Delete TS Segment Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the ts segment muxing
     * @throws {RequiredError}
     * @memberof TsApi
     */
    public delete(encodingId: string, muxingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/ts/{muxing_id}', pathParamMap);
    }

    /**
     * @summary TS Segment Muxing Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the ts segment muxing
     * @throws {RequiredError}
     * @memberof TsApi
     */
    public get(encodingId: string, muxingId: string): Promise<TsMuxing> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<TsMuxing>('/encoding/encodings/{encoding_id}/muxings/ts/{muxing_id}', pathParamMap);
    }

    /**
     * @summary List TS Segment Muxings
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof TsApi
     */
    public list(encodingId: string, queryParams?: TsMuxingsListQueryParams): Promise<PaginationResponse<TsMuxing>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<TsMuxing>>('/encoding/encodings/{encoding_id}/muxings/ts', pathParamMap, queryParams);
    }

}
