import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import TypeApi from './type/TypeApi';
import VideoApi from './video/VideoApi';
import AudioApi from './audio/AudioApi';
import CodecConfiguration from '../../models/CodecConfiguration';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import PaginationResponse from '../../models/PaginationResponse';
import CodecConfigurationsListQueryParams from './CodecConfigurationsListQueryParams';

/**
 * ConfigurationsApi - object-oriented interface
 * @export
 * @class ConfigurationsApi
 * @extends {BaseAPI}
 */
export default class ConfigurationsApi extends BaseAPI {
    public type: TypeApi;
    public video: VideoApi;
    public audio: AudioApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.type = new TypeApi(configuration);
        this.video = new VideoApi(configuration);
        this.audio = new AudioApi(configuration);
    }

    /**
     * @summary List all Codec Configurations
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ConfigurationsApi
     */
    public list(queryParams?: CodecConfigurationsListQueryParams): Promise<PaginationResponse<CodecConfiguration>> {
        return this.restClient.get<PaginationResponse<CodecConfiguration>>('/encoding/configurations', {}, queryParams);
    }

}
