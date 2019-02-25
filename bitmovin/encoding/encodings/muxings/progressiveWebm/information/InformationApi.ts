import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import ProgressiveWebmMuxingInformation from '../../../../../models/ProgressiveWebmMuxingInformation';
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
     * @summary Progressive WebM Muxing Information
     * @param {string} encodingId ID of the Encoding.
     * @param {string} muxingId ID of the Progressive WebM muxing
     * @throws {RequiredError}
     * @memberof InformationApi
     */
    public get(encodingId: string, muxingId: string): Promise<ProgressiveWebmMuxingInformation> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<ProgressiveWebmMuxingInformation>('/encoding/encodings/{encoding_id}/muxings/progressive-webm/{muxing_id}/information', pathParamMap);
    }

}
