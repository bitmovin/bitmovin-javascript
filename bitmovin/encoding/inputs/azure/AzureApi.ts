import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import AzureInput from '../../../models/AzureInput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import AzureInputsListQueryParams from './AzureInputsListQueryParams';

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
     * @summary Create Azure Input
     * @param {AzureInput} [azureInput] The Azure input to be created
     * @throws {RequiredError}
     * @memberof AzureApi
     */
    public create(azureInput?: AzureInput): Promise<AzureInput> {
        return this.restClient.post<AzureInput>('/encoding/inputs/azure', {}, azureInput);
    }

    /**
     * @summary Delete Azure Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof AzureApi
     */
    public delete(inputId: string): Promise<AzureInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<AzureInput>('/encoding/inputs/azure/{input_id}', pathParamMap);
    }

    /**
     * @summary Azure Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof AzureApi
     */
    public get(inputId: string): Promise<AzureInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<AzureInput>('/encoding/inputs/azure/{input_id}', pathParamMap);
    }

    /**
     * @summary List Azure Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof AzureApi
     */
    public list(queryParams?: AzureInputsListQueryParams): Promise<PaginationResponse<AzureInput>> {
        return this.restClient.get<PaginationResponse<AzureInput>>('/encoding/inputs/azure', {}, queryParams);
    }

}
