import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import IngestInputStream from '../../../../models/IngestInputStream';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import IngestInputStreamsListQueryParams from './IngestInputStreamsListQueryParams';

/**
 * IngestApi - object-oriented interface
 * @export
 * @class IngestApi
 * @extends {BaseAPI}
 */
export default class IngestApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Ingest Input Stream
     * @param {string} encodingId Id of the encoding.
     * @param {IngestInputStream} [ingestInputStream]
     * @throws {RequiredError}
     * @memberof IngestApi
     */
    public create(encodingId: string, ingestInputStream?: IngestInputStream): Promise<IngestInputStream> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<IngestInputStream>('/encoding/encodings/{encoding_id}/input-streams/ingest', pathParamMap, ingestInputStream);
    }

    /**
     * @summary Delete Ingest Input Stream
     * @param {string} encodingId Id of the encoding.
     * @param {string} inputStreamId Id of the ingest input stream.
     * @throws {RequiredError}
     * @memberof IngestApi
     */
    public delete(encodingId: string, inputStreamId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            input_stream_id: inputStreamId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/input-streams/ingest/{input_stream_id}', pathParamMap);
    }

    /**
     * @summary Ingest Input Stream Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} inputStreamId Id of the ingest input stream.
     * @throws {RequiredError}
     * @memberof IngestApi
     */
    public get(encodingId: string, inputStreamId: string): Promise<IngestInputStream> {
        const pathParamMap = {
            encoding_id: encodingId,
            input_stream_id: inputStreamId
        };
        return this.restClient.get<IngestInputStream>('/encoding/encodings/{encoding_id}/input-streams/ingest/{input_stream_id}', pathParamMap);
    }

    /**
     * @summary List Ingest Input Streams
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof IngestApi
     */
    public list(encodingId: string, queryParams?: IngestInputStreamsListQueryParams): Promise<PaginationResponse<IngestInputStream>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<IngestInputStream>>('/encoding/encodings/{encoding_id}/input-streams/ingest', pathParamMap, queryParams);
    }

}
