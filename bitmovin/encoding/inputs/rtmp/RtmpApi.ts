import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import RtmpInput from '../../../models/RtmpInput';
import PaginationResponse from '../../../models/PaginationResponse';
import RtmpInputsListQueryParams from './RtmpInputsListQueryParams';

/**
 * RtmpApi - object-oriented interface
 * @export
 * @class RtmpApi
 * @extends {BaseAPI}
 */
export default class RtmpApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary RTMP Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof RtmpApi
     */
    public get(inputId: string): Promise<RtmpInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<RtmpInput>('/encoding/inputs/rtmp/{input_id}', pathParamMap);
    }

    /**
     * @summary List RTMP Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof RtmpApi
     */
    public list(queryParams?: RtmpInputsListQueryParams): Promise<PaginationResponse<RtmpInput>> {
        return this.restClient.get<PaginationResponse<RtmpInput>>('/encoding/inputs/rtmp', {}, queryParams);
    }

}
