import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import BitmovinResponse from '../../../../../models/BitmovinResponse';
import CustomTag from '../../../../../models/CustomTag';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../models/PaginationResponse';
import CustomTagsListQueryParams from './CustomTagsListQueryParams';

/**
 * CustomTagApi - object-oriented interface
 * @export
 * @class CustomTagApi
 * @extends {BaseAPI}
 */
export default class CustomTagApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Custom Tag to Audio Media
     * @param {string} manifestId Id of the hls manifest.
     * @param {string} mediaId Id of the audio media.
     * @param {CustomTag} [customTag]
     * @throws {RequiredError}
     * @memberof CustomTagApi
     */
    public create(manifestId: string, mediaId: string, customTag?: CustomTag): Promise<CustomTag> {
        const pathParamMap = {
            manifest_id: manifestId,
            media_id: mediaId
        };
        return this.restClient.post<CustomTag>('/encoding/manifests/hls/{manifest_id}/media/{media_id}/custom-tag', pathParamMap, customTag);
    }

    /**
     * @summary Delete Custom Tag
     * @param {string} manifestId Id of the hls manifest.
     * @param {string} mediaId Id of the audio media.
     * @param {string} customTagId Id of the custom tag.
     * @throws {RequiredError}
     * @memberof CustomTagApi
     */
    public delete(manifestId: string, mediaId: string, customTagId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            media_id: mediaId,
            custom_tag_id: customTagId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/hls/{manifest_id}/media/{media_id}/custom-tag/{custom_tag_id}', pathParamMap);
    }

    /**
     * @summary Custom Tag Details
     * @param {string} manifestId Id of the hls manifest.
     * @param {string} mediaId Id of the audio media
     * @param {string} customTagId Id of the custom tag.
     * @throws {RequiredError}
     * @memberof CustomTagApi
     */
    public get(manifestId: string, mediaId: string, customTagId: string): Promise<CustomTag> {
        const pathParamMap = {
            manifest_id: manifestId,
            media_id: mediaId,
            custom_tag_id: customTagId
        };
        return this.restClient.get<CustomTag>('/encoding/manifests/hls/{manifest_id}/media/{media_id}/custom-tag/{custom_tag_id}', pathParamMap);
    }

    /**
     * @summary List all Custom Tags of a Audio media
     * @param {string} manifestId Id of the hls manifest.
     * @param {string} mediaId Id of the audio media.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof CustomTagApi
     */
    public list(manifestId: string, mediaId: string, queryParams?: CustomTagsListQueryParams): Promise<PaginationResponse<CustomTag>> {
        const pathParamMap = {
            manifest_id: manifestId,
            media_id: mediaId
        };
        return this.restClient.get<PaginationResponse<CustomTag>>('/encoding/manifests/hls/{manifest_id}/media/{media_id}/custom-tag', pathParamMap, queryParams);
    }

}
