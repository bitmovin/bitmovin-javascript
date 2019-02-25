import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../../../models/BitmovinResponse';
import FairPlayDrm from '../../../../../../models/FairPlayDrm';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../models/PaginationResponse';
import FairPlayDrmsListQueryParams from './FairPlayDrmsListQueryParams';

/**
 * FairplayApi - object-oriented interface
 * @export
 * @class FairplayApi
 * @extends {BaseAPI}
 */
export default class FairplayApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Add FairPlay DRM to fMP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fmp4 fragment.
     * @param {FairPlayDrm} [fairPlayDrm]
     * @throws {RequiredError}
     * @memberof FairplayApi
     */
    public create(encodingId: string, muxingId: string, fairPlayDrm?: FairPlayDrm): Promise<FairPlayDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.post<FairPlayDrm>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/drm/fairplay', pathParamMap, fairPlayDrm);
    }

    /**
     * @summary Delete FairPlay DRM from fMP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fmp4 fragment.
     * @param {string} drmId Id of the FairPlay DRM configuration.
     * @throws {RequiredError}
     * @memberof FairplayApi
     */
    public delete(encodingId: string, muxingId: string, drmId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/drm/fairplay/{drm_id}', pathParamMap);
    }

    /**
     * @summary FairPlay DRM Details of fMP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fmp4 fragment.
     * @param {string} drmId Id of the FairPlay DRM configuration.
     * @throws {RequiredError}
     * @memberof FairplayApi
     */
    public get(encodingId: string, muxingId: string, drmId: string): Promise<FairPlayDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.get<FairPlayDrm>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/drm/fairplay/{drm_id}', pathParamMap);
    }

    /**
     * @summary List FairPlay DRMs of fMP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof FairplayApi
     */
    public list(encodingId: string, muxingId: string, queryParams?: FairPlayDrmsListQueryParams): Promise<PaginationResponse<FairPlayDrm>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<FairPlayDrm>>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/drm/fairplay', pathParamMap, queryParams);
    }

}
