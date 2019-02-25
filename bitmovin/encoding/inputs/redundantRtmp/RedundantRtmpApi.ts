import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import BitmovinResponse from '../../../models/BitmovinResponse';
import RedundantRtmpInput from '../../../models/RedundantRtmpInput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import RedundantRtmpInputsListQueryParams from './RedundantRtmpInputsListQueryParams';

/**
 * RedundantRtmpApi - object-oriented interface
 * @export
 * @class RedundantRtmpApi
 * @extends {BaseAPI}
 */
export default class RedundantRtmpApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Create Redundant RTMP Input
     * @param {RedundantRtmpInput} [redundantRtmpInput] The Redundant RTMP input to be created
     * @throws {RequiredError}
     * @memberof RedundantRtmpApi
     */
    public create(redundantRtmpInput?: RedundantRtmpInput): Promise<RedundantRtmpInput> {
        return this.restClient.post<RedundantRtmpInput>('/encoding/inputs/redundant-rtmp', {}, redundantRtmpInput);
    }

    /**
     * @summary Delete Redundant RTMP Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof RedundantRtmpApi
     */
    public delete(inputId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/inputs/redundant-rtmp/{input_id}', pathParamMap);
    }

    /**
     * @summary Redundant RTMP Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof RedundantRtmpApi
     */
    public get(inputId: string): Promise<RedundantRtmpInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<RedundantRtmpInput>('/encoding/inputs/redundant-rtmp/{input_id}', pathParamMap);
    }

    /**
     * @summary List Redundant RTMP Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof RedundantRtmpApi
     */
    public list(queryParams?: RedundantRtmpInputsListQueryParams): Promise<PaginationResponse<RedundantRtmpInput>> {
        return this.restClient.get<PaginationResponse<RedundantRtmpInput>>('/encoding/inputs/redundant-rtmp', {}, queryParams);
    }

}
