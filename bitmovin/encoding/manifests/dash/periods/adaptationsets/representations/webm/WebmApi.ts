import { BaseAPI } from '../../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../../common/RestClient';
import ContentprotectionApi from './contentprotection/ContentprotectionApi';
import BitmovinResponse from '../../../../../../../models/BitmovinResponse';
import DashSegmentedRepresentation from '../../../../../../../models/DashSegmentedRepresentation';
import DashWebmRepresentation from '../../../../../../../models/DashWebmRepresentation';
import ResponseEnvelope from '../../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../../models/PaginationResponse';
import DashWebmRepresentationsListQueryParams from './DashWebmRepresentationsListQueryParams';

/**
 * WebmApi - object-oriented interface
 * @export
 * @class WebmApi
 * @extends {BaseAPI}
 */
export default class WebmApi extends BaseAPI {
    public contentprotection: ContentprotectionApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.contentprotection = new ContentprotectionApi(configuration);
    }

    /**
     * @summary Add WebM Representation
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {DashWebmRepresentation} [dashWebmRepresentation] The WebM representation to be added to the adaptation set
     * @throws {RequiredError}
     * @memberof WebmApi
     */
    public create(manifestId: string, periodId: string, adaptationsetId: string, dashWebmRepresentation?: DashWebmRepresentation): Promise<DashWebmRepresentation> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.post<DashWebmRepresentation>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/webm', pathParamMap, dashWebmRepresentation);
    }

    /**
     * @summary Delete WebM Representation
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the WebM representation to be deleted
     * @throws {RequiredError}
     * @memberof WebmApi
     */
    public delete(manifestId: string, periodId: string, adaptationsetId: string, representationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/webm/{representation_id}', pathParamMap);
    }

    /**
     * @summary WebM Representation Details
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the representation
     * @throws {RequiredError}
     * @memberof WebmApi
     */
    public get(manifestId: string, periodId: string, adaptationsetId: string, representationId: string): Promise<DashWebmRepresentation> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.get<DashWebmRepresentation>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/webm/{representation_id}', pathParamMap);
    }

    /**
     * @summary List all WebM Representations
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof WebmApi
     */
    public list(manifestId: string, periodId: string, adaptationsetId: string, queryParams?: DashWebmRepresentationsListQueryParams): Promise<PaginationResponse<DashWebmRepresentation>> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.get<PaginationResponse<DashWebmRepresentation>>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/webm', pathParamMap, queryParams);
    }

}
