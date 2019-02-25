import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import H265VideoConfiguration from '../../../../models/H265VideoConfiguration';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import H265VideoConfigurationsListQueryParams from './H265VideoConfigurationsListQueryParams';

/**
 * H265Api - object-oriented interface
 * @export
 * @class H265Api
 * @extends {BaseAPI}
 */
export default class H265Api extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create H265/HEVC Codec Configuration
     * @param {H265VideoConfiguration} [h265VideoConfiguration]
     * @throws {RequiredError}
     * @memberof H265Api
     */
    public create(h265VideoConfiguration?: H265VideoConfiguration): Promise<H265VideoConfiguration> {
        return this.restClient.post<H265VideoConfiguration>('/encoding/configurations/video/h265', {}, h265VideoConfiguration);
    }

    /**
     * @summary Delete H265/HEVC Codec Configuration
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof H265Api
     */
    public delete(configurationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/configurations/video/h265/{configuration_id}', pathParamMap);
    }

    /**
     * @summary H265/HEVC Codec Configuration Details
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof H265Api
     */
    public get(configurationId: string): Promise<H265VideoConfiguration> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.get<H265VideoConfiguration>('/encoding/configurations/video/h265/{configuration_id}', pathParamMap);
    }

    /**
     * @summary List H265/HEVC Codec Configurations
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof H265Api
     */
    public list(queryParams?: H265VideoConfigurationsListQueryParams): Promise<PaginationResponse<H265VideoConfiguration>> {
        return this.restClient.get<PaginationResponse<H265VideoConfiguration>>('/encoding/configurations/video/h265', {}, queryParams);
    }

}
