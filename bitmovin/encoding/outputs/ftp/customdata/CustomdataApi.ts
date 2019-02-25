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
     * @summary FTP Output Custom Data
     * @param {string} outputId Id of the output
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(outputId: string): Promise<CustomData> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.get<CustomData>('/encoding/outputs/ftp/{output_id}/customData', pathParamMap);
    }

}
