import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import TtmlExtract from '../../../../models/TtmlExtract';
import PaginationResponse from '../../../../models/PaginationResponse';
import TtmlExtractsListQueryParams from './TtmlExtractsListQueryParams';

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
     * @summary Extract TTML Captions
     * @param {string} encodingId Id of the encoding.
     * @param {TtmlExtract} [ttmlExtract] The TTML extract captions to be created
     * @throws {RequiredError}
     * @memberof TtmlApi
     */
    public create(encodingId: string, ttmlExtract?: TtmlExtract): Promise<TtmlExtract> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<TtmlExtract>('/encoding/encodings/{encoding_id}/captions/ttml', pathParamMap, ttmlExtract);
    }

    /**
     * @summary Delete TTML Extract Captions
     * @param {string} encodingId Id of the encoding.
     * @param {string} captionsId Id of the captions configuration.
     * @throws {RequiredError}
     * @memberof TtmlApi
     */
    public delete(encodingId: string, captionsId: string): Promise<TtmlExtract> {
        const pathParamMap = {
            encoding_id: encodingId,
            captions_id: captionsId
        };
        return this.restClient.delete<TtmlExtract>('/encoding/encodings/{encoding_id}/captions/ttml/{captions_id}', pathParamMap);
    }

    /**
     * @summary TTML Extract Captions Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} captionsId Id of the captions.
     * @throws {RequiredError}
     * @memberof TtmlApi
     */
    public get(encodingId: string, captionsId: string): Promise<TtmlExtract> {
        const pathParamMap = {
            encoding_id: encodingId,
            captions_id: captionsId
        };
        return this.restClient.get<TtmlExtract>('/encoding/encodings/{encoding_id}/captions/ttml/{captions_id}', pathParamMap);
    }

    /**
     * @summary List TTML Extract Captions
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof TtmlApi
     */
    public list(encodingId: string, queryParams?: TtmlExtractsListQueryParams): Promise<PaginationResponse<TtmlExtract>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<TtmlExtract>>('/encoding/encodings/{encoding_id}/captions/ttml', pathParamMap, queryParams);
    }

}
