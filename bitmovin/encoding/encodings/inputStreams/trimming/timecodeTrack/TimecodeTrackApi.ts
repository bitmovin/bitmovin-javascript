import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import BitmovinResponse from '../../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import TimecodeTrackTrimmingInputStream from '../../../../../models/TimecodeTrackTrimmingInputStream';
import PaginationResponse from '../../../../../models/PaginationResponse';
import TimecodeTrackTrimmingInputStreamsListQueryParams from './TimecodeTrackTrimmingInputStreamsListQueryParams';

/**
 * TimecodeTrackApi - object-oriented interface
 * @export
 * @class TimecodeTrackApi
 * @extends {BaseAPI}
 */
export default class TimecodeTrackApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Timecode Track Trimming Input Stream
     * @param {string} encodingId Id of the encoding.
     * @param {TimecodeTrackTrimmingInputStream} [timecodeTrackTrimmingInputStream]
     * @throws {RequiredError}
     * @memberof TimecodeTrackApi
     */
    public create(encodingId: string, timecodeTrackTrimmingInputStream?: TimecodeTrackTrimmingInputStream): Promise<TimecodeTrackTrimmingInputStream> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<TimecodeTrackTrimmingInputStream>('/encoding/encodings/{encoding_id}/input-streams/trimming/timecode-track', pathParamMap, timecodeTrackTrimmingInputStream);
    }

    /**
     * @summary Delete Timecode Track Trimming Input Stream
     * @param {string} encodingId Id of the encoding.
     * @param {string} inputStreamId Id of the Timecode Track Trimming Input Stream.
     * @throws {RequiredError}
     * @memberof TimecodeTrackApi
     */
    public delete(encodingId: string, inputStreamId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            input_stream_id: inputStreamId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/input-streams/trimming/timecode-track/{input_stream_id}', pathParamMap);
    }

    /**
     * @summary Timecode Track Trimming Input Stream Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} inputStreamId Id of the Timecode Track Trimming Input Stream.
     * @throws {RequiredError}
     * @memberof TimecodeTrackApi
     */
    public get(encodingId: string, inputStreamId: string): Promise<TimecodeTrackTrimmingInputStream> {
        const pathParamMap = {
            encoding_id: encodingId,
            input_stream_id: inputStreamId
        };
        return this.restClient.get<TimecodeTrackTrimmingInputStream>('/encoding/encodings/{encoding_id}/input-streams/trimming/timecode-track/{input_stream_id}', pathParamMap);
    }

    /**
     * @summary List Timecode Track Trimming Input Streams
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof TimecodeTrackApi
     */
    public list(encodingId: string, queryParams?: TimecodeTrackTrimmingInputStreamsListQueryParams): Promise<PaginationResponse<TimecodeTrackTrimmingInputStream>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<TimecodeTrackTrimmingInputStream>>('/encoding/encodings/{encoding_id}/input-streams/trimming/timecode-track', pathParamMap, queryParams);
    }

}
