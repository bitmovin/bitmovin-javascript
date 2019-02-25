import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import S3RoleBasedOutput from '../../../models/S3RoleBasedOutput';
import PaginationResponse from '../../../models/PaginationResponse';
import S3RoleBasedOutputsListQueryParams from './S3RoleBasedOutputsListQueryParams';

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
     * @summary Create S3 Role-based Output
     * @param {S3RoleBasedOutput} [s3RoleBasedOutput] The S3 Role-based output to be created
     * @throws {RequiredError}
     * @memberof S3RoleBasedApi
     */
    public create(s3RoleBasedOutput?: S3RoleBasedOutput): Promise<S3RoleBasedOutput> {
        return this.restClient.post<S3RoleBasedOutput>('/encoding/outputs/s3-role-based', {}, s3RoleBasedOutput);
    }

    /**
     * @summary Delete S3 Role-based Output
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof S3RoleBasedApi
     */
    public delete(outputId: string): Promise<S3RoleBasedOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.delete<S3RoleBasedOutput>('/encoding/outputs/s3-role-based/{output_id}', pathParamMap);
    }

    /**
     * @summary S3 Role-based Output Details
     * @param {string} outputId Id of the input
     * @throws {RequiredError}
     * @memberof S3RoleBasedApi
     */
    public get(outputId: string): Promise<S3RoleBasedOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.get<S3RoleBasedOutput>('/encoding/outputs/s3-role-based/{output_id}', pathParamMap);
    }

    /**
     * @summary List S3 Role-based Outputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof S3RoleBasedApi
     */
    public list(queryParams?: S3RoleBasedOutputsListQueryParams): Promise<PaginationResponse<S3RoleBasedOutput>> {
        return this.restClient.get<PaginationResponse<S3RoleBasedOutput>>('/encoding/outputs/s3-role-based', {}, queryParams);
    }

}
