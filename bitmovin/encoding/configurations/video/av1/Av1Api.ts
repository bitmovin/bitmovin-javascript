import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import Av1VideoConfiguration from '../../../../models/Av1VideoConfiguration';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import Av1VideoConfigurationsListQueryParams from './Av1VideoConfigurationsListQueryParams';

/**
 * Av1Api - object-oriented interface
 * @export
 * @class Av1Api
 * @extends {BaseAPI}
 */
export default class Av1Api extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create AV1 Codec Configuration
     * @param {Av1VideoConfiguration} [av1VideoConfiguration]
     * @throws {RequiredError}
     * @memberof Av1Api
     */
    public create(av1VideoConfiguration?: Av1VideoConfiguration): Promise<Av1VideoConfiguration> {
        return this.restClient.post<Av1VideoConfiguration>('/encoding/configurations/video/av1', {}, av1VideoConfiguration);
    }

    /**
     * @summary Delete AV1 Codec Configuration
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof Av1Api
     */
    public delete(configurationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/configurations/video/av1/{configuration_id}', pathParamMap);
    }

    /**
     * @summary AV1 Codec Configuration Details
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof Av1Api
     */
    public get(configurationId: string): Promise<Av1VideoConfiguration> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.get<Av1VideoConfiguration>('/encoding/configurations/video/av1/{configuration_id}', pathParamMap);
    }

    /**
     * @summary List AV1 Codec Configurations
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof Av1Api
     */
    public list(queryParams?: Av1VideoConfigurationsListQueryParams): Promise<PaginationResponse<Av1VideoConfiguration>> {
        return this.restClient.get<PaginationResponse<Av1VideoConfiguration>>('/encoding/configurations/video/av1', {}, queryParams);
    }

}
