import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import BitmovinResponse from '../../../models/BitmovinResponse';
import Keyframe from '../../../models/Keyframe';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import KeyframesListQueryParams from './KeyframesListQueryParams';

/**
 * KeyframesApi - object-oriented interface
 * @export
 * @class KeyframesApi
 * @extends {BaseAPI}
 */
export default class KeyframesApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Create Keyframes
     * @param {string} encodingId Id of the encoding.
     * @param {Keyframe} [keyframe]
     * @throws {RequiredError}
     * @memberof KeyframesApi
     */
    public create(encodingId: string, keyframe?: Keyframe): Promise<Keyframe> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<Keyframe>('/encoding/encodings/{encoding_id}/keyframes', pathParamMap, keyframe);
    }

    /**
     * @summary Delete Keyframe
     * @param {string} encodingId Id of the encoding.
     * @param {string} keyframeId Id of the keyframe.
     * @throws {RequiredError}
     * @memberof KeyframesApi
     */
    public delete(encodingId: string, keyframeId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            keyframe_id: keyframeId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/keyframes/{keyframe_id}', pathParamMap);
    }

    /**
     * @summary Keyframe Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} keyframeId Id of the keyframe.
     * @throws {RequiredError}
     * @memberof KeyframesApi
     */
    public get(encodingId: string, keyframeId: string): Promise<Keyframe> {
        const pathParamMap = {
            encoding_id: encodingId,
            keyframe_id: keyframeId
        };
        return this.restClient.get<Keyframe>('/encoding/encodings/{encoding_id}/keyframes/{keyframe_id}', pathParamMap);
    }

    /**
     * @summary List all Keyframes
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof KeyframesApi
     */
    public list(encodingId: string, queryParams?: KeyframesListQueryParams): Promise<PaginationResponse<Keyframe>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<Keyframe>>('/encoding/encodings/{encoding_id}/keyframes', pathParamMap, queryParams);
    }

}
