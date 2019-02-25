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
     * @summary S3 Custom Data
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(inputId: string): Promise<CustomData> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<CustomData>('/encoding/inputs/s3/{input_id}/customData', pathParamMap);
    }

}
