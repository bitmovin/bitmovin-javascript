import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import AzureOutput from '../../../models/AzureOutput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import AzureOutputsListQueryParams from './AzureOutputsListQueryParams';

/**
 * AzureApi - object-oriented interface
 * @export
 * @class AzureApi
 * @extends {BaseAPI}
 */
export default class AzureApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Azure Output
     * @param {AzureOutput} [azureOutput] The Azure output to be created
     * @throws {RequiredError}
     * @memberof AzureApi
     */
    public create(azureOutput?: AzureOutput): Promise<AzureOutput> {
        return this.restClient.post<AzureOutput>('/encoding/outputs/azure', {}, azureOutput);
    }

    /**
     * @summary Delete Azure Output
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof AzureApi
     */
    public delete(outputId: string): Promise<AzureOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.delete<AzureOutput>('/encoding/outputs/azure/{output_id}', pathParamMap);
    }

    /**
     * @summary Azure Output Details
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof AzureApi
     */
    public get(outputId: string): Promise<AzureOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.get<AzureOutput>('/encoding/outputs/azure/{output_id}', pathParamMap);
    }

    /**
     * @summary List Azure Outputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof AzureApi
     */
    public list(queryParams?: AzureOutputsListQueryParams): Promise<PaginationResponse<AzureOutput>> {
        return this.restClient.get<PaginationResponse<AzureOutput>>('/encoding/outputs/azure', {}, queryParams);
    }

}
