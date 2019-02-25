import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import PeriodsApi from './periods/PeriodsApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import DashManifest from '../../../models/DashManifest';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import Task from '../../../models/Task';
import PaginationResponse from '../../../models/PaginationResponse';
import DashManifestsListQueryParams from './DashManifestsListQueryParams';

/**
 * DashApi - object-oriented interface
 * @export
 * @class DashApi
 * @extends {BaseAPI}
 */
export default class DashApi extends BaseAPI {
    public customdata: CustomdataApi;
    public periods: PeriodsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.periods = new PeriodsApi(configuration);
    }

    /**
     * @summary Create DASH Manifest
     * @param {DashManifest} [dashManifest] The DASH manifest to be created
     * @throws {RequiredError}
     * @memberof DashApi
     */
    public create(dashManifest?: DashManifest): Promise<DashManifest> {
        return this.restClient.post<DashManifest>('/encoding/manifests/dash', {}, dashManifest);
    }

    /**
     * @summary Delete DASH Manifest
     * @param {string} manifestId UUID of the DASH manifest to be deleted
     * @throws {RequiredError}
     * @memberof DashApi
     */
    public delete(manifestId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}', pathParamMap);
    }

    /**
     * @summary DASH Manifest Details
     * @param {string} manifestId UUID of the dash manifest
     * @throws {RequiredError}
     * @memberof DashApi
     */
    public get(manifestId: string): Promise<DashManifest> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.get<DashManifest>('/encoding/manifests/dash/{manifest_id}', pathParamMap);
    }

    /**
     * @summary List DASH Manifests
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof DashApi
     */
    public list(queryParams?: DashManifestsListQueryParams): Promise<PaginationResponse<DashManifest>> {
        return this.restClient.get<PaginationResponse<DashManifest>>('/encoding/manifests/dash', {}, queryParams);
    }

    /**
     * @summary Start DASH Manifest Creation
     * @param {string} manifestId Id of the DASH manifest.
     * @throws {RequiredError}
     * @memberof DashApi
     */
    public start(manifestId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}/start', pathParamMap);
    }

    /**
     * @summary DASH Manifest Creation Status
     * @param {string} manifestId Id of the DASH manifest.
     * @throws {RequiredError}
     * @memberof DashApi
     */
    public status(manifestId: string): Promise<Task> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.get<Task>('/encoding/manifests/dash/{manifest_id}/status', pathParamMap);
    }

    /**
     * @summary Stop DASH Manifest Creation
     * @param {string} manifestId Id of the DASH manifest.
     * @throws {RequiredError}
     * @memberof DashApi
     */
    public stop(manifestId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}/stop', pathParamMap);
    }

}
