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
     * @summary MP3 Codec Configuration Custom Data
     * @param {string} configurationId Id of the codec configuration
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(configurationId: string): Promise<CustomData> {
        const pathParamMap = {
            configuration_id: configurationId
        };
        return this.restClient.get<CustomData>('/encoding/configurations/audio/mp3/{configuration_id}/customData', pathParamMap);
    }

}
