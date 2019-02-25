import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../../../models/BitmovinResponse';
import ClearKeyDrm from '../../../../../../models/ClearKeyDrm';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../models/PaginationResponse';
import ClearKeyDrmsListQueryParams from './ClearKeyDrmsListQueryParams';

/**
 * ClearkeyApi - object-oriented interface
 * @export
 * @class ClearkeyApi
 * @extends {BaseAPI}
 */
export default class ClearkeyApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Add ClearKey DRM to MP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the MP4 muxing.
     * @param {ClearKeyDrm} [clearKeyDrm]
     * @throws {RequiredError}
     * @memberof ClearkeyApi
     */
    public create(encodingId: string, muxingId: string, clearKeyDrm?: ClearKeyDrm): Promise<ClearKeyDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.post<ClearKeyDrm>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}/drm/clearkey', pathParamMap, clearKeyDrm);
    }

    /**
     * @summary Delete ClearKey DRM from MP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the mp4.
     * @param {string} drmId Id of the ClearKey DRM configuration.
     * @throws {RequiredError}
     * @memberof ClearkeyApi
     */
    public delete(encodingId: string, muxingId: string, drmId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}/drm/clearkey/{drm_id}', pathParamMap);
    }

    /**
     * @summary ClearKey DRM Details of MP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the mp4.
     * @param {string} drmId Id of the ClearKey DRM configuration.
     * @throws {RequiredError}
     * @memberof ClearkeyApi
     */
    public get(encodingId: string, muxingId: string, drmId: string): Promise<ClearKeyDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.get<ClearKeyDrm>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}/drm/clearkey/{drm_id}', pathParamMap);
    }

    /**
     * @summary List ClearKey DRMs of MP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the mp4.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ClearkeyApi
     */
    public list(encodingId: string, muxingId: string, queryParams?: ClearKeyDrmsListQueryParams): Promise<PaginationResponse<ClearKeyDrm>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<ClearKeyDrm>>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}/drm/clearkey', pathParamMap, queryParams);
    }

}
