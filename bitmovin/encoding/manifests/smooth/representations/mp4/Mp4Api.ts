import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import BitmovinResponse from '../../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import SmoothStreamingRepresentation from '../../../../../models/SmoothStreamingRepresentation';
import PaginationResponse from '../../../../../models/PaginationResponse';
import SmoothStreamingRepresentationsListQueryParams from './SmoothStreamingRepresentationsListQueryParams';

/**
 * Mp4Api - object-oriented interface
 * @export
 * @class Mp4Api
 * @extends {BaseAPI}
 */
export default class Mp4Api extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add MP4 Representation to Smooth Streaming Manifest
     * @param {string} manifestId Id of the Smooth Streaming manifest.
     * @param {SmoothStreamingRepresentation} [smoothStreamingRepresentation]
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public create(manifestId: string, smoothStreamingRepresentation?: SmoothStreamingRepresentation): Promise<SmoothStreamingRepresentation> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.post<SmoothStreamingRepresentation>('/encoding/manifests/smooth/{manifest_id}/representations/mp4', pathParamMap, smoothStreamingRepresentation);
    }

    /**
     * @summary Delete Smooth Streaming MP4 Representation
     * @param {string} manifestId Id of the Smooth Streaming manifest.
     * @param {string} representationId Id of the MP4 representation.
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public delete(manifestId: string, representationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            representation_id: representationId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/smooth/{manifest_id}/representations/mp4/{representation_id}', pathParamMap);
    }

    /**
     * @summary Smooth Streaming MP4 Representation Details
     * @param {string} manifestId Id of the Smooth Streaming manifest.
     * @param {string} representationId Id of the MP4 representation.
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public get(manifestId: string, representationId: string): Promise<SmoothStreamingRepresentation> {
        const pathParamMap = {
            manifest_id: manifestId,
            representation_id: representationId
        };
        return this.restClient.get<SmoothStreamingRepresentation>('/encoding/manifests/smooth/{manifest_id}/representations/mp4/{representation_id}', pathParamMap);
    }

    /**
     * @summary List MP4 Representation
     * @param {string} manifestId Id of the Smooth Streaming manifest.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof Mp4Api
     */
    public list(manifestId: string, queryParams?: SmoothStreamingRepresentationsListQueryParams): Promise<PaginationResponse<SmoothStreamingRepresentation>> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.get<PaginationResponse<SmoothStreamingRepresentation>>('/encoding/manifests/smooth/{manifest_id}/representations/mp4', pathParamMap, queryParams);
    }

}
