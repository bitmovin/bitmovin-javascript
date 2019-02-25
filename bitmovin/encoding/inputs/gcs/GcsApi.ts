import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import GcsInput from '../../../models/GcsInput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import GcsInputsListQueryParams from './GcsInputsListQueryParams';

/**
 * GcsApi - object-oriented interface
 * @export
 * @class GcsApi
 * @extends {BaseAPI}
 */
export default class GcsApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create GCS Input
     * @param {GcsInput} [gcsInput] The GcsInput to be created
     * @throws {RequiredError}
     * @memberof GcsApi
     */
    public create(gcsInput?: GcsInput): Promise<GcsInput> {
        return this.restClient.post<GcsInput>('/encoding/inputs/gcs', {}, gcsInput);
    }

    /**
     * @summary Delete GCS Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof GcsApi
     */
    public delete(inputId: string): Promise<GcsInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<GcsInput>('/encoding/inputs/gcs/{input_id}', pathParamMap);
    }

    /**
     * @summary GCS Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof GcsApi
     */
    public get(inputId: string): Promise<GcsInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<GcsInput>('/encoding/inputs/gcs/{input_id}', pathParamMap);
    }

    /**
     * @summary List GCS Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof GcsApi
     */
    public list(queryParams?: GcsInputsListQueryParams): Promise<PaginationResponse<GcsInput>> {
        return this.restClient.get<PaginationResponse<GcsInput>>('/encoding/inputs/gcs', {}, queryParams);
    }

}
