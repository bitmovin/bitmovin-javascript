import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import InformationApi from './information/InformationApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ProgressiveMovMuxing from '../../../../models/ProgressiveMovMuxing';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import ProgressiveMovMuxingsListQueryParams from './ProgressiveMovMuxingsListQueryParams';

/**
 * ProgressiveMovApi - object-oriented interface
 * @export
 * @class ProgressiveMovApi
 * @extends {BaseAPI}
 */
export default class ProgressiveMovApi extends BaseAPI {
    public customdata: CustomdataApi;
    public information: InformationApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.information = new InformationApi(configuration);
    }

    /**
     * @summary Add Progressive MOV Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {ProgressiveMovMuxing} [progressiveMovMuxing]
     * @throws {RequiredError}
     * @memberof ProgressiveMovApi
     */
    public create(encodingId: string, progressiveMovMuxing?: ProgressiveMovMuxing): Promise<ProgressiveMovMuxing> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<ProgressiveMovMuxing>('/encoding/encodings/{encoding_id}/muxings/progressive-mov', pathParamMap, progressiveMovMuxing);
    }

    /**
     * @summary Delete Progressive MOV Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the Progressive MOV muxing
     * @throws {RequiredError}
     * @memberof ProgressiveMovApi
     */
    public delete(encodingId: string, muxingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/progressive-mov/{muxing_id}', pathParamMap);
    }

    /**
     * @summary Progressive MOV Muxing Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the Progressive MOV muxing
     * @throws {RequiredError}
     * @memberof ProgressiveMovApi
     */
    public get(encodingId: string, muxingId: string): Promise<ProgressiveMovMuxing> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<ProgressiveMovMuxing>('/encoding/encodings/{encoding_id}/muxings/progressive-mov/{muxing_id}', pathParamMap);
    }

    /**
     * @summary List Progressive MOV Muxings
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ProgressiveMovApi
     */
    public list(encodingId: string, queryParams?: ProgressiveMovMuxingsListQueryParams): Promise<PaginationResponse<ProgressiveMovMuxing>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<ProgressiveMovMuxing>>('/encoding/encodings/{encoding_id}/muxings/progressive-mov', pathParamMap, queryParams);
    }

}
