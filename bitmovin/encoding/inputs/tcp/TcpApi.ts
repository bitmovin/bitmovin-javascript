import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import TcpInput from '../../../models/TcpInput';
import PaginationResponse from '../../../models/PaginationResponse';
import TcpInputsListQueryParams from './TcpInputsListQueryParams';

/**
 * TcpApi - object-oriented interface
 * @export
 * @class TcpApi
 * @extends {BaseAPI}
 */
export default class TcpApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary TCP Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof TcpApi
     */
    public get(inputId: string): Promise<TcpInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<TcpInput>('/encoding/inputs/tcp/{input_id}', pathParamMap);
    }

    /**
     * @summary List TCP inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof TcpApi
     */
    public list(queryParams?: TcpInputsListQueryParams): Promise<PaginationResponse<TcpInput>> {
        return this.restClient.get<PaginationResponse<TcpInput>>('/encoding/inputs/tcp', {}, queryParams);
    }

}
