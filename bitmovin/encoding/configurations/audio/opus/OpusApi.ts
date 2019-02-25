import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import OpusAudioConfiguration from '../../../../models/OpusAudioConfiguration';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import OpusAudioConfigurationsListQueryParams from './OpusAudioConfigurationsListQueryParams';

/**
 * OpusApi - object-oriented interface
 * @export
 * @class OpusApi
 * @extends {BaseAPI}
 */
export default class OpusApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Opus Codec Configuration
     * @param {OpusAudioConfiguration} [opusAudioConfiguration]
     * @throws {RequiredError}
     * @memberof OpusApi
     */
    public create(opusAudioConfiguration?: OpusAudioConfiguration): Promise<OpusAudioConfiguration> {
        return this.restClient.post<OpusAudioConfiguration>('/encoding/configurations/audio/opus', {}, opusAudioConfiguration);
    }

    /**
     * @summary Delete Opus Codec Configuration
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof OpusApi
     */
    public delete(configurationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/configurations/audio/opus/{configuration_id}', pathParamMap);
    }

    /**
     * @summary Opus Codec Configuration Details
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof OpusApi
     */
    public get(configurationId: string): Promise<OpusAudioConfiguration> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.get<OpusAudioConfiguration>('/encoding/configurations/audio/opus/{configuration_id}', pathParamMap);
    }

    /**
     * @summary List Opus Configurations
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof OpusApi
     */
    public list(queryParams?: OpusAudioConfigurationsListQueryParams): Promise<PaginationResponse<OpusAudioConfiguration>> {
        return this.restClient.get<PaginationResponse<OpusAudioConfiguration>>('/encoding/configurations/audio/opus', {}, queryParams);
    }

}
