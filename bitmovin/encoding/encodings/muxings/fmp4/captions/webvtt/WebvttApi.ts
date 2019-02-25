import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import WebVttEmbed from '../../../../../../models/WebVttEmbed';
import PaginationResponse from '../../../../../../models/PaginationResponse';

/**
 * WebvttApi - object-oriented interface
 * @export
 * @class WebvttApi
 * @extends {BaseAPI}
 */
export default class WebvttApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary FMP4 Embed WebVtt Captions
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing.
     * @param {WebVttEmbed} [webVttEmbed] The WebVtt captions to be created.
     * @throws {RequiredError}
     * @memberof WebvttApi
     */
    public create(encodingId: string, muxingId: string, webVttEmbed?: WebVttEmbed): Promise<WebVttEmbed> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.post<WebVttEmbed>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/captions/webvtt', pathParamMap, webVttEmbed);
    }

    /**
     * @summary Get FMP4 Embed WebVtt Captions Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing.
     * @param {string} captionsId Id of the captions config.
     * @throws {RequiredError}
     * @memberof WebvttApi
     */
    public get(encodingId: string, muxingId: string, captionsId: string): Promise<WebVttEmbed> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            captions_id: captionsId
        };
        return this.restClient.get<WebVttEmbed>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/captions/webvtt/{captions_id}', pathParamMap);
    }

    /**
     * @summary List FMP4 Embed WebVtt Captions
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing.
     * @throws {RequiredError}
     * @memberof WebvttApi
     */
    public list(encodingId: string, muxingId: string): Promise<PaginationResponse<WebVttEmbed>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<WebVttEmbed>>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/captions/webvtt', pathParamMap);
    }

}
