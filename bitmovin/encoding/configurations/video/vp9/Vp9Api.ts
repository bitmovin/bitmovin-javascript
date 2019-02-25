import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import Vp9VideoConfiguration from '../../../../models/Vp9VideoConfiguration';
import PaginationResponse from '../../../../models/PaginationResponse';
import Vp9VideoConfigurationsListQueryParams from './Vp9VideoConfigurationsListQueryParams';

/**
 * Vp9Api - object-oriented interface
 * @export
 * @class Vp9Api
 * @extends {BaseAPI}
 */
export default class Vp9Api extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create VP9 Codec Configuration
     * @param {Vp9VideoConfiguration} [vp9VideoConfiguration]
     * @throws {RequiredError}
     * @memberof Vp9Api
     */
    public create(vp9VideoConfiguration?: Vp9VideoConfiguration): Promise<Vp9VideoConfiguration> {
        return this.restClient.post<Vp9VideoConfiguration>('/encoding/configurations/video/vp9', {}, vp9VideoConfiguration);
    }

    /**
     * @summary Delete VP9 Codec Configuration
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof Vp9Api
     */
    public delete(configurationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/configurations/video/vp9/{configuration_id}', pathParamMap);
    }

    /**
     * @summary VP9 Codec Configuration Details
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof Vp9Api
     */
    public get(configurationId: string): Promise<Vp9VideoConfiguration> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.get<Vp9VideoConfiguration>('/encoding/configurations/video/vp9/{configuration_id}', pathParamMap);
    }

    /**
     * @summary List VP9 Codec Configurations
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof Vp9Api
     */
    public list(queryParams?: Vp9VideoConfigurationsListQueryParams): Promise<PaginationResponse<Vp9VideoConfiguration>> {
        return this.restClient.get<PaginationResponse<Vp9VideoConfiguration>>('/encoding/configurations/video/vp9', {}, queryParams);
    }

}
