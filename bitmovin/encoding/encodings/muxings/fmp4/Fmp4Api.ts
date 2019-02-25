import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import DrmApi from './drm/DrmApi';
import CaptionsApi from './captions/CaptionsApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import Fmp4Muxing from '../../../../models/Fmp4Muxing';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import Fmp4MuxingsListQueryParams from './Fmp4MuxingsListQueryParams';

/**
 * Fmp4Api - object-oriented interface
 * @export
 * @class Fmp4Api
 * @extends {BaseAPI}
 */
export default class Fmp4Api extends BaseAPI {
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
     * @summary Add fMP4 Segment Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {Fmp4Muxing} [fmp4Muxing]
     * @throws {RequiredError}
     * @memberof Fmp4Api
     */
    public create(encodingId: string, fmp4Muxing?: Fmp4Muxing): Promise<Fmp4Muxing> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<Fmp4Muxing>('/encoding/encodings/{encoding_id}/muxings/fmp4', pathParamMap, fmp4Muxing);
    }

    /**
     * @summary Delete fMP4 Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing
     * @throws {RequiredError}
     * @memberof Fmp4Api
     */
    public delete(encodingId: string, muxingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}', pathParamMap);
    }

    /**
     * @summary fMP4 Segment Muxing Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing
     * @throws {RequiredError}
     * @memberof Fmp4Api
     */
    public get(encodingId: string, muxingId: string): Promise<Fmp4Muxing> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<Fmp4Muxing>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}', pathParamMap);
    }

    /**
     * @summary List fMP4 Segment Muxings
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof Fmp4Api
     */
    public list(encodingId: string, queryParams?: Fmp4MuxingsListQueryParams): Promise<PaginationResponse<Fmp4Muxing>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<Fmp4Muxing>>('/encoding/encodings/{encoding_id}/muxings/fmp4', pathParamMap, queryParams);
    }

}
