import { BaseAPI } from '../../../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../../../common/RestClient';
import BitmovinResponse from '../../../../../../../../models/BitmovinResponse';
import ContentProtection from '../../../../../../../../models/ContentProtection';
import ResponseEnvelope from '../../../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../../../models/PaginationResponse';
import ContentProtectionsListQueryParams from './ContentProtectionsListQueryParams';

/**
 * ContentprotectionApi - object-oriented interface
 * @export
 * @class ContentprotectionApi
 * @extends {BaseAPI}
 */
export default class ContentprotectionApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Content Protection to fMP4 Representation
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the representation
     * @param {ContentProtection} [contentProtection] The content protection to be added to the fMP4 representation
     * @throws {RequiredError}
     * @memberof ContentprotectionApi
     */
    public create(manifestId: string, periodId: string, adaptationsetId: string, representationId: string, contentProtection?: ContentProtection): Promise<ContentProtection> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.post<ContentProtection>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/fmp4/{representation_id}/contentprotection', pathParamMap, contentProtection);
    }

    /**
     * @summary Delete fMP4 Representation Content Protection
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the representation
     * @param {string} contentprotectionId Id of the DRM fMP4 content protection to be deleted
     * @throws {RequiredError}
     * @memberof ContentprotectionApi
     */
    public delete(manifestId: string, periodId: string, adaptationsetId: string, representationId: string, contentprotectionId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId,
            contentprotection_id: contentprotectionId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/fmp4/{representation_id}/contentprotection/{contentprotection_id}', pathParamMap);
    }

    /**
     * @summary fMP4 Representation Content Protection Details
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the representation
     * @param {string} contentprotectionId Id of the DRM fMP4 content protection
     * @throws {RequiredError}
     * @memberof ContentprotectionApi
     */
    public get(manifestId: string, periodId: string, adaptationsetId: string, representationId: string, contentprotectionId: string): Promise<ContentProtection> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId,
            contentprotection_id: contentprotectionId
        };
        return this.restClient.get<ContentProtection>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/fmp4/{representation_id}/contentprotection/{contentprotection_id}', pathParamMap);
    }

    /**
     * @summary List all fMP4 Representation Content Protections
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the adaptation set
     * @param {string} representationId Id of the representation
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ContentprotectionApi
     */
    public list(manifestId: string, periodId: string, adaptationsetId: string, representationId: string, queryParams?: ContentProtectionsListQueryParams): Promise<PaginationResponse<ContentProtection>> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId,
            representation_id: representationId
        };
        return this.restClient.get<PaginationResponse<ContentProtection>>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/{adaptationset_id}/representations/fmp4/{representation_id}/contentprotection', pathParamMap, queryParams);
    }

}
