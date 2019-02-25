import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import InformationApi from './information/InformationApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import Mp3Muxing from '../../../../models/Mp3Muxing';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import Mp3MuxingsListQueryParams from './Mp3MuxingsListQueryParams';

/**
 * Mp3Api - object-oriented interface
 * @export
 * @class Mp3Api
 * @extends {BaseAPI}
 */
export default class Mp3Api extends BaseAPI {
    public customdata: CustomdataApi;
    public information: InformationApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.information = new InformationApi(configuration);
    }

    /**
     * @summary Add MP3 Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {Mp3Muxing} [mp3Muxing]
     * @throws {RequiredError}
     * @memberof Mp3Api
     */
    public create(encodingId: string, mp3Muxing?: Mp3Muxing): Promise<Mp3Muxing> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<Mp3Muxing>('/encoding/encodings/{encoding_id}/muxings/mp3', pathParamMap, mp3Muxing);
    }

    /**
     * @summary Delete MP3 Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the MP3 muxing
     * @throws {RequiredError}
     * @memberof Mp3Api
     */
    public delete(encodingId: string, muxingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/mp3/{muxing_id}', pathParamMap);
    }

    /**
     * @summary MP3 Muxing Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the MP3 muxing
     * @throws {RequiredError}
     * @memberof Mp3Api
     */
    public get(encodingId: string, muxingId: string): Promise<Mp3Muxing> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<Mp3Muxing>('/encoding/encodings/{encoding_id}/muxings/mp3/{muxing_id}', pathParamMap);
    }

    /**
     * @summary List MP3 Muxings
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof Mp3Api
     */
    public list(encodingId: string, queryParams?: Mp3MuxingsListQueryParams): Promise<PaginationResponse<Mp3Muxing>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<Mp3Muxing>>('/encoding/encodings/{encoding_id}/muxings/mp3', pathParamMap, queryParams);
    }

}
