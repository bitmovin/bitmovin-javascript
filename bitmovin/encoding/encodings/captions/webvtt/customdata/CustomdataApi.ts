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
     * @summary Get Extract WebVtt custom data
     * @param {string} encodingId Id of the encoding.
     * @param {string} captionsId Id of the captions.
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(encodingId: string, captionsId: string): Promise<CustomData> {
        const pathParamMap = {
            encoding_id: encodingId,
            captions_id: captionsId
        };
        return this.restClient.get<CustomData>('/encoding/encodings/{encoding_id}/captions/webvtt/{captions_id}/customData', pathParamMap);
    }

}
