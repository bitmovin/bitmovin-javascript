import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import AkamaiNetStorageOutput from '../../../models/AkamaiNetStorageOutput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import AkamaiNetStorageOutputsListQueryParams from './AkamaiNetStorageOutputsListQueryParams';

/**
 * AkamaiNetstorageApi - object-oriented interface
 * @export
 * @class AkamaiNetstorageApi
 * @extends {BaseAPI}
 */
export default class AkamaiNetstorageApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Akamai NetStorage Output
     * @param {AkamaiNetStorageOutput} [akamaiNetStorageOutput] The Akamai NetStorage output to be created
     * @throws {RequiredError}
     * @memberof AkamaiNetstorageApi
     */
    public create(akamaiNetStorageOutput?: AkamaiNetStorageOutput): Promise<AkamaiNetStorageOutput> {
        return this.restClient.post<AkamaiNetStorageOutput>('/encoding/outputs/akamai-netstorage', {}, akamaiNetStorageOutput);
    }

    /**
     * @summary Delete Akamai NetStorage Output
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof AkamaiNetstorageApi
     */
    public delete(outputId: string): Promise<AkamaiNetStorageOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.delete<AkamaiNetStorageOutput>('/encoding/outputs/akamai-netstorage/{output_id}', pathParamMap);
    }

    /**
     * @summary Akamai NetStorage Output Details
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof AkamaiNetstorageApi
     */
    public get(outputId: string): Promise<AkamaiNetStorageOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.get<AkamaiNetStorageOutput>('/encoding/outputs/akamai-netstorage/{output_id}', pathParamMap);
    }

    /**
     * @summary List Akamai NetStorage Outputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof AkamaiNetstorageApi
     */
    public list(queryParams?: AkamaiNetStorageOutputsListQueryParams): Promise<PaginationResponse<AkamaiNetStorageOutput>> {
        return this.restClient.get<PaginationResponse<AkamaiNetStorageOutput>>('/encoding/outputs/akamai-netstorage', {}, queryParams);
    }

}
