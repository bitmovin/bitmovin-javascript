import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import HttpInput from '../../../models/HttpInput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import HttpInputsListQueryParams from './HttpInputsListQueryParams';

/**
 * HttpApi - object-oriented interface
 * @export
 * @class HttpApi
 * @extends {BaseAPI}
 */
export default class HttpApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create HTTP Input
     * @param {HttpInput} [httpInput] The HTTP input to be created
     * @throws {RequiredError}
     * @memberof HttpApi
     */
    public create(httpInput?: HttpInput): Promise<HttpInput> {
        return this.restClient.post<HttpInput>('/encoding/inputs/http', {}, httpInput);
    }

    /**
     * @summary Delete HTTP Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof HttpApi
     */
    public delete(inputId: string): Promise<HttpInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<HttpInput>('/encoding/inputs/http/{input_id}', pathParamMap);
    }

    /**
     * @summary HTTP Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof HttpApi
     */
    public get(inputId: string): Promise<HttpInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<HttpInput>('/encoding/inputs/http/{input_id}', pathParamMap);
    }

    /**
     * @summary List HTTP Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof HttpApi
     */
    public list(queryParams?: HttpInputsListQueryParams): Promise<PaginationResponse<HttpInput>> {
        return this.restClient.get<PaginationResponse<HttpInput>>('/encoding/inputs/http', {}, queryParams);
    }

}
