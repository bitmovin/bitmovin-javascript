import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import Sprite from '../../../../models/Sprite';
import PaginationResponse from '../../../../models/PaginationResponse';
import SpritesListQueryParams from './SpritesListQueryParams';

/**
 * SpritesApi - object-oriented interface
 * @export
 * @class SpritesApi
 * @extends {BaseAPI}
 */
export default class SpritesApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Add Sprite
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @param {Sprite} [sprite]
     * @throws {RequiredError}
     * @memberof SpritesApi
     */
    public create(encodingId: string, streamId: string, sprite?: Sprite): Promise<Sprite> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId
        };
        return this.restClient.post<Sprite>('/encoding/encodings/{encoding_id}/streams/{stream_id}/sprites', pathParamMap, sprite);
    }

    /**
     * @summary Delete Sprite
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @param {string} spriteId Id of the sprite.
     * @throws {RequiredError}
     * @memberof SpritesApi
     */
    public delete(encodingId: string, streamId: string, spriteId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId,
            sprite_id: spriteId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/streams/{stream_id}/sprites/{sprite_id}', pathParamMap);
    }

    /**
     * @summary Sprite Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @param {string} spriteId Id of the sprite configuration.
     * @throws {RequiredError}
     * @memberof SpritesApi
     */
    public get(encodingId: string, streamId: string, spriteId: string): Promise<Sprite> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId,
            sprite_id: spriteId
        };
        return this.restClient.get<Sprite>('/encoding/encodings/{encoding_id}/streams/{stream_id}/sprites/{sprite_id}', pathParamMap);
    }

    /**
     * @summary List Sprites
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof SpritesApi
     */
    public list(encodingId: string, streamId: string, queryParams?: SpritesListQueryParams): Promise<PaginationResponse<Sprite>> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId
        };
        return this.restClient.get<PaginationResponse<Sprite>>('/encoding/encodings/{encoding_id}/streams/{stream_id}/sprites', pathParamMap, queryParams);
    }

}
