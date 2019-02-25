import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import S3RoleBasedInput from '../../../models/S3RoleBasedInput';
import PaginationResponse from '../../../models/PaginationResponse';
import S3RoleBasedInputsListQueryParams from './S3RoleBasedInputsListQueryParams';

/**
 * S3RoleBasedApi - object-oriented interface
 * @export
 * @class S3RoleBasedApi
 * @extends {BaseAPI}
 */
export default class S3RoleBasedApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create S3 Role-based Input
     * @param {S3RoleBasedInput} [s3RoleBasedInput] The S3 Role-based input to be created
     * @throws {RequiredError}
     * @memberof S3RoleBasedApi
     */
    public create(s3RoleBasedInput?: S3RoleBasedInput): Promise<S3RoleBasedInput> {
        return this.restClient.post<S3RoleBasedInput>('/encoding/inputs/s3-role-based', {}, s3RoleBasedInput);
    }

    /**
     * @summary Delete S3 Role-based Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof S3RoleBasedApi
     */
    public delete(inputId: string): Promise<S3RoleBasedInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<S3RoleBasedInput>('/encoding/inputs/s3-role-based/{input_id}', pathParamMap);
    }

    /**
     * @summary S3 Role-based Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof S3RoleBasedApi
     */
    public get(inputId: string): Promise<S3RoleBasedInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<S3RoleBasedInput>('/encoding/inputs/s3-role-based/{input_id}', pathParamMap);
    }

    /**
     * @summary List S3 Role-based Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof S3RoleBasedApi
     */
    public list(queryParams?: S3RoleBasedInputsListQueryParams): Promise<PaginationResponse<S3RoleBasedInput>> {
        return this.restClient.get<PaginationResponse<S3RoleBasedInput>>('/encoding/inputs/s3-role-based', {}, queryParams);
    }

}
