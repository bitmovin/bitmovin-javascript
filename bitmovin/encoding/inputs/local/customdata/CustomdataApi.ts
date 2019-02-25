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
     * @summary Local Input Custom Data
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(inputId: string): Promise<CustomData> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<CustomData>('/encoding/inputs/local/{input_id}/customData', pathParamMap);
    }

}
