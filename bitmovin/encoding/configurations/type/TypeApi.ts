import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CodecConfigTypeResponse from '../../../models/CodecConfigTypeResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';

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
     * @summary Get Codec Configuration Type
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof TypeApi
     */
    public get(configurationId: string): Promise<CodecConfigTypeResponse> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.get<CodecConfigTypeResponse>('/encoding/configurations/{configuration_id}/type', pathParamMap);
    }

}
