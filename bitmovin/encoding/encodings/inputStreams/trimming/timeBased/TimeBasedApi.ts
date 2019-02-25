import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import BitmovinResponse from '../../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import TimeBasedTrimmingInputStream from '../../../../../models/TimeBasedTrimmingInputStream';
import PaginationResponse from '../../../../../models/PaginationResponse';
import TimeBasedTrimmingInputStreamsListQueryParams from './TimeBasedTrimmingInputStreamsListQueryParams';

/**
 * TimeBasedApi - object-oriented interface
 * @export
 * @class TimeBasedApi
 * @extends {BaseAPI}
 */
export default class TimeBasedApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Time-Based Trimming Input Stream
     * @param {string} encodingId Id of the encoding.
     * @param {TimeBasedTrimmingInputStream} [timeBasedTrimmingInputStream]
     * @throws {RequiredError}
     * @memberof TimeBasedApi
     */
    public create(encodingId: string, timeBasedTrimmingInputStream?: TimeBasedTrimmingInputStream): Promise<TimeBasedTrimmingInputStream> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<TimeBasedTrimmingInputStream>('/encoding/encodings/{encoding_id}/input-streams/trimming/time-based', pathParamMap, timeBasedTrimmingInputStream);
    }

    /**
     * @summary Delete Time-Based Trimming Input Stream
     * @param {string} encodingId Id of the encoding.
     * @param {string} inputStreamId Id of the Time-Based Trimming Input Stream.
     * @throws {RequiredError}
     * @memberof TimeBasedApi
     */
    public delete(encodingId: string, inputStreamId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            input_stream_id: inputStreamId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/input-streams/trimming/time-based/{input_stream_id}', pathParamMap);
    }

    /**
     * @summary Time-Based Trimming Input Stream Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} inputStreamId Id of the Time-Based Trimming Input Stream.
     * @throws {RequiredError}
     * @memberof TimeBasedApi
     */
    public get(encodingId: string, inputStreamId: string): Promise<TimeBasedTrimmingInputStream> {
        const pathParamMap = {
            encoding_id: encodingId,
            input_stream_id: inputStreamId
        };
        return this.restClient.get<TimeBasedTrimmingInputStream>('/encoding/encodings/{encoding_id}/input-streams/trimming/time-based/{input_stream_id}', pathParamMap);
    }

    /**
     * @summary List Time-Based Trimming Input Streams
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof TimeBasedApi
     */
    public list(encodingId: string, queryParams?: TimeBasedTrimmingInputStreamsListQueryParams): Promise<PaginationResponse<TimeBasedTrimmingInputStream>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<TimeBasedTrimmingInputStream>>('/encoding/encodings/{encoding_id}/input-streams/trimming/time-based', pathParamMap, queryParams);
    }

}
