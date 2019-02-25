import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import ZixiInput from '../../../models/ZixiInput';
import PaginationResponse from '../../../models/PaginationResponse';
import ZixiInputsListQueryParams from './ZixiInputsListQueryParams';

/**
 * ZixiApi - object-oriented interface
 * @export
 * @class ZixiApi
 * @extends {BaseAPI}
 */
export default class ZixiApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Zixi input
     * @param {ZixiInput} [zixiInput] The ZixiInput to be created
     * @throws {RequiredError}
     * @memberof ZixiApi
     */
    public create(zixiInput?: ZixiInput): Promise<ZixiInput> {
        return this.restClient.post<ZixiInput>('/encoding/inputs/zixi', {}, zixiInput);
    }

    /**
     * @summary Delete Zixi input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof ZixiApi
     */
    public delete(inputId: string): Promise<ZixiInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<ZixiInput>('/encoding/inputs/zixi/{input_id}', pathParamMap);
    }

    /**
     * @summary Zixi Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof ZixiApi
     */
    public get(inputId: string): Promise<ZixiInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<ZixiInput>('/encoding/inputs/zixi/{input_id}', pathParamMap);
    }

    /**
     * @summary List Zixi inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ZixiApi
     */
    public list(queryParams?: ZixiInputsListQueryParams): Promise<PaginationResponse<ZixiInput>> {
        return this.restClient.get<PaginationResponse<ZixiInput>>('/encoding/inputs/zixi', {}, queryParams);
    }

}
