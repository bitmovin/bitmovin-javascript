import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';

/**
 * AgentDeploymentApi - object-oriented interface
 * @export
 * @class AgentDeploymentApi
 * @extends {BaseAPI}
 */
export default class AgentDeploymentApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Download bitmovin-agent deployment
     * @param {string} infrastructureId Id of the Kubernetes cluster
     * @throws {RequiredError}
     * @memberof AgentDeploymentApi
     */
    public get(infrastructureId: string): Promise<Response> {
        const pathParamMap = {
            infrastructure_id: infrastructureId
        };
        return this.restClient.get<Response>('/encoding/infrastructure/kubernetes/{infrastructure_id}/agent-deployment', pathParamMap);
    }

}
