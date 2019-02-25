import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import RawApi from './raw/RawApi';
import FrameIdApi from './frameId/FrameIdApi';
import PlainTextApi from './plainText/PlainTextApi';
import Id3Tag from '../../../../../models/Id3Tag';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../models/PaginationResponse';
import Id3TagsListQueryParams from './Id3TagsListQueryParams';

/**
 * Id3Api - object-oriented interface
 * @export
 * @class Id3Api
 * @extends {BaseAPI}
 */
export default class Id3Api extends BaseAPI {
    public raw: RawApi;
    public frameId: FrameIdApi;
    public plainText: PlainTextApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.raw = new RawApi(configuration);
        this.frameId = new FrameIdApi(configuration);
        this.plainText = new PlainTextApi(configuration);
    }

    /**
     * @summary List all ID3 Tags of Progressive TS Muxing
     * @param {string} encodingId ID of the Encoding.
     * @param {string} muxingId ID of the Progressive TS Muxing
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof Id3Api
     */
    public list(encodingId: string, muxingId: string, queryParams?: Id3TagsListQueryParams): Promise<PaginationResponse<Id3Tag>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<Id3Tag>>('/encoding/encodings/{encoding_id}/muxings/progressive-ts/{muxing_id}/id3', pathParamMap, queryParams);
    }

}
