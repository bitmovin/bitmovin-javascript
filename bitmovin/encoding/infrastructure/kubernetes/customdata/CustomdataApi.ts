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
     * @summary Kubernetes Cluster Custom Data
     * @param {string} infrastructureId Id of the Kubernetes cluster
     * @throws {RequiredError}
     * @memberof CustomdataApi
     */
    public getCustomData(infrastructureId: string): Promise<CustomData> {
        const pathParamMap = {
            infrastructure_id: infrastructureId
        };
        return this.restClient.get<CustomData>('/encoding/infrastructure/kubernetes/{infrastructure_id}/customData', pathParamMap);
    }

}
