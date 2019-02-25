import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import StreamDvbSubSubtitle from '../../../../../models/StreamDvbSubSubtitle';
import PaginationResponse from '../../../../../models/PaginationResponse';
import StreamDvbSubSubtitlesListQueryParams from './StreamDvbSubSubtitlesListQueryParams';

/**
 * DvbsubApi - object-oriented interface
 * @export
 * @class DvbsubApi
 * @extends {BaseAPI}
 */
export default class DvbsubApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Burn-In DVB-SUB Subtitle into Stream
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @param {StreamDvbSubSubtitle} [streamDvbSubSubtitle]
     * @throws {RequiredError}
     * @memberof DvbsubApi
     */
    public create(encodingId: string, streamId: string, streamDvbSubSubtitle?: StreamDvbSubSubtitle): Promise<StreamDvbSubSubtitle> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId
        };
        return this.restClient.post<StreamDvbSubSubtitle>('/encoding/encodings/{encoding_id}/streams/{stream_id}/subtitles/dvbsub', pathParamMap, streamDvbSubSubtitle);
    }

    /**
     * @summary Delete Specific DVB-SUB Subtitle from Stream
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @param {string} subtitleId TODO Add description
     * @throws {RequiredError}
     * @memberof DvbsubApi
     */
    public delete(encodingId: string, streamId: string, subtitleId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId,
            subtitle_id: subtitleId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/streams/{stream_id}/subtitles/dvbsub/{subtitle_id}', pathParamMap);
    }

    /**
     * @summary Subtitle DVB-SUB BurnIn Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @param {string} subtitleId Id of the subtitle.
     * @throws {RequiredError}
     * @memberof DvbsubApi
     */
    public get(encodingId: string, streamId: string, subtitleId: string): Promise<StreamDvbSubSubtitle> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId,
            subtitle_id: subtitleId
        };
        return this.restClient.get<StreamDvbSubSubtitle>('/encoding/encodings/{encoding_id}/streams/{stream_id}/subtitles/dvbsub/{subtitle_id}', pathParamMap);
    }

    /**
     * @summary List the DVB-SUB subtitles of a stream
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof DvbsubApi
     */
    public list(encodingId: string, streamId: string, queryParams?: StreamDvbSubSubtitlesListQueryParams): Promise<PaginationResponse<StreamDvbSubSubtitle>> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId
        };
        return this.restClient.get<PaginationResponse<StreamDvbSubSubtitle>>('/encoding/encodings/{encoding_id}/streams/{stream_id}/subtitles/dvbsub', pathParamMap, queryParams);
    }

}
