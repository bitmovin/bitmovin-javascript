import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomData from '../../../../models/CustomData';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';

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
     * @summary Audio Mix Filter Custom Data
     * @param {string} filterId Id of the Audio Mix configuration.
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(filterId: string): Promise<CustomData> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.get<CustomData>('/encoding/filters/audio-mix/{filter_id}/customData', pathParamMap);
    }

}
