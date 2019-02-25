import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import GenericS3Output from '../../../models/GenericS3Output';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import GenericS3OutputsListQueryParams from './GenericS3OutputsListQueryParams';

/**
 * GenericS3Api - object-oriented interface
 * @export
 * @class GenericS3Api
 * @extends {BaseAPI}
 */
export default class GenericS3Api extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Generic S3 Output
     * @param {GenericS3Output} [genericS3Output]
     * @throws {RequiredError}
     * @memberof GenericS3Api
     */
    public create(genericS3Output?: GenericS3Output): Promise<GenericS3Output> {
        return this.restClient.post<GenericS3Output>('/encoding/outputs/generic-s3', {}, genericS3Output);
    }

    /**
     * @summary Delete Generic S3 Output
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof GenericS3Api
     */
    public delete(outputId: string): Promise<GenericS3Output> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.delete<GenericS3Output>('/encoding/outputs/generic-s3/{output_id}', pathParamMap);
    }

    /**
     * @summary Generic S3 Output Details
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof GenericS3Api
     */
    public get(outputId: string): Promise<GenericS3Output> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.get<GenericS3Output>('/encoding/outputs/generic-s3/{output_id}', pathParamMap);
    }

    /**
     * @summary List Generic S3 Outputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof GenericS3Api
     */
    public list(queryParams?: GenericS3OutputsListQueryParams): Promise<PaginationResponse<GenericS3Output>> {
        return this.restClient.get<PaginationResponse<GenericS3Output>>('/encoding/outputs/generic-s3', {}, queryParams);
    }

}
