import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../../../models/BitmovinResponse';
import FrameIdId3Tag from '../../../../../../models/FrameIdId3Tag';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../models/PaginationResponse';
import FrameIdId3TagsListQueryParams from './FrameIdId3TagsListQueryParams';

/**
 * FrameIdApi - object-oriented interface
 * @export
 * @class FrameIdApi
 * @extends {BaseAPI}
 */
export default class FrameIdApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Add Frame ID ID3 Tag to Progressive TS Muxing
     * @param {string} encodingId ID of the Encoding.
     * @param {string} muxingId ID of the Progressive TS Muxing
     * @param {FrameIdId3Tag} [frameIdId3Tag]
     * @throws {RequiredError}
     * @memberof FrameIdApi
     */
    public create(encodingId: string, muxingId: string, frameIdId3Tag?: FrameIdId3Tag): Promise<FrameIdId3Tag> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.post<FrameIdId3Tag>('/encoding/encodings/{encoding_id}/muxings/progressive-ts/{muxing_id}/id3/frame-id', pathParamMap, frameIdId3Tag);
    }

    /**
     * @summary Delete Frame ID ID3 Tag of Progressive TS Muxing
     * @param {string} encodingId ID of the Encoding.
     * @param {string} muxingId ID of the Progressive TS Muxing
     * @param {string} id3TagId ID of the Frame ID ID3 Tag
     * @throws {RequiredError}
     * @memberof FrameIdApi
     */
    public delete(encodingId: string, muxingId: string, id3TagId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            id3_tag_id: id3TagId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/progressive-ts/{muxing_id}/id3/frame-id/{id3_tag_id}', pathParamMap);
    }

    /**
     * @summary Frame ID ID3 Tag Details of Progressive TS Muxing
     * @param {string} encodingId ID of the Encoding.
     * @param {string} muxingId ID of the Progressive TS Muxing
     * @param {string} id3TagId ID of the Frame ID ID3 Tag
     * @throws {RequiredError}
     * @memberof FrameIdApi
     */
    public get(encodingId: string, muxingId: string, id3TagId: string): Promise<FrameIdId3Tag> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            id3_tag_id: id3TagId
        };
        return this.restClient.get<FrameIdId3Tag>('/encoding/encodings/{encoding_id}/muxings/progressive-ts/{muxing_id}/id3/frame-id/{id3_tag_id}', pathParamMap);
    }

    /**
     * @summary List Frame ID ID3 Tags of Progressive TS Muxing
     * @param {string} encodingId ID of the Encoding.
     * @param {string} muxingId ID of the Progressive TS Muxing
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof FrameIdApi
     */
    public list(encodingId: string, muxingId: string, queryParams?: FrameIdId3TagsListQueryParams): Promise<PaginationResponse<FrameIdId3Tag>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<FrameIdId3Tag>>('/encoding/encodings/{encoding_id}/muxings/progressive-ts/{muxing_id}/id3/frame-id', pathParamMap, queryParams);
    }

}
