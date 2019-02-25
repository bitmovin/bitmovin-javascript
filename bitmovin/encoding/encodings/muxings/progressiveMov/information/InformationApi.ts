import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import ProgressiveMovMuxingInformation from '../../../../../models/ProgressiveMovMuxingInformation';
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
     * @summary Progressive MOV Muxing Information
     * @param {string} encodingId ID of the Encoding.
     * @param {string} muxingId ID of the Progressive MOV muxing
     * @throws {RequiredError}
     * @memberof InformationApi
     */
    public get(encodingId: string, muxingId: string): Promise<ProgressiveMovMuxingInformation> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<ProgressiveMovMuxingInformation>('/encoding/encodings/{encoding_id}/muxings/progressive-mov/{muxing_id}/information', pathParamMap);
    }

}
