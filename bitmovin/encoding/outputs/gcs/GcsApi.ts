import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import GcsOutput from '../../../models/GcsOutput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import GcsOutputsListQueryParams from './GcsOutputsListQueryParams';

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
     * @summary Create GCS Output
     * @param {GcsOutput} [gcsOutput] The GCS output to be created
     * @throws {RequiredError}
     * @memberof GcsApi
     */
    public create(gcsOutput?: GcsOutput): Promise<GcsOutput> {
        return this.restClient.post<GcsOutput>('/encoding/outputs/gcs', {}, gcsOutput);
    }

    /**
     * @summary Delete GCS Output
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof GcsApi
     */
    public delete(outputId: string): Promise<GcsOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.delete<GcsOutput>('/encoding/outputs/gcs/{output_id}', pathParamMap);
    }

    /**
     * @summary GCS Output Details
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof GcsApi
     */
    public get(outputId: string): Promise<GcsOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.get<GcsOutput>('/encoding/outputs/gcs/{output_id}', pathParamMap);
    }

    /**
     * @summary List GCS Outputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof GcsApi
     */
    public list(queryParams?: GcsOutputsListQueryParams): Promise<PaginationResponse<GcsOutput>> {
        return this.restClient.get<PaginationResponse<GcsOutput>>('/encoding/outputs/gcs', {}, queryParams);
    }

}
