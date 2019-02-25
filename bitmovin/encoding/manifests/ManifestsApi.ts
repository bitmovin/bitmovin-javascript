import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import TypeApi from './type/TypeApi';
import DashApi from './dash/DashApi';
import HlsApi from './hls/HlsApi';
import SmoothApi from './smooth/SmoothApi';
import Manifest from '../../models/Manifest';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import PaginationResponse from '../../models/PaginationResponse';
import ManifestsListQueryParams from './ManifestsListQueryParams';

/**
 * ManifestsApi - object-oriented interface
 * @export
 * @class ManifestsApi
 * @extends {BaseAPI}
 */
export default class ManifestsApi extends BaseAPI {
    public type: TypeApi;
    public dash: DashApi;
    public hls: HlsApi;
    public smooth: SmoothApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.type = new TypeApi(configuration);
        this.dash = new DashApi(configuration);
        this.hls = new HlsApi(configuration);
        this.smooth = new SmoothApi(configuration);
    }

    /**
     * @summary List all Manifests
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ManifestsApi
     */
    public list(queryParams?: ManifestsListQueryParams): Promise<PaginationResponse<Manifest>> {
        return this.restClient.get<PaginationResponse<Manifest>>('/encoding/manifests', {}, queryParams);
    }

}
