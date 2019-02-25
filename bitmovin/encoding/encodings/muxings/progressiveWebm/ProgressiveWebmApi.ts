import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import InformationApi from './information/InformationApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ProgressiveWebmMuxing from '../../../../models/ProgressiveWebmMuxing';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import ProgressiveWebmMuxingsListQueryParams from './ProgressiveWebmMuxingsListQueryParams';

/**
 * ProgressiveWebmApi - object-oriented interface
 * @export
 * @class ProgressiveWebmApi
 * @extends {BaseAPI}
 */
export default class ProgressiveWebmApi extends BaseAPI {
    public customdata: CustomdataApi;
    public information: InformationApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.information = new InformationApi(configuration);
    }

    /**
     * @summary Add Progressive WebM Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {ProgressiveWebmMuxing} [progressiveWebmMuxing]
     * @throws {RequiredError}
     * @memberof ProgressiveWebmApi
     */
    public create(encodingId: string, progressiveWebmMuxing?: ProgressiveWebmMuxing): Promise<ProgressiveWebmMuxing> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<ProgressiveWebmMuxing>('/encoding/encodings/{encoding_id}/muxings/progressive-webm', pathParamMap, progressiveWebmMuxing);
    }

    /**
     * @summary Delete Progressive WebM Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the Progressive WebM muxing
     * @throws {RequiredError}
     * @memberof ProgressiveWebmApi
     */
    public delete(encodingId: string, muxingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/progressive-webm/{muxing_id}', pathParamMap);
    }

    /**
     * @summary Progressive WebM Muxing Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the Progressive WebM muxing
     * @throws {RequiredError}
     * @memberof ProgressiveWebmApi
     */
    public get(encodingId: string, muxingId: string): Promise<ProgressiveWebmMuxing> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<ProgressiveWebmMuxing>('/encoding/encodings/{encoding_id}/muxings/progressive-webm/{muxing_id}', pathParamMap);
    }

    /**
     * @summary List Progressive WebM Muxings
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ProgressiveWebmApi
     */
    public list(encodingId: string, queryParams?: ProgressiveWebmMuxingsListQueryParams): Promise<PaginationResponse<ProgressiveWebmMuxing>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<ProgressiveWebmMuxing>>('/encoding/encodings/{encoding_id}/muxings/progressive-webm', pathParamMap, queryParams);
    }

}
