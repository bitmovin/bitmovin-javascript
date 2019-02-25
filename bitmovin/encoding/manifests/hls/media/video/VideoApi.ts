import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import IframeApi from './iframe/IframeApi';
import BitmovinResponse from '../../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import StandardMediaInfo from '../../../../../models/StandardMediaInfo';
import VideoMediaInfo from '../../../../../models/VideoMediaInfo';
import PaginationResponse from '../../../../../models/PaginationResponse';
import VideoMediaInfosListQueryParams from './VideoMediaInfosListQueryParams';

/**
 * VideoApi - object-oriented interface
 * @export
 * @class VideoApi
 * @extends {BaseAPI}
 */
export default class VideoApi extends BaseAPI {
    public iframe: IframeApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.iframe = new IframeApi(configuration);
    }

    /**
     * @summary Add Video Media
     * @param {string} manifestId Id of the hls manifest.
     * @param {VideoMediaInfo} [videoMediaInfo]
     * @throws {RequiredError}
     * @memberof VideoApi
     */
    public create(manifestId: string, videoMediaInfo?: VideoMediaInfo): Promise<VideoMediaInfo> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.post<VideoMediaInfo>('/encoding/manifests/hls/{manifest_id}/media/video', pathParamMap, videoMediaInfo);
    }

    /**
     * @summary Delete Video Media
     * @param {string} manifestId Id of the hls manifest.
     * @param {string} mediaId Id of the video media.
     * @throws {RequiredError}
     * @memberof VideoApi
     */
    public delete(manifestId: string, mediaId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            media_id: mediaId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/hls/{manifest_id}/media/video/{media_id}', pathParamMap);
    }

    /**
     * @summary Video Media Details
     * @param {string} manifestId Id of the hls manifest.
     * @param {string} mediaId Id of the video media.
     * @throws {RequiredError}
     * @memberof VideoApi
     */
    public get(manifestId: string, mediaId: string): Promise<VideoMediaInfo> {
        const pathParamMap = {
            manifest_id: manifestId,
            media_id: mediaId
        };
        return this.restClient.get<VideoMediaInfo>('/encoding/manifests/hls/{manifest_id}/media/video/{media_id}', pathParamMap);
    }

    /**
     * @summary List all Video Media
     * @param {string} manifestId Id of the hls manifest.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof VideoApi
     */
    public list(manifestId: string, queryParams?: VideoMediaInfosListQueryParams): Promise<PaginationResponse<VideoMediaInfo>> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.get<PaginationResponse<VideoMediaInfo>>('/encoding/manifests/hls/{manifest_id}/media/video', pathParamMap, queryParams);
    }

}
