import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import GenericS3Input from '../../../models/GenericS3Input';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import GenericS3InputsListQueryParams from './GenericS3InputsListQueryParams';

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
     * @summary Create Generic S3 Input
     * @param {GenericS3Input} [genericS3Input] The GenericS3 input to be created
     * @throws {RequiredError}
     * @memberof GenericS3Api
     */
    public create(genericS3Input?: GenericS3Input): Promise<GenericS3Input> {
        return this.restClient.post<GenericS3Input>('/encoding/inputs/generic-s3', {}, genericS3Input);
    }

    /**
     * @summary Delete Generic S3 Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof GenericS3Api
     */
    public delete(inputId: string): Promise<GenericS3Input> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<GenericS3Input>('/encoding/inputs/generic-s3/{input_id}', pathParamMap);
    }

    /**
     * @summary Generic S3 Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof GenericS3Api
     */
    public get(inputId: string): Promise<GenericS3Input> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<GenericS3Input>('/encoding/inputs/generic-s3/{input_id}', pathParamMap);
    }

    /**
     * @summary List Generic S3 Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof GenericS3Api
     */
    public list(queryParams?: GenericS3InputsListQueryParams): Promise<PaginationResponse<GenericS3Input>> {
        return this.restClient.get<PaginationResponse<GenericS3Input>>('/encoding/inputs/generic-s3', {}, queryParams);
    }

}
