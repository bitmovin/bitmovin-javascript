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
     * @summary Smooth Streaming Manifest Custom Data
     * @param {string} manifestId UUID of the Smooth Streaming manifest
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(manifestId: string): Promise<CustomData> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.get<CustomData>('/encoding/manifests/smooth/{manifest_id}/customData', pathParamMap);
    }

}
