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
     * @summary Sidecar Custom Data
     * @param {string} encodingId Id of the encoding.
     * @param {string} sidecarId Id of the sidecar.
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(encodingId: string, sidecarId: string): Promise<CustomData> {
        const pathParamMap = {
            encoding_id: encodingId,
            sidecar_id: sidecarId
        };
        return this.restClient.get<CustomData>('/encoding/encodings/{encoding_id}/sidecars/{sidecar_id}/customData', pathParamMap);
    }

}
