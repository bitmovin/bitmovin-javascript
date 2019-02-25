import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import SftpInput from '../../../models/SftpInput';
import PaginationResponse from '../../../models/PaginationResponse';
import SftpInputsListQueryParams from './SftpInputsListQueryParams';

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
     * @summary Create SFTP Input
     * @param {SftpInput} [sftpInput] The SFTP input to be created
     * @throws {RequiredError}
     * @memberof SftpApi
     */
    public create(sftpInput?: SftpInput): Promise<SftpInput> {
        return this.restClient.post<SftpInput>('/encoding/inputs/sftp', {}, sftpInput);
    }

    /**
     * @summary Delete SFTP Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof SftpApi
     */
    public delete(inputId: string): Promise<SftpInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<SftpInput>('/encoding/inputs/sftp/{input_id}', pathParamMap);
    }

    /**
     * @summary SFTP Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof SftpApi
     */
    public get(inputId: string): Promise<SftpInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<SftpInput>('/encoding/inputs/sftp/{input_id}', pathParamMap);
    }

    /**
     * @summary List SFTP Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof SftpApi
     */
    public list(queryParams?: SftpInputsListQueryParams): Promise<PaginationResponse<SftpInput>> {
        return this.restClient.get<PaginationResponse<SftpInput>>('/encoding/inputs/sftp', {}, queryParams);
    }

}
