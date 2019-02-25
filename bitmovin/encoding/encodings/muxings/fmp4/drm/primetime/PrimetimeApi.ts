import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../../../models/BitmovinResponse';
import PrimeTimeDrm from '../../../../../../models/PrimeTimeDrm';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../models/PaginationResponse';
import PrimeTimeDrmsListQueryParams from './PrimeTimeDrmsListQueryParams';

/**
 * PrimetimeApi - object-oriented interface
 * @export
 * @class PrimetimeApi
 * @extends {BaseAPI}
 */
export default class PrimetimeApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Add PrimeTime DRM to fMP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing.
     * @param {PrimeTimeDrm} [primeTimeDrm] TODO Add Description
     * @throws {RequiredError}
     * @memberof PrimetimeApi
     */
    public create(encodingId: string, muxingId: string, primeTimeDrm?: PrimeTimeDrm): Promise<PrimeTimeDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.post<PrimeTimeDrm>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/drm/primetime', pathParamMap, primeTimeDrm);
    }

    /**
     * @summary Delete PrimeTime DRM from fMP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fmp4 fragment.
     * @param {string} drmId Id of the PrimeTime DRM configuration.
     * @throws {RequiredError}
     * @memberof PrimetimeApi
     */
    public delete(encodingId: string, muxingId: string, drmId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/drm/primetime/{drm_id}', pathParamMap);
    }

    /**
     * @summary PrimeTime DRM Details of fMP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fmp4 fragment.
     * @param {string} drmId Id of the PrimeTime DRM configuration.
     * @throws {RequiredError}
     * @memberof PrimetimeApi
     */
    public get(encodingId: string, muxingId: string, drmId: string): Promise<PrimeTimeDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.get<PrimeTimeDrm>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/drm/primetime/{drm_id}', pathParamMap);
    }

    /**
     * @summary List PrimeTime DRMs of fMP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fmp4 fragment.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof PrimetimeApi
     */
    public list(encodingId: string, muxingId: string, queryParams?: PrimeTimeDrmsListQueryParams): Promise<PaginationResponse<PrimeTimeDrm>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<PrimeTimeDrm>>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/drm/primetime', pathParamMap, queryParams);
    }

}
