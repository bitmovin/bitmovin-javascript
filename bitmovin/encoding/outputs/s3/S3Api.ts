import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import S3Output from '../../../models/S3Output';
import PaginationResponse from '../../../models/PaginationResponse';
import S3OutputsListQueryParams from './S3OutputsListQueryParams';

/**
 * S3Api - object-oriented interface
 * @export
 * @class S3Api
 * @extends {BaseAPI}
 */
export default class S3Api extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create S3 Output
     * @param {S3Output} [s3Output]
     * @throws {RequiredError}
     * @memberof S3Api
     */
    public create(s3Output?: S3Output): Promise<S3Output> {
        return this.restClient.post<S3Output>('/encoding/outputs/s3', {}, s3Output);
    }

    /**
     * @summary Delete S3 Output
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof S3Api
     */
    public delete(outputId: string): Promise<S3Output> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.delete<S3Output>('/encoding/outputs/s3/{output_id}', pathParamMap);
    }

    /**
     * @summary S3 Output Details
     * @param {string} outputId Id of the input
     * @throws {RequiredError}
     * @memberof S3Api
     */
    public get(outputId: string): Promise<S3Output> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.get<S3Output>('/encoding/outputs/s3/{output_id}', pathParamMap);
    }

    /**
     * @summary List S3 Outputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof S3Api
     */
    public list(queryParams?: S3OutputsListQueryParams): Promise<PaginationResponse<S3Output>> {
        return this.restClient.get<PaginationResponse<S3Output>>('/encoding/outputs/s3', {}, queryParams);
    }

}
