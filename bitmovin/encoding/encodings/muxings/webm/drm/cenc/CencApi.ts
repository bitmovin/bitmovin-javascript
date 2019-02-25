import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../../../models/BitmovinResponse';
import CencDrm from '../../../../../../models/CencDrm';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../models/PaginationResponse';
import CencDrmsListQueryParams from './CencDrmsListQueryParams';

/**
 * CencApi - object-oriented interface
 * @export
 * @class CencApi
 * @extends {BaseAPI}
 */
export default class CencApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Add CENC DRM to WebM
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the WebM muxing.
     * @param {CencDrm} [cencDrm] The CencDrm to be created
     * @throws {RequiredError}
     * @memberof CencApi
     */
    public create(encodingId: string, muxingId: string, cencDrm?: CencDrm): Promise<CencDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.post<CencDrm>('/encoding/encodings/{encoding_id}/muxings/webm/{muxing_id}/drm/cenc', pathParamMap, cencDrm);
    }

    /**
     * @summary Delete CENC DRM from WebM
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the WebM muxing
     * @param {string} drmId Id of the cenc drm.
     * @throws {RequiredError}
     * @memberof CencApi
     */
    public delete(encodingId: string, muxingId: string, drmId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/webm/{muxing_id}/drm/cenc/{drm_id}', pathParamMap);
    }

    /**
     * @summary CENC DRM Details of WebM
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the WebM muxing.
     * @param {string} drmId Id of the cenc drm.
     * @throws {RequiredError}
     * @memberof CencApi
     */
    public get(encodingId: string, muxingId: string, drmId: string): Promise<CencDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.get<CencDrm>('/encoding/encodings/{encoding_id}/muxings/webm/{muxing_id}/drm/cenc/{drm_id}', pathParamMap);
    }

    /**
     * @summary List CENC DRMs of WebM
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the WebM muxing.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof CencApi
     */
    public list(encodingId: string, muxingId: string, queryParams?: CencDrmsListQueryParams): Promise<PaginationResponse<CencDrm>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<CencDrm>>('/encoding/encodings/{encoding_id}/muxings/webm/{muxing_id}/drm/cenc', pathParamMap, queryParams);
    }

}
