import { BaseAPI } from '../../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../../common/RestClient';
import DrmApi from './drm/DrmApi';
import BitmovinResponse from '../../../../../../../models/BitmovinResponse';
import DashMp4Representation from '../../../../../../../models/DashMp4Representation';
import ResponseEnvelope from '../../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../../models/PaginationResponse';
import DashMp4RepresentationsListQueryParams from './DashMp4RepresentationsListQueryParams';

/**
 * Mp4Api - object-oriented interface
 * @export
 * @class Mp4Api
 * @extends {BaseAPI}
 */
export default class Mp4Api extends BaseAPI {
    public drm: DrmApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.drm = new DrmApi(configuration);
    }

    /**
     * @summary Add MP4 Representation
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {DashMp4Representation} [dashMp4Representation] The MP4 representation to be added to the adaptation set
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public create(manifestId: string, periodId: string, adaptationsetId: string, dashMp4Representation?: DashMp4Representation): Promise<DashMp4Representation> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.post<DashMp4Representation>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/mp4', pathParamMap, dashMp4Representation);
    }

    /**
     * @summary Delete MP4 Representation
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the MP4 representation to be deleted
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public delete(manifestId: string, periodId: string, adaptationsetId: string, representationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/mp4/{representation_id}', pathParamMap);
    }

    /**
     * @summary MP4 Representation Details
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the representation
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public get(manifestId: string, periodId: string, adaptationsetId: string, representationId: string): Promise<DashMp4Representation> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.get<DashMp4Representation>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/mp4/{representation_id}', pathParamMap);
    }

    /**
     * @summary List all MP4 Representations
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public list(manifestId: string, periodId: string, adaptationsetId: string, queryParams?: DashMp4RepresentationsListQueryParams): Promise<PaginationResponse<DashMp4Representation>> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.get<PaginationResponse<DashMp4Representation>>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/mp4', pathParamMap, queryParams);
    }

}
