import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import S3Input from '../../../models/S3Input';
import PaginationResponse from '../../../models/PaginationResponse';
import S3InputsListQueryParams from './S3InputsListQueryParams';

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
     * @summary Create S3 Input
     * @param {S3Input} [s3Input] The S3 input to be created
     * @throws {RequiredError}
     * @memberof S3Api
     */
    public create(s3Input?: S3Input): Promise<S3Input> {
        return this.restClient.post<S3Input>('/encoding/inputs/s3', {}, s3Input);
    }

    /**
     * @summary Delete S3 Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof S3Api
     */
    public delete(inputId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/inputs/s3/{input_id}', pathParamMap);
    }

    /**
     * @summary S3 Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof S3Api
     */
    public get(inputId: string): Promise<S3Input> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<S3Input>('/encoding/inputs/s3/{input_id}', pathParamMap);
    }

    /**
     * @summary List S3 Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof S3Api
     */
    public list(queryParams?: S3InputsListQueryParams): Promise<PaginationResponse<S3Input>> {
        return this.restClient.get<PaginationResponse<S3Input>>('/encoding/inputs/s3', {}, queryParams);
    }

}
