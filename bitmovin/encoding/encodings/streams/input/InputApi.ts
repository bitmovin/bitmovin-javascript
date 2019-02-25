import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import EncodingStreamInputDetails from '../../../../models/EncodingStreamInputDetails';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';

/**
 * InputApi - object-oriented interface
 * @export
 * @class InputApi
 * @extends {BaseAPI}
 */
export default class InputApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Stream Input Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @throws {RequiredError}
     * @memberof InputApi
     */
    public get(encodingId: string, streamId: string): Promise<EncodingStreamInputDetails> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId
        };
        return this.restClient.get<EncodingStreamInputDetails>('/encoding/encodings/{encoding_id}/streams/{stream_id}/input', pathParamMap);
    }

}
