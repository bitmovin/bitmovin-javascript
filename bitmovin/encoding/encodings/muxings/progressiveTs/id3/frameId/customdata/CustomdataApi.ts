import { BaseAPI } from '../../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../../common/RestClient';
import CustomData from '../../../../../../../models/CustomData';
import ResponseEnvelope from '../../../../../../../models/ResponseEnvelope';

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
     * @summary Frame ID ID3 Tag Custom Data of Progressive TS Muxing
     * @param {string} encodingId ID of the Encoding.
     * @param {string} muxingId ID of the Progressive TS Muxing
     * @param {string} id3TagId ID of the Frame ID ID3 Tag
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(encodingId: string, muxingId: string, id3TagId: string): Promise<CustomData> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            id3_tag_id: id3TagId
        };
        return this.restClient.get<CustomData>('/encoding/encodings/{encoding_id}/muxings/progressive-ts/{muxing_id}/id3/frame-id/{id3_tag_id}/customData', pathParamMap);
    }

}
