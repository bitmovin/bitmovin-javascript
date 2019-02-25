import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import BitmovinResponse from '../../../../../models/BitmovinResponse';
import ClosedCaptionsMediaInfo from '../../../../../models/ClosedCaptionsMediaInfo';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../models/PaginationResponse';
import ClosedCaptionsMediaInfosListQueryParams from './ClosedCaptionsMediaInfosListQueryParams';

/**
 * ClosedCaptionsApi - object-oriented interface
 * @export
 * @class ClosedCaptionsApi
 * @extends {BaseAPI}
 */
export default class ClosedCaptionsApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Closed Captions Media
     * @param {string} manifestId Id of the hls manifest.
     * @param {ClosedCaptionsMediaInfo} [closedCaptionsMediaInfo]
     * @throws {RequiredError}
     * @memberof ClosedCaptionsApi
     */
    public create(manifestId: string, closedCaptionsMediaInfo?: ClosedCaptionsMediaInfo): Promise<ClosedCaptionsMediaInfo> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.post<ClosedCaptionsMediaInfo>('/encoding/manifests/hls/{manifest_id}/media/closed-captions', pathParamMap, closedCaptionsMediaInfo);
    }

    /**
     * @summary Delete Closed Captions Media
     * @param {string} manifestId Id of the hls manifest.
     * @param {string} mediaId Id of the closed captions media.
     * @throws {RequiredError}
     * @memberof ClosedCaptionsApi
     */
    public delete(manifestId: string, mediaId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            media_id: mediaId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/hls/{manifest_id}/media/closed-captions/{media_id}', pathParamMap);
    }

    /**
     * @summary Closed Captions Media Details
     * @param {string} manifestId Id of the hls manifest.
     * @param {string} mediaId Id of the closed captions media.
     * @throws {RequiredError}
     * @memberof ClosedCaptionsApi
     */
    public get(manifestId: string, mediaId: string): Promise<ClosedCaptionsMediaInfo> {
        const pathParamMap = {
            manifest_id: manifestId,
            media_id: mediaId
        };
        return this.restClient.get<ClosedCaptionsMediaInfo>('/encoding/manifests/hls/{manifest_id}/media/closed-captions/{media_id}', pathParamMap);
    }

    /**
     * @summary List all Closed Captions Media
     * @param {string} manifestId Id of the hls manifest.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ClosedCaptionsApi
     */
    public list(manifestId: string, queryParams?: ClosedCaptionsMediaInfosListQueryParams): Promise<PaginationResponse<ClosedCaptionsMediaInfo>> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.get<PaginationResponse<ClosedCaptionsMediaInfo>>('/encoding/manifests/hls/{manifest_id}/media/closed-captions', pathParamMap, queryParams);
    }

}
