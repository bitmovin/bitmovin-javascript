import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import InputApi from './input/InputApi';
import InputsApi from './inputs/InputsApi';
import FiltersApi from './filters/FiltersApi';
import SubtitlesApi from './subtitles/SubtitlesApi';
import BurnInSubtitlesApi from './burnInSubtitles/BurnInSubtitlesApi';
import CaptionsApi from './captions/CaptionsApi';
import ThumbnailsApi from './thumbnails/ThumbnailsApi';
import SpritesApi from './sprites/SpritesApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import Stream from '../../../models/Stream';
import PaginationResponse from '../../../models/PaginationResponse';
import StreamsListQueryParams from './StreamsListQueryParams';

/**
 * StreamsApi - object-oriented interface
 * @export
 * @class StreamsApi
 * @extends {BaseAPI}
 */
export default class StreamsApi extends BaseAPI {
    public customdata: CustomdataApi;
    public input: InputApi;
    public inputs: InputsApi;
    public filters: FiltersApi;
    public subtitles: SubtitlesApi;
    public burnInSubtitles: BurnInSubtitlesApi;
    public captions: CaptionsApi;
    public thumbnails: ThumbnailsApi;
    public sprites: SpritesApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.input = new InputApi(configuration);
        this.inputs = new InputsApi(configuration);
        this.filters = new FiltersApi(configuration);
        this.subtitles = new SubtitlesApi(configuration);
        this.burnInSubtitles = new BurnInSubtitlesApi(configuration);
        this.captions = new CaptionsApi(configuration);
        this.thumbnails = new ThumbnailsApi(configuration);
        this.sprites = new SpritesApi(configuration);
    }

    /**
     * @summary Add Stream
     * @param {string} encodingId Id of the encoding.
     * @param {Stream} [stream]
     * @throws {RequiredError}
     * @memberof StreamsApi
     */
    public create(encodingId: string, stream?: Stream): Promise<Stream> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<Stream>('/encoding/encodings/{encoding_id}/streams', pathParamMap, stream);
    }

    /**
     * @summary Delete Stream
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @throws {RequiredError}
     * @memberof StreamsApi
     */
    public delete(encodingId: string, streamId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/streams/{stream_id}', pathParamMap);
    }

    /**
     * @summary Stream Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @throws {RequiredError}
     * @memberof StreamsApi
     */
    public get(encodingId: string, streamId: string): Promise<Stream> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId
        };
        return this.restClient.get<Stream>('/encoding/encodings/{encoding_id}/streams/{stream_id}', pathParamMap);
    }

    /**
     * @summary List Streams
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof StreamsApi
     */
    public list(encodingId: string, queryParams?: StreamsListQueryParams): Promise<PaginationResponse<Stream>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<Stream>>('/encoding/encodings/{encoding_id}/streams', pathParamMap, queryParams);
    }

}
