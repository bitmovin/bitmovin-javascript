import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import RepresentationsApi from './representations/RepresentationsApi';
import ContentprotectionApi from './contentprotection/ContentprotectionApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import SmoothStreamingManifest from '../../../models/SmoothStreamingManifest';
import Task from '../../../models/Task';
import PaginationResponse from '../../../models/PaginationResponse';
import SmoothStreamingManifestsListQueryParams from './SmoothStreamingManifestsListQueryParams';

/**
 * SmoothApi - object-oriented interface
 * @export
 * @class SmoothApi
 * @extends {BaseAPI}
 */
export default class SmoothApi extends BaseAPI {
    public customdata: CustomdataApi;
    public representations: RepresentationsApi;
    public contentprotection: ContentprotectionApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.representations = new RepresentationsApi(configuration);
        this.contentprotection = new ContentprotectionApi(configuration);
    }

    /**
     * @summary Create Smooth Streaming Manifest
     * @param {SmoothStreamingManifest} [smoothStreamingManifest]
     * @throws {RequiredError}
     * @memberof SmoothApi
     */
    public create(smoothStreamingManifest?: SmoothStreamingManifest): Promise<SmoothStreamingManifest> {
        return this.restClient.post<SmoothStreamingManifest>('/encoding/manifests/smooth', {}, smoothStreamingManifest);
    }

    /**
     * @summary Delete Smooth Streaming Manifest
     * @param {string} manifestId Id of the Smooth Streaming manifest.
     * @throws {RequiredError}
     * @memberof SmoothApi
     */
    public delete(manifestId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/smooth/{manifest_id}', pathParamMap);
    }

    /**
     * @summary Smooth Streaming Manifest Details
     * @param {string} manifestId Id of the Smooth Streaming manifest.
     * @throws {RequiredError}
     * @memberof SmoothApi
     */
    public get(manifestId: string): Promise<SmoothStreamingManifest> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.get<SmoothStreamingManifest>('/encoding/manifests/smooth/{manifest_id}', pathParamMap);
    }

    /**
     * @summary List Smooth Streaming Manifests
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof SmoothApi
     */
    public list(queryParams?: SmoothStreamingManifestsListQueryParams): Promise<PaginationResponse<SmoothStreamingManifest>> {
        return this.restClient.get<PaginationResponse<SmoothStreamingManifest>>('/encoding/manifests/smooth', {}, queryParams);
    }

    /**
     * @summary Start Smooth Streaming Manifest Creation
     * @param {string} manifestId Id of the Smooth Streaming manifest.
     * @throws {RequiredError}
     * @memberof SmoothApi
     */
    public start(manifestId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/manifests/smooth/{manifest_id}/start', pathParamMap);
    }

    /**
     * @summary Smooth Streaming Manifest Creation Status
     * @param {string} manifestId Id of the Smooth Streaming manifest.
     * @throws {RequiredError}
     * @memberof SmoothApi
     */
    public status(manifestId: string): Promise<Task> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.get<Task>('/encoding/manifests/smooth/{manifest_id}/status', pathParamMap);
    }

    /**
     * @summary Stop Smooth Streaming Manifest Creation
     * @param {string} manifestId Id of the Smooth Streaming manifest.
     * @throws {RequiredError}
     * @memberof SmoothApi
     */
    public stop(manifestId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/manifests/smooth/{manifest_id}/stop', pathParamMap);
    }

}
