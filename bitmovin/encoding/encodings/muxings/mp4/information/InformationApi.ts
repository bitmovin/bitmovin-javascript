import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import Mp4MuxingInformation from '../../../../../models/Mp4MuxingInformation';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';

/**
 * InformationApi - object-oriented interface
 * @export
 * @class InformationApi
 * @extends {BaseAPI}
 */
export default class InformationApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary MP4 Muxing Information
     * @param {string} encodingId ID of the Encoding.
     * @param {string} muxingId ID of the MP4 Muxing
     * @throws {RequiredError}
     * @memberof InformationApi
     */
    public get(encodingId: string, muxingId: string): Promise<Mp4MuxingInformation> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<Mp4MuxingInformation>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}/information', pathParamMap);
    }

}
