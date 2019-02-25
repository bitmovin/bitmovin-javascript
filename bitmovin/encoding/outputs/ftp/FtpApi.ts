import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import FtpOutput from '../../../models/FtpOutput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import FtpOutputsListQueryParams from './FtpOutputsListQueryParams';

/**
 * FtpApi - object-oriented interface
 * @export
 * @class FtpApi
 * @extends {BaseAPI}
 */
export default class FtpApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create FTP Output
     * @param {FtpOutput} [ftpOutput] The FTP output to be created
     * @throws {RequiredError}
     * @memberof FtpApi
     */
    public create(ftpOutput?: FtpOutput): Promise<FtpOutput> {
        return this.restClient.post<FtpOutput>('/encoding/outputs/ftp', {}, ftpOutput);
    }

    /**
     * @summary Delete FTP Output
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof FtpApi
     */
    public delete(outputId: string): Promise<FtpOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.delete<FtpOutput>('/encoding/outputs/ftp/{output_id}', pathParamMap);
    }

    /**
     * @summary FTP Output Details
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof FtpApi
     */
    public get(outputId: string): Promise<FtpOutput> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.get<FtpOutput>('/encoding/outputs/ftp/{output_id}', pathParamMap);
    }

    /**
     * @summary List FTP Outputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof FtpApi
     */
    public list(queryParams?: FtpOutputsListQueryParams): Promise<PaginationResponse<FtpOutput>> {
        return this.restClient.get<PaginationResponse<FtpOutput>>('/encoding/outputs/ftp', {}, queryParams);
    }

}
