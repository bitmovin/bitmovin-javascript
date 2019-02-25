import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import SegmentedRawMuxing from '../../../../models/SegmentedRawMuxing';
import PaginationResponse from '../../../../models/PaginationResponse';
import SegmentedRawMuxingsListQueryParams from './SegmentedRawMuxingsListQueryParams';

/**
 * SegmentedRawApi - object-oriented interface
 * @export
 * @class SegmentedRawApi
 * @extends {BaseAPI}
 */
export default class SegmentedRawApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Add Segmented RAW Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {SegmentedRawMuxing} [segmentedRawMuxing]
     * @throws {RequiredError}
     * @memberof SegmentedRawApi
     */
    public create(encodingId: string, segmentedRawMuxing?: SegmentedRawMuxing): Promise<SegmentedRawMuxing> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<SegmentedRawMuxing>('/encoding/encodings/{encoding_id}/muxings/segmented-raw', pathParamMap, segmentedRawMuxing);
    }

    /**
     * @summary Delete Segmented RAW Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the Segmented RAW muxing
     * @throws {RequiredError}
     * @memberof SegmentedRawApi
     */
    public delete(encodingId: string, muxingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/segmented-raw/{muxing_id}', pathParamMap);
    }

    /**
     * @summary Segmented RAW Muxing Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the Segmented RAW muxing
     * @throws {RequiredError}
     * @memberof SegmentedRawApi
     */
    public get(encodingId: string, muxingId: string): Promise<SegmentedRawMuxing> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<SegmentedRawMuxing>('/encoding/encodings/{encoding_id}/muxings/segmented-raw/{muxing_id}', pathParamMap);
    }

    /**
     * @summary List Segmented RAW Muxings
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof SegmentedRawApi
     */
    public list(encodingId: string, queryParams?: SegmentedRawMuxingsListQueryParams): Promise<PaginationResponse<SegmentedRawMuxing>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<SegmentedRawMuxing>>('/encoding/encodings/{encoding_id}/muxings/segmented-raw', pathParamMap, queryParams);
    }

}
