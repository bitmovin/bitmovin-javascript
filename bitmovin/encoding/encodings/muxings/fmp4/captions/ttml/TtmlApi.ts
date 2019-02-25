import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import TtmlEmbed from '../../../../../../models/TtmlEmbed';
import PaginationResponse from '../../../../../../models/PaginationResponse';
import TtmlEmbedsListQueryParams from './TtmlEmbedsListQueryParams';

/**
 * TtmlApi - object-oriented interface
 * @export
 * @class TtmlApi
 * @extends {BaseAPI}
 */
export default class TtmlApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary FMP4 Embed TTML Captions
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing.
     * @param {TtmlEmbed} [ttmlEmbed] The TTML embed captions to be created.
     * @throws {RequiredError}
     * @memberof TtmlApi
     */
    public create(encodingId: string, muxingId: string, ttmlEmbed?: TtmlEmbed): Promise<TtmlEmbed> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.post<TtmlEmbed>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/captions/ttml', pathParamMap, ttmlEmbed);
    }

    /**
     * @summary Delete TTML Embed Captions
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing.
     * @param {string} captionsId Id of the captions configuration.
     * @throws {RequiredError}
     * @memberof TtmlApi
     */
    public delete(encodingId: string, muxingId: string, captionsId: string): Promise<TtmlEmbed> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            captions_id: captionsId
        };
        return this.restClient.delete<TtmlEmbed>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/captions/ttml/{captions_id}', pathParamMap);
    }

    /**
     * @summary TTML Embed Captions Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing.
     * @param {string} captionsId Id of the captions.
     * @throws {RequiredError}
     * @memberof TtmlApi
     */
    public get(encodingId: string, muxingId: string, captionsId: string): Promise<TtmlEmbed> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            captions_id: captionsId
        };
        return this.restClient.get<TtmlEmbed>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/captions/ttml/{captions_id}', pathParamMap);
    }

    /**
     * @summary List TTML Embed Captions
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof TtmlApi
     */
    public list(encodingId: string, muxingId: string, queryParams?: TtmlEmbedsListQueryParams): Promise<PaginationResponse<TtmlEmbed>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<TtmlEmbed>>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/captions/ttml', pathParamMap, queryParams);
    }

}
