import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import AdaptationSet from '../../../../../../models/AdaptationSet';
import BitmovinResponse from '../../../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../models/PaginationResponse';
import AdaptationSetsListQueryParams from './AdaptationSetsListQueryParams';

/**
 * CustomApi - object-oriented interface
 * @export
 * @class CustomApi
 * @extends {BaseAPI}
 */
export default class CustomApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Custom AdaptationSet
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {AdaptationSet} [adaptationSet] The custom adaptation set to be added to the period
     * @throws {RequiredError}
     * @memberof CustomApi
     */
    public create(manifestId: string, periodId: string, adaptationSet?: AdaptationSet): Promise<AdaptationSet> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId
        };
        return this.restClient.post<AdaptationSet>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/custom', pathParamMap, adaptationSet);
    }

    /**
     * @summary Delete Custom AdaptationSet
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the custom adaptation set to be deleted
     * @throws {RequiredError}
     * @memberof CustomApi
     */
    public delete(manifestId: string, periodId: string, adaptationsetId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/custom/{adaptationset_id}', pathParamMap);
    }

    /**
     * @summary Custom AdaptationSet Details
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} adaptationsetId Id of the custom adaptation set
     * @throws {RequiredError}
     * @memberof CustomApi
     */
    public get(manifestId: string, periodId: string, adaptationsetId: string): Promise<AdaptationSet> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            adaptationset_id: adaptationsetId
        };
        return this.restClient.get<AdaptationSet>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/custom/{adaptationset_id}', pathParamMap);
    }

    /**
     * @summary List all Custom AdaptationSets
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof CustomApi
     */
    public list(manifestId: string, periodId: string, queryParams?: AdaptationSetsListQueryParams): Promise<PaginationResponse<AdaptationSet>> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId
        };
        return this.restClient.get<PaginationResponse<AdaptationSet>>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/adaptationsets/custom', pathParamMap, queryParams);
    }

}
