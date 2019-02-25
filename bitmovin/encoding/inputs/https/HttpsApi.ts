import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import HttpsInput from '../../../models/HttpsInput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import HttpsInputsListQueryParams from './HttpsInputsListQueryParams';

/**
 * HttpsApi - object-oriented interface
 * @export
 * @class HttpsApi
 * @extends {BaseAPI}
 */
export default class HttpsApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create HTTPS Input
     * @param {HttpsInput} [httpsInput] The Https input to be created
     * @throws {RequiredError}
     * @memberof HttpsApi
     */
    public create(httpsInput?: HttpsInput): Promise<HttpsInput> {
        return this.restClient.post<HttpsInput>('/encoding/inputs/https', {}, httpsInput);
    }

    /**
     * @summary Delete HTTPS Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof HttpsApi
     */
    public delete(inputId: string): Promise<HttpsInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<HttpsInput>('/encoding/inputs/https/{input_id}', pathParamMap);
    }

    /**
     * @summary HTTPS Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof HttpsApi
     */
    public get(inputId: string): Promise<HttpsInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<HttpsInput>('/encoding/inputs/https/{input_id}', pathParamMap);
    }

    /**
     * @summary List HTTPS Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof HttpsApi
     */
    public list(queryParams?: HttpsInputsListQueryParams): Promise<PaginationResponse<HttpsInput>> {
        return this.restClient.get<PaginationResponse<HttpsInput>>('/encoding/inputs/https', {}, queryParams);
    }

}
