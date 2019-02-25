import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import KubernetesClusterConfiguration from '../../../../models/KubernetesClusterConfiguration';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';

/**
 * ConfigurationApi - object-oriented interface
 * @export
 * @class ConfigurationApi
 * @extends {BaseAPI}
 */
export default class ConfigurationApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Retrieve Kubernetes Cluster Configuration
     * @param {string} infrastructureId Id of the Kubernetes cluster
     * @throws {RequiredError}
     * @memberof ConfigurationApi
     */
    public get(infrastructureId: string): Promise<KubernetesClusterConfiguration> {
        const pathParamMap = {
            infrastructure_id: infrastructureId
        };
        return this.restClient.get<KubernetesClusterConfiguration>('/encoding/infrastructure/kubernetes/{infrastructure_id}/configuration', pathParamMap);
    }

    /**
     * @summary Update Kubernetes Cluster Configuration
     * @param {string} infrastructureId Id of the Kubernetes cluster
     * @param {KubernetesClusterConfiguration} [kubernetesClusterConfiguration]
     * @throws {RequiredError}
     * @memberof ConfigurationApi
     */
    public putEncodingInfrastructureKubernetesConfigurationByInfrastructureId(infrastructureId: string, kubernetesClusterConfiguration?: KubernetesClusterConfiguration): Promise<KubernetesClusterConfiguration> {
        const pathParamMap = {
            infrastructure_id: infrastructureId
        };
        return this.restClient.put<KubernetesClusterConfiguration>('/encoding/infrastructure/kubernetes/{infrastructure_id}/configuration', pathParamMap, kubernetesClusterConfiguration);
    }

}
