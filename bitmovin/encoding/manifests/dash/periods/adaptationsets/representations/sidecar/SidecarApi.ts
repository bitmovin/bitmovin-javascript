import { BaseAPI } from '../../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../../common/RestClient';
import BitmovinResponse from '../../../../../../../models/BitmovinResponse';
import DashSidecarRepresentation from '../../../../../../../models/DashSidecarRepresentation';
import ResponseEnvelope from '../../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../../models/PaginationResponse';
import DashSidecarRepresentationsListQueryParams from './DashSidecarRepresentationsListQueryParams';

/**
 * SidecarApi - object-oriented interface
 * @export
 * @class SidecarApi
 * @extends {BaseAPI}
 */
export default class SidecarApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Sidecar Representation
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {DashSidecarRepresentation} [dashSidecarRepresentation] The sidecar representation to be added to the adaptation set
     * @throws {RequiredError}
     * @memberof SidecarApi
     */
    public create(manifestId: string, periodId: string, adaptationsetId: string, dashSidecarRepresentation?: DashSidecarRepresentation): Promise<DashSidecarRepresentation> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.post<DashSidecarRepresentation>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/sidecar', pathParamMap, dashSidecarRepresentation);
    }

    /**
     * @summary Delete Sidecar Representation
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the Sidecar representation to be deleted
     * @throws {RequiredError}
     * @memberof SidecarApi
     */
    public delete(manifestId: string, periodId: string, adaptationsetId: string, representationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/sidecar/{representation_id}', pathParamMap);
    }

    /**
     * @summary Sidecar Representation Details
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the representation
     * @throws {RequiredError}
     * @memberof SidecarApi
     */
    public get(manifestId: string, periodId: string, adaptationsetId: string, representationId: string): Promise<DashSidecarRepresentation> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.get<DashSidecarRepresentation>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/sidecar/{representation_id}', pathParamMap);
    }

    /**
     * @summary List all Sidecar Representations
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof SidecarApi
     */
    public list(manifestId: string, periodId: string, adaptationsetId: string, queryParams?: DashSidecarRepresentationsListQueryParams): Promise<PaginationResponse<DashSidecarRepresentation>> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.get<PaginationResponse<DashSidecarRepresentation>>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/sidecar', pathParamMap, queryParams);
    }

}
