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
     * @summary Generic S3 Output Custom Data
     * @param {string} outputId Id of the Output
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(outputId: string): Promise<CustomData> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.get<CustomData>('/encoding/outputs/generic-s3/{output_id}/customData', pathParamMap);
    }

}
