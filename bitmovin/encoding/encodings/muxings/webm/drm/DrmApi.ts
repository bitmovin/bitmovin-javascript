import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import CencApi from './cenc/CencApi';
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
    public cenc: CencApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.cenc = new CencApi(configuration);
    }

    /**
     * @summary List all DRM configurations of WebM Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the WebM muxing
     * @throws {RequiredError}
     * @memberof DrmApi
     */
    public list(encodingId: string, muxingId: string): Promise<PaginationResponse<Drm>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<Drm>>('/encoding/encodings/{encoding_id}/muxings/webm/{muxing_id}/drm', pathParamMap);
    }

}
