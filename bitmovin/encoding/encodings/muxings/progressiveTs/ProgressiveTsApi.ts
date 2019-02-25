import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import InformationApi from './information/InformationApi';
import Id3Api from './id3/Id3Api';
import DrmApi from './drm/DrmApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ProgressiveTsMuxing from '../../../../models/ProgressiveTsMuxing';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import ProgressiveTsMuxingsListQueryParams from './ProgressiveTsMuxingsListQueryParams';

/**
 * ProgressiveTsApi - object-oriented interface
 * @export
 * @class ProgressiveTsApi
 * @extends {BaseAPI}
 */
export default class ProgressiveTsApi extends BaseAPI {
    public customdata: CustomdataApi;
    public information: InformationApi;
    public id3: Id3Api;
    public drm: DrmApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.information = new InformationApi(configuration);
        this.id3 = new Id3Api(configuration);
        this.drm = new DrmApi(configuration);
    }

    /**
     * @summary Add Progressive TS Muxing
     * @param {string} encodingId ID of the encoding.
     * @param {ProgressiveTsMuxing} [progressiveTsMuxing]
     * @throws {RequiredError}
     * @memberof ProgressiveTsApi
     */
    public create(encodingId: string, progressiveTsMuxing?: ProgressiveTsMuxing): Promise<ProgressiveTsMuxing> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<ProgressiveTsMuxing>('/encoding/encodings/{encoding_id}/muxings/progressive-ts', pathParamMap, progressiveTsMuxing);
    }

    /**
     * @summary Delete Progressive TS Muxing
     * @param {string} encodingId ID of the Encoding.
     * @param {string} muxingId ID of the Progressive TS muxing
     * @throws {RequiredError}
     * @memberof ProgressiveTsApi
     */
    public delete(encodingId: string, muxingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/progressive-ts/{muxing_id}', pathParamMap);
    }

    /**
     * @summary Progressive TS Muxing Details
     * @param {string} encodingId ID of the Encoding.
     * @param {string} muxingId ID of the Progressive TS Muxing
     * @throws {RequiredError}
     * @memberof ProgressiveTsApi
     */
    public get(encodingId: string, muxingId: string): Promise<ProgressiveTsMuxing> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<ProgressiveTsMuxing>('/encoding/encodings/{encoding_id}/muxings/progressive-ts/{muxing_id}', pathParamMap);
    }

    /**
     * @summary List Progressive TS Muxings
     * @param {string} encodingId ID of the Encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ProgressiveTsApi
     */
    public list(encodingId: string, queryParams?: ProgressiveTsMuxingsListQueryParams): Promise<PaginationResponse<ProgressiveTsMuxing>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<ProgressiveTsMuxing>>('/encoding/encodings/{encoding_id}/muxings/progressive-ts', pathParamMap, queryParams);
    }

}
