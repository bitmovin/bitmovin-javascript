import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import LocalInput from '../../../models/LocalInput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import LocalInputsListQueryParams from './LocalInputsListQueryParams';

/**
 * LocalApi - object-oriented interface
 * @export
 * @class LocalApi
 * @extends {BaseAPI}
 */
export default class LocalApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Local Input
     * @param {LocalInput} [localInput] The LocalInput to be created.
     * @throws {RequiredError}
     * @memberof LocalApi
     */
    public create(localInput?: LocalInput): Promise<LocalInput> {
        return this.restClient.post<LocalInput>('/encoding/inputs/local', {}, localInput);
    }

    /**
     * @summary Delete Local Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof LocalApi
     */
    public delete(inputId: string): Promise<LocalInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<LocalInput>('/encoding/inputs/local/{input_id}', pathParamMap);
    }

    /**
     * @summary Local Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof LocalApi
     */
    public get(inputId: string): Promise<LocalInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<LocalInput>('/encoding/inputs/local/{input_id}', pathParamMap);
    }

    /**
     * @summary List Local Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof LocalApi
     */
    public list(queryParams?: LocalInputsListQueryParams): Promise<PaginationResponse<LocalInput>> {
        return this.restClient.get<PaginationResponse<LocalInput>>('/encoding/inputs/local', {}, queryParams);
    }

}
