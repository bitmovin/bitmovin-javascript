import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import AdaptationSet from '../../../../../../models/AdaptationSet';
import BitmovinResponse from '../../../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import VideoAdaptationSet from '../../../../../../models/VideoAdaptationSet';
import PaginationResponse from '../../../../../../models/PaginationResponse';
import VideoAdaptationSetsListQueryParams from './VideoAdaptationSetsListQueryParams';

/**
 * VideoApi - object-oriented interface
 * @export
 * @class VideoApi
 * @extends {BaseAPI}
 */
export default class VideoApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Video AdaptationSet
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {VideoAdaptationSet} [videoAdaptationSet] The video adaptation set to be added to the period
     * @throws {RequiredError}
     * @memberof VideoApi
     */
    public create(manifestId: string, periodId: string, videoAdaptationSet?: VideoAdaptationSet): Promise<VideoAdaptationSet> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId
        };
        return this.restClient.post<VideoAdaptationSet>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/video', pathParamMap, videoAdaptationSet);
    }

    /**
     * @summary Delete Video AdaptationSet
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the video adaptation set to be deleted
     * @throws {RequiredError}
     * @memberof VideoApi
     */
    public delete(manifestId: string, periodId: string, adaptationsetId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/video/{adaptationset_id}', pathParamMap);
    }

    /**
     * @summary Video AdaptationSet Details
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the video adaptation set
     * @throws {RequiredError}
     * @memberof VideoApi
     */
    public get(manifestId: string, periodId: string, adaptationsetId: string): Promise<VideoAdaptationSet> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.get<VideoAdaptationSet>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/video/{adaptationset_id}', pathParamMap);
    }

    /**
     * @summary List all Video AdaptationSets
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof VideoApi
     */
    public list(manifestId: string, periodId: string, queryParams?: VideoAdaptationSetsListQueryParams): Promise<PaginationResponse<VideoAdaptationSet>> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId
        };
        return this.restClient.get<PaginationResponse<VideoAdaptationSet>>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/video', pathParamMap, queryParams);
    }

}
