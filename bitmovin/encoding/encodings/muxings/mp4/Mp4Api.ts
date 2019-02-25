import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import InformationApi from './information/InformationApi';
import DrmApi from './drm/DrmApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import Mp4Muxing from '../../../../models/Mp4Muxing';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import Mp4MuxingsListQueryParams from './Mp4MuxingsListQueryParams';

/**
 * Mp4Api - object-oriented interface
 * @export
 * @class Mp4Api
 * @extends {BaseAPI}
 */
export default class Mp4Api extends BaseAPI {
    public customdata: CustomdataApi;
    public information: InformationApi;
    public drm: DrmApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.information = new InformationApi(configuration);
        this.drm = new DrmApi(configuration);
    }

    /**
     * @summary Add MP4 Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {Mp4Muxing} [mp4Muxing]
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public create(encodingId: string, mp4Muxing?: Mp4Muxing): Promise<Mp4Muxing> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<Mp4Muxing>('/encoding/encodings/{encoding_id}/muxings/mp4', pathParamMap, mp4Muxing);
    }

    /**
     * @summary Delete MP4 Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the MP4 muxing
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public delete(encodingId: string, muxingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}', pathParamMap);
    }

    /**
     * @summary MP4 Segment Muxing Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the MP4 muxing
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public get(encodingId: string, muxingId: string): Promise<Mp4Muxing> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<Mp4Muxing>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}', pathParamMap);
    }

    /**
     * @summary List MP4 Muxings
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public list(encodingId: string, queryParams?: Mp4MuxingsListQueryParams): Promise<PaginationResponse<Mp4Muxing>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<Mp4Muxing>>('/encoding/encodings/{encoding_id}/muxings/mp4', pathParamMap, queryParams);
    }

}
