import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import FairplayApi from './fairplay/FairplayApi';
import AesApi from './aes/AesApi';
import Drm from '../../../../../models/Drm';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../models/PaginationResponse';

/**
 * DrmApi - object-oriented interface
 * @export
 * @class DrmApi
 * @extends {BaseAPI}
 */
export default class DrmApi extends BaseAPI {
    public fairplay: FairplayApi;
    public aes: AesApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.fairplay = new FairplayApi(configuration);
        this.aes = new AesApi(configuration);
    }

    /**
     * @summary List all DRM configurations of TS Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the TS muxing
     * @throws {RequiredError}
     * @memberof DrmApi
     */
    public list(encodingId: string, muxingId: string): Promise<PaginationResponse<Drm>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<Drm>>('/encoding/encodings/{encoding_id}/muxings/ts/{muxing_id}/drm', pathParamMap);
    }

}
