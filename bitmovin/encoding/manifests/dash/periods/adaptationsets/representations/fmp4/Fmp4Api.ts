import { BaseAPI } from '../../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../../common/RestClient';
import DrmApi from './drm/DrmApi';
import ContentprotectionApi from './contentprotection/ContentprotectionApi';
import BitmovinResponse from '../../../../../../../models/BitmovinResponse';
import DashFmp4Representation from '../../../../../../../models/DashFmp4Representation';
import DashSegmentedRepresentation from '../../../../../../../models/DashSegmentedRepresentation';
import ResponseEnvelope from '../../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../../models/PaginationResponse';
import DashFmp4RepresentationsListQueryParams from './DashFmp4RepresentationsListQueryParams';

/**
 * Fmp4Api - object-oriented interface
 * @export
 * @class Fmp4Api
 * @extends {BaseAPI}
 */
export default class Fmp4Api extends BaseAPI {
    public drm: DrmApi;
    public contentprotection: ContentprotectionApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.drm = new DrmApi(configuration);
        this.contentprotection = new ContentprotectionApi(configuration);
    }

    /**
     * @summary Add fMP4 Representation
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {DashFmp4Representation} [dashFmp4Representation] The fMP4 representation to be added to the adaptation set
     * @throws {RequiredError}
     * @memberof Fmp4Api
     */
    public create(manifestId: string, periodId: string, adaptationsetId: string, dashFmp4Representation?: DashFmp4Representation): Promise<DashFmp4Representation> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.post<DashFmp4Representation>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/fmp4', pathParamMap, dashFmp4Representation);
    }

    /**
     * @summary Delete fMP4 Representation
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the fMP4 representation to be deleted
     * @throws {RequiredError}
     * @memberof Fmp4Api
     */
    public delete(manifestId: string, periodId: string, adaptationsetId: string, representationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/fmp4/{representation_id}', pathParamMap);
    }

    /**
     * @summary fMP4 Representation Details
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the representation
     * @throws {RequiredError}
     * @memberof Fmp4Api
     */
    public get(manifestId: string, periodId: string, adaptationsetId: string, representationId: string): Promise<DashFmp4Representation> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.get<DashFmp4Representation>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/fmp4/{representation_id}', pathParamMap);
    }

    /**
     * @summary List all fMP4 Representations
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof Fmp4Api
     */
    public list(manifestId: string, periodId: string, adaptationsetId: string, queryParams?: DashFmp4RepresentationsListQueryParams): Promise<PaginationResponse<DashFmp4Representation>> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.get<PaginationResponse<DashFmp4Representation>>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/fmp4', pathParamMap, queryParams);
    }

}
