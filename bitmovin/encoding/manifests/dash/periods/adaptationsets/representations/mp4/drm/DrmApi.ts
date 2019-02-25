import { BaseAPI } from '../../../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../../../common/RestClient';
import BitmovinResponse from '../../../../../../../../models/BitmovinResponse';
import DashMp4DrmRepresentation from '../../../../../../../../models/DashMp4DrmRepresentation';
import ResponseEnvelope from '../../../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../../../models/PaginationResponse';
import DashMp4DrmRepresentationsListQueryParams from './DashMp4DrmRepresentationsListQueryParams';

/**
 * DrmApi - object-oriented interface
 * @export
 * @class DrmApi
 * @extends {BaseAPI}
 */
export default class DrmApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add DRM MP4 Representation
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {DashMp4DrmRepresentation} [dashMp4DrmRepresentation] The DRM MP4 representation to be added to the adaptation set
     * @throws {RequiredError}
     * @memberof DrmApi
     */
    public create(manifestId: string, periodId: string, adaptationsetId: string, dashMp4DrmRepresentation?: DashMp4DrmRepresentation): Promise<DashMp4DrmRepresentation> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.post<DashMp4DrmRepresentation>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/mp4/drm', pathParamMap, dashMp4DrmRepresentation);
    }

    /**
     * @summary Delete DRM MP4 Representation
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the DRM MP4 representation to be deleted
     * @throws {RequiredError}
     * @memberof DrmApi
     */
    public delete(manifestId: string, periodId: string, adaptationsetId: string, representationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/mp4/drm/{representation_id}', pathParamMap);
    }

    /**
     * @summary DRM MP4 Representation Details
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the representation
     * @throws {RequiredError}
     * @memberof DrmApi
     */
    public get(manifestId: string, periodId: string, adaptationsetId: string, representationId: string): Promise<DashMp4DrmRepresentation> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.get<DashMp4DrmRepresentation>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/mp4/drm/{representation_id}', pathParamMap);
    }

    /**
     * @summary List all DRM MP4 Representations
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof DrmApi
     */
    public list(manifestId: string, periodId: string, adaptationsetId: string, queryParams?: DashMp4DrmRepresentationsListQueryParams): Promise<PaginationResponse<DashMp4DrmRepresentation>> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.get<PaginationResponse<DashMp4DrmRepresentation>>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/mp4/drm', pathParamMap, queryParams);
    }

}
