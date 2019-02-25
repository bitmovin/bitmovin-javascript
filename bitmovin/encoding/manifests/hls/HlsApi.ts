import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import StreamsApi from './streams/StreamsApi';
import MediaApi from './media/MediaApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import HlsManifest from '../../../models/HlsManifest';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import Task from '../../../models/Task';
import PaginationResponse from '../../../models/PaginationResponse';
import HlsManifestsListQueryParams from './HlsManifestsListQueryParams';

/**
 * HlsApi - object-oriented interface
 * @export
 * @class HlsApi
 * @extends {BaseAPI}
 */
export default class HlsApi extends BaseAPI {
    public customdata: CustomdataApi;
    public streams: StreamsApi;
    public media: MediaApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.streams = new StreamsApi(configuration);
        this.media = new MediaApi(configuration);
    }

    /**
     * @summary Create HLS Manifest
     * @param {HlsManifest} [hlsManifest]
     * @throws {RequiredError}
     * @memberof HlsApi
     */
    public create(hlsManifest?: HlsManifest): Promise<HlsManifest> {
        return this.restClient.post<HlsManifest>('/encoding/manifests/hls', {}, hlsManifest);
    }

    /**
     * @summary Delete HLS Manifest
     * @param {string} manifestId Id of the hls manifest.
     * @throws {RequiredError}
     * @memberof HlsApi
     */
    public delete(manifestId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/hls/{manifest_id}', pathParamMap);
    }

    /**
     * @summary HLS Manifest Details
     * @param {string} manifestId Id of the hls manifest.
     * @throws {RequiredError}
     * @memberof HlsApi
     */
    public get(manifestId: string): Promise<HlsManifest> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.get<HlsManifest>('/encoding/manifests/hls/{manifest_id}', pathParamMap);
    }

    /**
     * @summary List HLS Manifests
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof HlsApi
     */
    public list(queryParams?: HlsManifestsListQueryParams): Promise<PaginationResponse<HlsManifest>> {
        return this.restClient.get<PaginationResponse<HlsManifest>>('/encoding/manifests/hls', {}, queryParams);
    }

    /**
     * @summary Start HLS Manifest Creation
     * @param {string} manifestId Id of the HLS manifest.
     * @throws {RequiredError}
     * @memberof HlsApi
     */
    public start(manifestId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/manifests/hls/{manifest_id}/start', pathParamMap);
    }

    /**
     * @summary HLS Manifest Creation Status
     * @param {string} manifestId Id of the HLS manifest.
     * @throws {RequiredError}
     * @memberof HlsApi
     */
    public status(manifestId: string): Promise<Task> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.get<Task>('/encoding/manifests/hls/{manifest_id}/status', pathParamMap);
    }

    /**
     * @summary Stop HLS Manifest Creation
     * @param {string} manifestId Id of the HLS manifest.
     * @throws {RequiredError}
     * @memberof HlsApi
     */
    public stop(manifestId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/manifests/hls/{manifest_id}/stop', pathParamMap);
    }

}
