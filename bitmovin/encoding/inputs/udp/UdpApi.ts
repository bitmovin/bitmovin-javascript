import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import UdpInput from '../../../models/UdpInput';
import PaginationResponse from '../../../models/PaginationResponse';
import UdpInputsListQueryParams from './UdpInputsListQueryParams';

/**
 * UdpApi - object-oriented interface
 * @export
 * @class UdpApi
 * @extends {BaseAPI}
 */
export default class UdpApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary UDP Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof UdpApi
     */
    public get(inputId: string): Promise<UdpInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<UdpInput>('/encoding/inputs/udp/{input_id}', pathParamMap);
    }

    /**
     * @summary List UDP inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof UdpApi
     */
    public list(queryParams?: UdpInputsListQueryParams): Promise<PaginationResponse<UdpInput>> {
        return this.restClient.get<PaginationResponse<UdpInput>>('/encoding/inputs/udp', {}, queryParams);
    }

}
