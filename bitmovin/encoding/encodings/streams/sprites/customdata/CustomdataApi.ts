import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import CustomData from '../../../../../models/CustomData';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';

/**
 * CustomdataApi - object-oriented interface
 * @export
 * @class CustomdataApi
 * @extends {BaseAPI}
 */
export default class CustomdataApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Sprite Custom Data
     * @param {string} encodingId Id of the encoding.
     * @param {string} streamId Id of the stream.
     * @param {string} spriteId Id of the sprite configuration.
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(encodingId: string, streamId: string, spriteId: string): Promise<CustomData> {
        const pathParamMap = {
            encoding_id: encodingId,
            stream_id: streamId,
            sprite_id: spriteId
        };
        return this.restClient.get<CustomData>('/encoding/encodings/{encoding_id}/streams/{stream_id}/sprites/{sprite_id}/customData', pathParamMap);
    }

}
