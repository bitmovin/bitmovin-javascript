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
     * @summary Progressive WebM Muxing Custom Data
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the Progressive WebM muxing
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(encodingId: string, muxingId: string): Promise<CustomData> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<CustomData>('/encoding/encodings/{encoding_id}/muxings/progressive-webm/{muxing_id}/customData', pathParamMap);
    }

}
