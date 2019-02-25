import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../../../models/BitmovinResponse';
import PlayReadyDrm from '../../../../../../models/PlayReadyDrm';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../models/PaginationResponse';
import PlayReadyDrmsListQueryParams from './PlayReadyDrmsListQueryParams';

/**
 * PlayreadyApi - object-oriented interface
 * @export
 * @class PlayreadyApi
 * @extends {BaseAPI}
 */
export default class PlayreadyApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Add PlayReady DRM to MP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the MP4 muxing.
     * @param {PlayReadyDrm} [playReadyDrm]
     * @throws {RequiredError}
     * @memberof PlayreadyApi
     */
    public create(encodingId: string, muxingId: string, playReadyDrm?: PlayReadyDrm): Promise<PlayReadyDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.post<PlayReadyDrm>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}/drm/playready', pathParamMap, playReadyDrm);
    }

    /**
     * @summary Delete PlayReady DRM from MP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the MP4 muxing.
     * @param {string} drmId Id of the PlayReady DRM configuration.
     * @throws {RequiredError}
     * @memberof PlayreadyApi
     */
    public delete(encodingId: string, muxingId: string, drmId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}/drm/playready/{drm_id}', pathParamMap);
    }

    /**
     * @summary PlayReady DRM Details of MP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the MP4 muxing.
     * @param {string} drmId Id of the PlayReady DRM configuration.
     * @throws {RequiredError}
     * @memberof PlayreadyApi
     */
    public get(encodingId: string, muxingId: string, drmId: string): Promise<PlayReadyDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.get<PlayReadyDrm>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}/drm/playready/{drm_id}', pathParamMap);
    }

    /**
     * @summary List PlayReady DRMs of MP4
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the MP4 muxing.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof PlayreadyApi
     */
    public list(encodingId: string, muxingId: string, queryParams?: PlayReadyDrmsListQueryParams): Promise<PaginationResponse<PlayReadyDrm>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<PlayReadyDrm>>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}/drm/playready', pathParamMap, queryParams);
    }

}
