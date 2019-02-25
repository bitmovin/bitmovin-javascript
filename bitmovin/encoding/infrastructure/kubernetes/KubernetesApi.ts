import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import StatusApi from './status/StatusApi';
import CustomdataApi from './customdata/CustomdataApi';
import ConfigurationApi from './configuration/ConfigurationApi';
import AgentDeploymentApi from './agentDeployment/AgentDeploymentApi';
import PrewarmedDeploymentApi from './prewarmedDeployment/PrewarmedDeploymentApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import KubernetesCluster from '../../../models/KubernetesCluster';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import KubernetesClustersListQueryParams from './KubernetesClustersListQueryParams';

/**
 * KubernetesApi - object-oriented interface
 * @export
 * @class KubernetesApi
 * @extends {BaseAPI}
 */
export default class KubernetesApi extends BaseAPI {
    public status: StatusApi;
    public customdata: CustomdataApi;
    public configuration: ConfigurationApi;
    public agentDeployment: AgentDeploymentApi;
    public prewarmedDeployment: PrewarmedDeploymentApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.status = new StatusApi(configuration);
        this.customdata = new CustomdataApi(configuration);
        this.configuration = new ConfigurationApi(configuration);
        this.agentDeployment = new AgentDeploymentApi(configuration);
        this.prewarmedDeployment = new PrewarmedDeploymentApi(configuration);
    }

    /**
     * @summary Connect Kubernetes Cluster
     * @param {KubernetesCluster} [kubernetesCluster]
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public create(kubernetesCluster?: KubernetesCluster): Promise<KubernetesCluster> {
        return this.restClient.post<KubernetesCluster>('/encoding/infrastructure/kubernetes', {}, kubernetesCluster);
    }

    /**
     * @summary Disconnect Kubernetes Cluster
     * @param {string} infrastructureId Id of the Kubernetes cluster
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public delete(infrastructureId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            infrastructure_id: infrastructureId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/infrastructure/kubernetes/{infrastructure_id}', pathParamMap);
    }

    /**
     * @summary Kubernetes Cluster Details
     * @param {string} infrastructureId Id of the Kubernetes cluster
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public get(infrastructureId: string): Promise<KubernetesCluster> {
        const pathParamMap = {
            infrastructure_id: infrastructureId
        };
        return this.restClient.get<KubernetesCluster>('/encoding/infrastructure/kubernetes/{infrastructure_id}', pathParamMap);
    }

    /**
     * @summary List Kubernetes Cluster
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public list(queryParams?: KubernetesClustersListQueryParams): Promise<PaginationResponse<KubernetesCluster>> {
        return this.restClient.get<PaginationResponse<KubernetesCluster>>('/encoding/infrastructure/kubernetes', {}, queryParams);
    }

}
