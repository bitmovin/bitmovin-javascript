import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import FtpInput from '../../../models/FtpInput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import FtpInputsListQueryParams from './FtpInputsListQueryParams';

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
     * @summary Create FTP Input
     * @param {FtpInput} [ftpInput] The FTP input to be created
     * @throws {RequiredError}
     * @memberof FtpApi
     */
    public create(ftpInput?: FtpInput): Promise<FtpInput> {
        return this.restClient.post<FtpInput>('/encoding/inputs/ftp', {}, ftpInput);
    }

    /**
     * @summary Delete FTP Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof FtpApi
     */
    public delete(inputId: string): Promise<FtpInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<FtpInput>('/encoding/inputs/ftp/{input_id}', pathParamMap);
    }

    /**
     * @summary FTP Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof FtpApi
     */
    public get(inputId: string): Promise<FtpInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<FtpInput>('/encoding/inputs/ftp/{input_id}', pathParamMap);
    }

    /**
     * @summary List FTP Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof FtpApi
     */
    public list(queryParams?: FtpInputsListQueryParams): Promise<PaginationResponse<FtpInput>> {
        return this.restClient.get<PaginationResponse<FtpInput>>('/encoding/inputs/ftp', {}, queryParams);
    }

}
