import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import MediaInfoTypeResponse from '../../../../../models/MediaInfoTypeResponse';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';

/**
 * TypeApi - object-oriented interface
 * @export
 * @class TypeApi
 * @extends {BaseAPI}
 */
export default class TypeApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary HLS Media Type
     * @param {string} manifestId Id of the hls manifest.
     * @param {string} mediaId Id of the video media.
     * @throws {RequiredError}
     * @memberof TypeApi
     */
    public get(manifestId: string, mediaId: string): Promise<MediaInfoTypeResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            media_id: mediaId
        };
        return this.restClient.get<MediaInfoTypeResponse>('/encoding/manifests/hls/{manifest_id}/media/{media_id}/type', pathParamMap);
    }

}
