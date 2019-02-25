import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import Eac3AudioConfiguration from '../../../../models/Eac3AudioConfiguration';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import Eac3AudioConfigurationsListQueryParams from './Eac3AudioConfigurationsListQueryParams';

/**
 * Eac3Api - object-oriented interface
 * @export
 * @class Eac3Api
 * @extends {BaseAPI}
 */
export default class Eac3Api extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create E-AC3 Codec Configuration
     * @param {Eac3AudioConfiguration} [eac3AudioConfiguration]
     * @throws {RequiredError}
     * @memberof Eac3Api
     */
    public create(eac3AudioConfiguration?: Eac3AudioConfiguration): Promise<Eac3AudioConfiguration> {
        return this.restClient.post<Eac3AudioConfiguration>('/encoding/configurations/audio/eac3', {}, eac3AudioConfiguration);
    }

    /**
     * @summary Delete E-AC3 Codec Configuration
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof Eac3Api
     */
    public delete(configurationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/configurations/audio/eac3/{configuration_id}', pathParamMap);
    }

    /**
     * @summary E-AC3 Codec Configuration Details
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof Eac3Api
     */
    public get(configurationId: string): Promise<Eac3AudioConfiguration> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.get<Eac3AudioConfiguration>('/encoding/configurations/audio/eac3/{configuration_id}', pathParamMap);
    }

    /**
     * @summary List E-AC3 Configurations
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof Eac3Api
     */
    public list(queryParams?: Eac3AudioConfigurationsListQueryParams): Promise<PaginationResponse<Eac3AudioConfiguration>> {
        return this.restClient.get<PaginationResponse<Eac3AudioConfiguration>>('/encoding/configurations/audio/eac3', {}, queryParams);
    }

}
