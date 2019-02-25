import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import UdpMulticastInput from '../../../models/UdpMulticastInput';
import PaginationResponse from '../../../models/PaginationResponse';
import UdpMulticastInputsListQueryParams from './UdpMulticastInputsListQueryParams';

/**
 * UdpMulticastApi - object-oriented interface
 * @export
 * @class UdpMulticastApi
 * @extends {BaseAPI}
 */
export default class UdpMulticastApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create UDP multicast input
     * @param {UdpMulticastInput} [udpMulticastInput] The UdpMulticastInput to be created
     * @throws {RequiredError}
     * @memberof UdpMulticastApi
     */
    public create(udpMulticastInput?: UdpMulticastInput): Promise<UdpMulticastInput> {
        return this.restClient.post<UdpMulticastInput>('/encoding/inputs/udp-multicast', {}, udpMulticastInput);
    }

    /**
     * @summary Delete UDP multicast input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof UdpMulticastApi
     */
    public delete(inputId: string): Promise<UdpMulticastInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<UdpMulticastInput>('/encoding/inputs/udp-multicast/{input_id}', pathParamMap);
    }

    /**
     * @summary UDP multicast Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof UdpMulticastApi
     */
    public get(inputId: string): Promise<UdpMulticastInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<UdpMulticastInput>('/encoding/inputs/udp-multicast/{input_id}', pathParamMap);
    }

    /**
     * @summary List UDP multicast inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof UdpMulticastApi
     */
    public list(queryParams?: UdpMulticastInputsListQueryParams): Promise<PaginationResponse<UdpMulticastInput>> {
        return this.restClient.get<PaginationResponse<UdpMulticastInput>>('/encoding/inputs/udp-multicast', {}, queryParams);
    }

}
