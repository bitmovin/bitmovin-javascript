import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import H264VideoConfiguration from '../../../../models/H264VideoConfiguration';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import H264VideoConfigurationsListQueryParams from './H264VideoConfigurationsListQueryParams';

/**
 * H264Api - object-oriented interface
 * @export
 * @class H264Api
 * @extends {BaseAPI}
 */
export default class H264Api extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create H264/AVC Codec Configuration
     * @param {H264VideoConfiguration} [h264VideoConfiguration]
     * @throws {RequiredError}
     * @memberof H264Api
     */
    public create(h264VideoConfiguration?: H264VideoConfiguration): Promise<H264VideoConfiguration> {
        return this.restClient.post<H264VideoConfiguration>('/encoding/configurations/video/h264', {}, h264VideoConfiguration);
    }

    /**
     * @summary Delete H264/AVC Codec Configuration
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof H264Api
     */
    public delete(configurationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/configurations/video/h264/{configuration_id}', pathParamMap);
    }

    /**
     * @summary H264/AVC Codec Configuration Details
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof H264Api
     */
    public get(configurationId: string): Promise<H264VideoConfiguration> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.get<H264VideoConfiguration>('/encoding/configurations/video/h264/{configuration_id}', pathParamMap);
    }

    /**
     * @summary List H264/AVC Codec Configurations
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof H264Api
     */
    public list(queryParams?: H264VideoConfigurationsListQueryParams): Promise<PaginationResponse<H264VideoConfiguration>> {
        return this.restClient.get<PaginationResponse<H264VideoConfiguration>>('/encoding/configurations/video/h264', {}, queryParams);
    }

}
