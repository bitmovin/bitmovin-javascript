import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import CaptionsEmbedCea from '../../../../../../models/CaptionsEmbedCea';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../models/PaginationResponse';
import CaptionsEmbedCeasListQueryParams from './CaptionsEmbedCeasListQueryParams';

/**
 * CeaApi - object-oriented interface
 * @export
 * @class CeaApi
 * @extends {BaseAPI}
 */
export default class CeaApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary TS Embed CEA 608/708 Captions
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the TS muxing.
     * @param {CaptionsEmbedCea} [captionsEmbedCea] The captions embed CEA to be created.
     * @throws {RequiredError}
     * @memberof CeaApi
     */
    public create(encodingId: string, muxingId: string, captionsEmbedCea?: CaptionsEmbedCea): Promise<CaptionsEmbedCea> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.post<CaptionsEmbedCea>('/encoding/encodings/{encoding_id}/muxings/ts/{muxing_id}/captions/cea', pathParamMap, captionsEmbedCea);
    }

    /**
     * @summary Delete Embedded CEA 608/708 Captions
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the TS muxing.
     * @param {string} captionsId Id of the subtitle.
     * @throws {RequiredError}
     * @memberof CeaApi
     */
    public delete(encodingId: string, muxingId: string, captionsId: string): Promise<CaptionsEmbedCea> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            captions_id: captionsId
        };
        return this.restClient.delete<CaptionsEmbedCea>('/encoding/encodings/{encoding_id}/muxings/ts/{muxing_id}/captions/cea/{captions_id}', pathParamMap);
    }

    /**
     * @summary Embedded CEA 608/708 Captions Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the TS muxing.
     * @param {string} captionsId Id of the captions.
     * @throws {RequiredError}
     * @memberof CeaApi
     */
    public get(encodingId: string, muxingId: string, captionsId: string): Promise<CaptionsEmbedCea> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            captions_id: captionsId
        };
        return this.restClient.get<CaptionsEmbedCea>('/encoding/encodings/{encoding_id}/muxings/ts/{muxing_id}/captions/cea/{captions_id}', pathParamMap);
    }

    /**
     * @summary List TS Embedded CEA 608/708 Captions
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the TS muxing.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof CeaApi
     */
    public list(encodingId: string, muxingId: string, queryParams?: CaptionsEmbedCeasListQueryParams): Promise<PaginationResponse<CaptionsEmbedCea>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<CaptionsEmbedCea>>('/encoding/encodings/{encoding_id}/muxings/ts/{muxing_id}/captions/cea', pathParamMap, queryParams);
    }

}
