import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import LiveApi from './live/LiveApi';
import CustomdataApi from './customdata/CustomdataApi';
import StreamsApi from './streams/StreamsApi';
import InputStreamsApi from './inputStreams/InputStreamsApi';
import MuxingsApi from './muxings/MuxingsApi';
import SubtitlesApi from './subtitles/SubtitlesApi';
import CaptionsApi from './captions/CaptionsApi';
import SidecarsApi from './sidecars/SidecarsApi';
import KeyframesApi from './keyframes/KeyframesApi';
import BitmovinResponse from '../../models/BitmovinResponse';
import CloudRegion from '../../models/CloudRegion';
import Encoding from '../../models/Encoding';
import ReprioritizeEncodingRequest from '../../models/ReprioritizeEncodingRequest';
import RescheduleEncodingRequest from '../../models/RescheduleEncodingRequest';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import StartEncodingRequest from '../../models/StartEncodingRequest';
import Task from '../../models/Task';
import PaginationResponse from '../../models/PaginationResponse';
import EncodingsListQueryParams from './EncodingsListQueryParams';

/**
 * EncodingsApi - object-oriented interface
 * @export
 * @class EncodingsApi
 * @extends {BaseAPI}
 */
export default class EncodingsApi extends BaseAPI {
    public live: LiveApi;
    public customdata: CustomdataApi;
    public streams: StreamsApi;
    public inputStreams: InputStreamsApi;
    public muxings: MuxingsApi;
    public subtitles: SubtitlesApi;
    public captions: CaptionsApi;
    public sidecars: SidecarsApi;
    public keyframes: KeyframesApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.live = new LiveApi(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.streams = new StreamsApi(configuration);
        this.inputStreams = new InputStreamsApi(configuration);
        this.muxings = new MuxingsApi(configuration);
        this.subtitles = new SubtitlesApi(configuration);
        this.captions = new CaptionsApi(configuration);
        this.sidecars = new SidecarsApi(configuration);
        this.keyframes = new KeyframesApi(configuration);
    }

    /**
     * @summary Create Encoding
     * @param {Encoding} [encoding] The Encoding to be created
     * @throws {RequiredError}
     * @memberof EncodingsApi
     */
    public create(encoding?: Encoding): Promise<Encoding> {
        return this.restClient.post<Encoding>('/encoding/encodings', {}, encoding);
    }

    /**
     * @summary Delete Encoding
     * @param {string} encodingId Id of the encoding.
     * @throws {RequiredError}
     * @memberof EncodingsApi
     */
    public delete(encodingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}', pathParamMap);
    }

    /**
     * @summary Encoding Details
     * @param {string} encodingId Id of the encoding.
     * @throws {RequiredError}
     * @memberof EncodingsApi
     */
    public get(encodingId: string): Promise<Encoding> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<Encoding>('/encoding/encodings/{encoding_id}', pathParamMap);
    }

    /**
     * @summary Encoding Start Details
     * @param {string} encodingId Id of the encoding
     * @throws {RequiredError}
     * @memberof EncodingsApi
     */
    public getStartRequest(encodingId: string): Promise<StartEncodingRequest> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<StartEncodingRequest>('/encoding/encodings/{encoding_id}/start', pathParamMap);
    }

    /**
     * @summary List all Encodings
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof EncodingsApi
     */
    public list(queryParams?: EncodingsListQueryParams): Promise<PaginationResponse<Encoding>> {
        return this.restClient.get<PaginationResponse<Encoding>>('/encoding/encodings', {}, queryParams);
    }

    /**
     * @summary Reprioritize Encoding
     * @param {string} encodingId Id of the encoding.
     * @param {ReprioritizeEncodingRequest} [reprioritizeEncodingRequest]
     * @throws {RequiredError}
     * @memberof EncodingsApi
     */
    public reprioritize(encodingId: string, reprioritizeEncodingRequest?: ReprioritizeEncodingRequest): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/encodings/{encoding_id}/reprioritize', pathParamMap, reprioritizeEncodingRequest);
    }

    /**
     * @summary Reschedule Encoding
     * @param {string} encodingId Id of the encoding.
     * @param {RescheduleEncodingRequest} [rescheduleEncodingRequest]
     * @throws {RequiredError}
     * @memberof EncodingsApi
     */
    public reschedule(encodingId: string, rescheduleEncodingRequest?: RescheduleEncodingRequest): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/encodings/{encoding_id}/reschedule', pathParamMap, rescheduleEncodingRequest);
    }

    /**
     * @summary Start Encoding
     * @param {string} encodingId Id of the encoding
     * @param {StartEncodingRequest} [startEncodingRequest]
     * @throws {RequiredError}
     * @memberof EncodingsApi
     */
    public start(encodingId: string, startEncodingRequest?: StartEncodingRequest): Promise<StartEncodingRequest> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<StartEncodingRequest>('/encoding/encodings/{encoding_id}/start', pathParamMap, startEncodingRequest);
    }

    /**
     * @summary Encoding Status
     * @param {string} encodingId Id of the encoding
     * @throws {RequiredError}
     * @memberof EncodingsApi
     */
    public status(encodingId: string): Promise<Task> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<Task>('/encoding/encodings/{encoding_id}/status', pathParamMap);
    }

    /**
     * @summary Stop Encoding
     * @param {string} encodingId Id of the encoding
     * @throws {RequiredError}
     * @memberof EncodingsApi
     */
    public stop(encodingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/encodings/{encoding_id}/stop', pathParamMap);
    }

}
