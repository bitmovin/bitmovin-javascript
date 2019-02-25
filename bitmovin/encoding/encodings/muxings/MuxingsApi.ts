import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import Fmp4Api from './fmp4/Fmp4Api';
import SegmentedRawApi from './segmentedRaw/SegmentedRawApi';
import TsApi from './ts/TsApi';
import WebmApi from './webm/WebmApi';
import Mp3Api from './mp3/Mp3Api';
import Mp4Api from './mp4/Mp4Api';
import ProgressiveTsApi from './progressiveTs/ProgressiveTsApi';
import BroadcastTsApi from './broadcastTs/BroadcastTsApi';
import ProgressiveWebmApi from './progressiveWebm/ProgressiveWebmApi';
import ProgressiveMovApi from './progressiveMov/ProgressiveMovApi';
import Muxing from '../../../models/Muxing';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import StreamMode from '../../../models/StreamMode';
import PaginationResponse from '../../../models/PaginationResponse';
import MuxingsListQueryParams from './MuxingsListQueryParams';

/**
 * MuxingsApi - object-oriented interface
 * @export
 * @class MuxingsApi
 * @extends {BaseAPI}
 */
export default class MuxingsApi extends BaseAPI {
    public fmp4: Fmp4Api;
    public segmentedRaw: SegmentedRawApi;
    public ts: TsApi;
    public webm: WebmApi;
    public mp3: Mp3Api;
    public mp4: Mp4Api;
    public progressiveTs: ProgressiveTsApi;
    public broadcastTs: BroadcastTsApi;
    public progressiveWebm: ProgressiveWebmApi;
    public progressiveMov: ProgressiveMovApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.fmp4 = new Fmp4Api(configuration);
        this.segmentedRaw = new SegmentedRawApi(configuration);
        this.ts = new TsApi(configuration);
        this.webm = new WebmApi(configuration);
        this.mp3 = new Mp3Api(configuration);
        this.mp4 = new Mp4Api(configuration);
        this.progressiveTs = new ProgressiveTsApi(configuration);
        this.broadcastTs = new BroadcastTsApi(configuration);
        this.progressiveWebm = new ProgressiveWebmApi(configuration);
        this.progressiveMov = new ProgressiveMovApi(configuration);
    }

    /**
     * @summary List All Muxings
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof MuxingsApi
     */
    public list(encodingId: string, queryParams?: MuxingsListQueryParams): Promise<PaginationResponse<Muxing>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<Muxing>>('/encoding/encodings/{encoding_id}/muxings', pathParamMap, queryParams);
    }

}
