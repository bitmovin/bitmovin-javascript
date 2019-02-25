import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import AacAudioConfiguration from '../../../../models/AacAudioConfiguration';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import AacAudioConfigurationsListQueryParams from './AacAudioConfigurationsListQueryParams';

/**
 * AacApi - object-oriented interface
 * @export
 * @class AacApi
 * @extends {BaseAPI}
 */
export default class AacApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create AAC Codec Configuration
     * @param {AacAudioConfiguration} [aacAudioConfiguration]
     * @throws {RequiredError}
     * @memberof AacApi
     */
    public create(aacAudioConfiguration?: AacAudioConfiguration): Promise<AacAudioConfiguration> {
        return this.restClient.post<AacAudioConfiguration>('/encoding/configurations/audio/aac', {}, aacAudioConfiguration);
    }

    /**
     * @summary Delete AAC Codec Configuration
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof AacApi
     */
    public delete(configurationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/configurations/audio/aac/{configuration_id}', pathParamMap);
    }

    /**
     * @summary AAC Codec Configuration Details
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof AacApi
     */
    public get(configurationId: string): Promise<AacAudioConfiguration> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.get<AacAudioConfiguration>('/encoding/configurations/audio/aac/{configuration_id}', pathParamMap);
    }

    /**
     * @summary List AAC Configurations
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof AacApi
     */
    public list(queryParams?: AacAudioConfigurationsListQueryParams): Promise<PaginationResponse<AacAudioConfiguration>> {
        return this.restClient.get<PaginationResponse<AacAudioConfiguration>>('/encoding/configurations/audio/aac', {}, queryParams);
    }

}
