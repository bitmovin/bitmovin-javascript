import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import SftpOutput from '../../../models/SftpOutput';
import PaginationResponse from '../../../models/PaginationResponse';
import SftpOutputsListQueryParams from './SftpOutputsListQueryParams';

/**
 * SftpApi - object-oriented interface
 * @export
 * @class SftpApi
 * @extends {BaseAPI}
 */
export default class SftpApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create SFTP Output
     * @param {SftpOutput} [sftpOutput] The SFTP output to be created.
     * @throws {RequiredError}
     * @memberof SftpApi
     */
    public create(sftpOutput?: SftpOutput): Promise<SftpOutput> {
        return this.restClient.post<SftpOutput>('/encoding/outputs/sftp', {}, sftpOutput);
    }

    /**
     * @summary Delete SFTP Output
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof SftpApi
     */
    public delete(outputId: string): Promise<SftpOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.delete<SftpOutput>('/encoding/outputs/sftp/{output_id}', pathParamMap);
    }

    /**
     * @summary SFTP Output Details
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof SftpApi
     */
    public get(outputId: string): Promise<SftpOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.get<SftpOutput>('/encoding/outputs/sftp/{output_id}', pathParamMap);
    }

    /**
     * @summary List SFTP Outputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof SftpApi
     */
    public list(queryParams?: SftpOutputsListQueryParams): Promise<PaginationResponse<SftpOutput>> {
        return this.restClient.get<PaginationResponse<SftpOutput>>('/encoding/outputs/sftp', {}, queryParams);
    }

}
