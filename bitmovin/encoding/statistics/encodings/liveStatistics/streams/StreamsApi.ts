import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import StreamInfos from '../../../../../models/StreamInfos';
import PaginationResponse from '../../../../../models/PaginationResponse';
import StreamInfossListQueryParams from './StreamInfossListQueryParams';

/**
 * StreamsApi - object-oriented interface
 * @export
 * @class StreamsApi
 * @extends {BaseAPI}
 */
export default class StreamsApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary List Stream Infos of Live Statistics from an Encoding
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof StreamsApi
     */
    public list(encodingId: string, queryParams?: StreamInfossListQueryParams): Promise<PaginationResponse<StreamInfos>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<StreamInfos>>('/encoding/statistics/encodings/{encoding_id}/live-statistics/streams', pathParamMap, queryParams);
    }

}
